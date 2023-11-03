import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat, Bubble, BubbleProps } from "react-native-gifted-chat";
import PocketBase from "pocketbase";
import { useAuth } from "../../Utils/AuthContext";

const ChatPage = () => {
  const { dbUrl, currentAuthCredentials, chatMessages, setChatMessages, user } =
    useAuth();
  const pb = new PocketBase(dbUrl);

  async function initialiseChat() {
    try {
      const records = await pb
        .collection("messages")
        .getList(1, 50, { sort: "created" });

      const formattedMessagesArray = [];

      for (const item of records.items) {
        const userThatSentMessage = await pb
          .collection("users")
          .getOne(item.sender);
        let isAvatarEmpty = true;

        if (
          userThatSentMessage.avatar !== "" &&
          userThatSentMessage.avatar !== undefined
        ) {
          isAvatarEmpty = false;
        }

        const formattedMessageObject = {
          _id: item.id,
          text: item.content,
          createdAt: new Date(item.created),
          user: {
            _id: item.sender,
            name: userThatSentMessage.username,
            avatar: isAvatarEmpty
              ? undefined
              : `${dbUrl}/api/files/${userThatSentMessage.collectionId}/${userThatSentMessage.id}/${userThatSentMessage.avatar}`,
          },
        };

        formattedMessagesArray.push(formattedMessageObject);
      }

      // Sort the messages by createdAt in descending order
      formattedMessagesArray.sort((a, b) => b.createdAt - a.createdAt);

      setChatMessages(formattedMessagesArray);
    } catch (error) {
      console.log("initialising chat has failed: ", error, error.data);
    }
  }

  useEffect(() => {
    initialiseChat();
    console.log("Component mounted");
  }, []);
  console.log(chatMessages);
  // Function to send a new message
  const handleSend = async (newMessage) => {
    const messageToSendToDB = {
      content: newMessage[0].text,
      sender: user.id,
    };
    console.log(messageToSendToDB);
    // Update UI with the new message
    setChatMessages((chatMessages) =>
      GiftedChat.append(chatMessages, newMessage)
    );
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
        messages={chatMessages}
        onSend={(newMessage) => handleSend(newMessage)}
        user={{
          _id: user.id, // Use the ID of the current user
          name: "David", // Set the name of the current user
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
