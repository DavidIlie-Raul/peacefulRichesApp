import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";
const sessionData = [
  {
    title: "The Right to be Rich",
    description: "Description for session 1",
    pdfLink: "www.test.com",
    youtubeLink: "https://www.youtube.com/watch?v=NC4E-anTLnQ&t=6022s",
    // ... other data for session 1
  },
  // ... continue adding data for remaining sessions
];

const SessionPage = () => {
  const route = useRoute();
  const sessionIndex = route.params?.sessionIndex; // Access the sessionIndex parameter

  if (sessionIndex === undefined) {
    // Handle the case where sessionIndex is not provided
    return <Text>Session index not provided</Text>;
  }

  // Get the data for the current session
  const session = sessionData[sessionIndex];

  return (
    <>
      <WebView
        style={{
          opacity: 0.99,
          overflow: "hidden",
        }}
        source={{ uri: "youtube.com" }}
      />
    </>
  );
};

/*<View>
        <Text>{session.title}</Text>
        <Text>{session.description}</Text>
        <Text>{session.youtubeLink}</Text>
      </View>*/

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default SessionPage;
