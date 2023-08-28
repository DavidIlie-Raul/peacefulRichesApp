import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  // Load initial messages from your backend (PocketBase)
  useEffect(() => {
    // Fetch initial messages from your backend and format them for GiftedChat
    const initialMessages = [];

    setMessages(initialMessages);
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
        onSend={handleSend}
        user={{ _id: 1 }} // Replace with your user ID from PocketBase
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
