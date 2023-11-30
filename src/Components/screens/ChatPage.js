import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import { GiftedChat, Bubble, BubbleProps, InputToolbar } from "react-native-gifted-chat";
import PocketBase from "pocketbase";
import { useAuth } from "../../Utils/AuthContext";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

const ChatPage = () => {
  const { dbUrl, currentAuthCredentials, user } = useAuth();
  const pb = new PocketBase(dbUrl);
  const [messages, setMessages] = useState([]);

  const CustomAction = () => {

    //Handle Attaching Files
    async function handleFileUpload() {

      console.log('Add attachment pressed, handling file upload');

    };

    return (
      <TouchableOpacity onPress={handleFileUpload}>
      <View>
        <AntDesign name="pluscircle" size={24} color="lightgray" style={styles.addFileButton} />
      </View>
      </TouchableOpacity>
    );
    
  };

  const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "white",
          borderTopColor: "#E8E8E8",
          borderTopWidth: 0,
          padding: 0
        }}
      />
    );
  };

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
          function getMessageImage() {
            const imageAttachment = item.attachments[0];
            const imageURL = `${dbUrl}/api/files/${item.collectionId}/${item.id}/${item.attachments[0]}`;
            if (
              imageAttachment !== "" &&
              imageAttachment !== null &&
              imageAttachment !== undefined
            ) {
              return imageURL;
            } else {
              return undefined;
            }
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
            image: getMessageImage(),
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
    async function subToRealtimeMessages() {
      const unsubscribe = pb
        .collection("messages")
        .subscribe("*", async (data) => {
          if (data.action === "create") {
            // Handle new message
            const userThatSentMessage = await pb
              .collection("users")
              .getOne(data.record.sender);
            const avatarImage = userThatSentMessage.avatar;
            const avatarURL = `${dbUrl}/api/files/${userThatSentMessage.collectionId}/${userThatSentMessage.id}/${avatarImage}`;
            function getNewAvatarImage() {
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
            function getNewMessageImage() {
              const imageAttachment = data.record.attachments[0];
              const imageURL = `${dbUrl}/api/files/${data.record.collectionId}/${data.record.id}/${data.record.attachments[0]}`;
              if (
                imageAttachment !== "" &&
                imageAttachment !== null &&
                imageAttachment !== undefined
              ) {
                return imageURL;
              } else {
                return undefined;
              }
            }
            const newMessage = {
              _id: data.record.id,
              text: data.record.content,
              createdAt: new Date(data.record.created),
              user: {
                _id: data.record.sender,
                name: userThatSentMessage.username, // Modify this accordingly
                avatar: getNewAvatarImage(),
              },
              image: getNewMessageImage(),
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
    }
    subToRealtimeMessages();
    return () => {
      // Unsubscribe when the component unmounts
      pb.collection("messages").unsubscribe("*");
    };
  }, []);
  // Function to send a new message
  const handleSend = async (newMessage) => {
    // Handle sending new messages here


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
        onSend={(newMessage) => handleSend(newMessage)}
        user={{
          _id: user.id, // Use the ID of the current user
          name: user.username, // Set the name of the current user
        }}
        renderInputToolbar={props => customtInputToolbar(props)}
        renderActions={(props) => {
          return <CustomAction />;
        }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: "lightblue", // Set the left bubble background color
                },
                left: { backgroundColor: "#D5D5D5" },
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
  addFileButton:{
  marginBottom:10,
  paddingLeft:10,
  }
});

export default ChatPage;
