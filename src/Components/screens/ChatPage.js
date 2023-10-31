import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat, Bubble, BubbleProps } from "react-native-gifted-chat";
import PocketBase from "pocketbase";
import { useAuth } from "../../Utils/AuthContext";

const ChatPage = () => {
  const { dbUrl, currentAuthCredentials } = useAuth();
  const pb = new PocketBase(dbUrl);
  const [messages, setMessages] = useState([]);
  const [idOfCurrentAuthedUser, setIdOfCurrentAuthedUser] = useState(null);

  async function fetchMessageHistory() {
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(
          currentAuthCredentials.userOrEmail,
          currentAuthCredentials.pass
        );
      const resultList = await pb
        .collection("messages")
        .getList(1, 50, { sort: "-created" });
      console.log(resultList);

      // Transform the data into a format suitable for Gifted Chat
      const formattedMessages = resultList.items.map((item) => {
        return {
          _id: item.id, // Use a unique identifier for each message
          text: item.content, // The message content
          createdAt: new Date(item.created), // Convert created timestamp to a Date object
          user: {
            _id: item.sender, // Use the sender's ID as the sender's ID
            name: "David", // You might need to retrieve the sender's name from your data
          },
        };
      });

      console.log(formattedMessages);
      // Set the initialMessages state with the formatted data
      setIdOfCurrentAuthedUser(authData.record.id);
      setMessages(formattedMessages);
    } catch (error) {
      console.log(error);
    }
  }
  async function subscribeToDbChanges() {
    await pb.collection("messages").subscribe("*", (data) => {
      console.log(data);
    });
  }
  // Load initial messages from your backend (PocketBase)
  useEffect(() => {
    fetchMessageHistory();
    subscribeToDbChanges();
  }, []);

  // Function to send a new message
  const handleSend = (newMessage) => {
    messageToSendToDB = {
      content: newMessage,
      sender: idOfCurrentAuthedUser,
    };
    // Update backend with the new message
    pb.collection("messages").create();
    // Update UI with the new message
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };
  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(newMessage) => handleSend(newMessage)}
        user={{
          _id: idOfCurrentAuthedUser, // Use the ID of the current user
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
