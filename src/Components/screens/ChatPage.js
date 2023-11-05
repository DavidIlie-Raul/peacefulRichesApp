import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import { GiftedChat, Bubble, BubbleProps } from "react-native-gifted-chat";
import PocketBase from "pocketbase";
import { useAuth } from "../../Utils/AuthContext";
import SlackMessage from "../../Utils/chat/SlackMessage";
import emojiUtils from "emoji-utils";

const ChatPage = () => {
  const { dbUrl, currentAuthCredentials, user } = useAuth();
  const pb = new PocketBase(dbUrl);
  const [messages, setMessages] = useState([]);

  function renderMessage(props) {
    const {
      currentMessage: { text: currText },
    } = props;

    let messageTextStyle;

    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === "android" ? 34 : 30,
      };
    }

    return <SlackMessage {...props} messageTextStyle={messageTextStyle} />;
  }

  function customUsernameContainer() {
    return (
      <View>
        <Text>{this.user.name}</Text>
      </View>
    );
  }

  useEffect(() => {
    async function fetchMessageHistory() {
      try {
        // Fetch message history from the backend
        const records = await pb.collection("messages").getList(1, 50, {
          sort: "-created",
        });
        let formattedMessages = [];

        for (const item of records.items) {
          //Fetch associated user that sent a message
          const userThatSentMessage = await pb
            .collection("users")
            .getOne(item.sender);
          const avatarImage = userThatSentMessage.avatar;
          console.log(
            "Avatar of user:",
            userThatSentMessage.username,
            "Avatar:",
            avatarImage
          );
          const avatarURL = `${dbUrl}/api/files/${userThatSentMessage.collectionId}/${userThatSentMessage.id}/${avatarImage}`;
          function getAvatarImage() {
            let avatarToReturn;
            if (
              avatarImage !== undefined &&
              avatarImage !== null &&
              avatarImage !== ""
            ) {
              avatarToReturn = avatarURL;
            } else {
              avatarToReturn = undefined;
            }
            return avatarToReturn;
          }
          const formattedChatMessage = {
            _id: item.id,
            text: item.content,
            createdAt: new Date(item.created),
            user: {
              _id: userThatSentMessage.id,
              name: userThatSentMessage.username, // Modify this accordingly
              avatar: getAvatarImage(),
            },
          };
          formattedMessages.push(formattedChatMessage);
        }

        setMessages(formattedMessages);
      } catch (error) {
        console.log("Failed to fetch message history: ", error, error.data);
      }
    }

    fetchMessageHistory();
  }, []); // Empty dependency array for initial message fetching

  useEffect(() => {
    // Set up real-time updates
    const unsubscribe = pb.collection("messages").subscribe("*", (data) => {
      if (data.action === "create") {
        // Handle new message
        const newMessage = {
          _id: data.record.id,
          text: data.record.content,
          createdAt: new Date(data.record.created),
          user: {
            _id: data.record.sender,
            name: data.record.senderName, // Modify this accordingly
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [newMessage])
        );
      } else if (data.action === "delete") {
        // Handle message deletion
        const messageIdToDelete = data.record.id;
        setMessages((previousMessages) =>
          previousMessages.filter(
            (message) => message._id !== messageIdToDelete
          )
        );
      }
    });

    return () => {
      // Unsubscribe when the component unmounts
      pb.collection("messages").unsubscribe("*");
    };
  }, []);
  // Function to send a new message
  const handleSend = async (newMessage) => {
    // Handle sending new messages here

    /*This line of code causes double messages to appear on send
    , since the realtime client is also listening to new messages
    */
    /*setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessage)
    );*/

    const messageToSendToDB = {
      content: newMessage[0].text,
      sender: user.id,
    };
    console.log(messageToSendToDB);

    try {
      // Update backend with the new message
      await pb.collection("messages").create(messageToSendToDB);
    } catch (error) {
      console.log("could not create new message", error, error.data);
    }
  };
  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        renderUsernameOnMessage={true}
        showAvatarForEveryMessage={true}
        renderMessage={renderMessage}
        onSend={(newMessage) => handleSend(newMessage)}
        user={{
          _id: user.id, // Use the ID of the current user
          name: user.username, // Set the name of the current user
        }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: "lightblue", // Set the left bubble background color
                },
              }}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatPage;
