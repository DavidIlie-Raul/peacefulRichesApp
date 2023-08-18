import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import { LinearGradient } from "expo-linear-gradient";
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
  const courseName = route.params?.courseName;

  if (sessionIndex === undefined || courseName === undefined) {
    // Handle the case where sessionIndex or courseName is not provided
    return <Text>Session information not provided</Text>;
  }

  // Get the data for the current session
  const session = sessionData[sessionIndex];

  return (
    <>
      <LinearGradient
        colors={["rgba(130, 180, 249, 0.8)", "white"]}
        locations={[0, 0.1]} // Adjust the locations as needed
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.container}
      >
        <ScrollView>
          <View style={styles.upperContainer}>
            <Image
              style={styles.image}
              source={require("../../../../images/Varianta2-10.png")}
            ></Image>
            <Text style={styles.textOne}>{courseName}</Text>
            <Text style={styles.textTwo}>{session.title}</Text>
            <View style={styles.horizontalLine} />
          </View>
          <View style={styles.lowerContainer}>
            <Text style={styles.textThree}>- SESSIONS -</Text>
            <WebView
              style={styles.webView}
              source={{ uri: "https://www.youtube.com/embed/3H4uPxcKSD4" }}
            />
            <View style={styles.sessionsListFlexContainer}></View>
          </View>
          <View>
            <Text>{session.description}</Text>
            <Text>{session.youtubeLink}</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
};

/**/

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  webView: {
    marginTop: 50,
    display: "flex",
    alignSelf: "center",
    width: 290,
    maxHeight: 200,
  },
  upperContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  lowerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: 600,
  },
  sessionsListFlexContainer: {
    width: "80%",
    paddingVertical: 15,
  },
  gridItem: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  horizontalLine: {
    width: 100,
    height: 2,
    backgroundColor: "#82B4F9",
    marginVertical: 15,
  },
  buttonsHorizontalLine: {
    width: 30,
    height: 2,
    backgroundColor: "#82B4F9",
    marginVertical: 15,
  },
  textOne: {
    fontFamily: "Nimbus-Sans-Bold",
    fontSize: 22,
    color: "#707070",
    marginTop: 15,
  },
  textTwo: {
    fontFamily: "Nimbus-Sans-Bold",
    fontSize: 22,
    color: "#4B4B4B",
    marginTop: 15,
  },
  textThree: {
    fontFamily: "Nimbus-Sans-Bold",
    fontSize: 20,
    color: "#4B4B4B",
    marginTop: 60,
  },
  image: {
    marginTop: 100,
    width: 170,
    height: 170,
  },
});

export default SessionPage;
