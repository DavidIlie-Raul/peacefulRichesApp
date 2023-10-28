import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat, Bubble, BubbleProps } from "react-native-gifted-chat";
import PocketBase from "pocketbase";
import { useAuth } from "../../Utils/AuthContext";

const ChatPage = () => {
  const { dbUrl, currentAuthCredentials } = useAuth();
  const pb = new PocketBase(dbUrl);
  const [messages, setMessages] = useState([]);
  let idOfCurrentUser;

  async function fetchMessageHistory() {
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(
          currentAuthCredentials.userOrEmail,
          currentAuthCredentials.pass
        );
      const resultList = await pb.collection("messages").getList(1, 50, {
        sort: "created",
        expand: "sender",
      });
      console.log(resultList);
      idOfCurrentUser = authData.record.id;

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
      setMessages(formattedMessages);
    } catch (error) {
      console.log(error);
    }
  }

  // Load initial messages from your backend (PocketBase)
  useEffect(() => {
    fetchMessageHistory();
  }, []);

  // Function to send a new message
  const handleSend = (newMessages = []) => {
    // Update backend with the new message
    // Update UI with the new message
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{ _id: 1 }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                left: {
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
