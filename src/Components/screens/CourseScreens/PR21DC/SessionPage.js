import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import { LinearGradient } from "expo-linear-gradient";
import YoutubeIframe from "react-native-youtube-iframe";
import ResourceDownloader from "../../../common/ResourceDownloader";

const sessionData = [
  {
    title: "The Right to be Rich",
    description:
      "The concept of the right to be rich resonates with principles of personal autonomy and self-determination. It maintains that everyone should be empowered to pursue economic success according to their skills, ideas, and diligence. By acknowledging this right, societies are positioned to unlock the full potential of their citizens, fostering an environment of economic growth, job creation, and improved living standards.",
    downloadableTitle: "The Right to be Rich",
    downloadableType: "pdf",
    downloadableLink:
      "https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf",
    downloadableTwoTitle: "mp4 file",
    downloadableTwoType: "audio",
    downloadableTwoLink:
      "https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf",
    youtubeLink: "https://www.youtube.com/embed/S-ztoGpA7a4",
    // ... other data for session 1
  },
  {
    title: "It's Amazing to be Rich",
    description:
      "The concept of the right skill to be rich resonates with principles of personal autonomy and self-determination. It maintains that everyone should be empowered to pursue economic success according to their skills, ideas, and diligence. By acknowledging this right, societies are positioned to unlock the full potential of their citizens, fostering an environment of economic growth, job creation, and improved living standards.",
    downloadableTitle: "It's Amazing to be Rich",
    downloadableType: "pdf",
    downloadableLink:
      "https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf",
    downloadableTwoTitle: "mp4 file",
    downloadableTwoType: "audio",
    downloadableTwoLink:
      "https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf",
    youtubeLink: "https://www.youtube.com/embed/H_0_c6R_KKs",
    // ... other data for session 1
  },
  // ... continue adding data for remaining sessions
];

const SessionPage = () => {
  const route = useRoute();
  const sessionIndex = route.params?.sessionIndex; // Access the sessionIndex parameter
  const courseName = route.params?.courseName;

  const isThereSecondDownloadable = () => {
    if (session.downloadableTwoType !== null || undefined) {
      console.log(
        "called second downloadable successfully and rendered components"
      );
      return (
        <View style={styles.resourceItem}>
          <ResourceDownloader
            type={session.downloadableTwoType}
            linktoDownload={session.downloadableTwoLink}
            title={session.downloadableTwoTitle}
          />
        </View>
      );
    } else {
      return null; // or any other content you want to render when the condition is not met
    }
  };

  if (sessionIndex === undefined || courseName === undefined) {
    // Handle the case where sessionIndex or courseName is not provided
    return <Text>Session information not provided</Text>;
  }

  // Get the data for the current session
  const session = sessionData[sessionIndex];

  return (
    <>
      <ScrollView>
        <LinearGradient
          colors={["rgba(130, 180, 249, 0.8)", "white"]}
          locations={[0, 0.08]} // Adjust the locations as needed
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.container}
        >
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
            <Text style={styles.textFour}>{session.description}</Text>
            <View style={styles.horizontalLine}></View>

            <Text style={styles.textThree}>- RECORDING -</Text>

            <View style={styles.webViewWrapper}>
              <WebView
                style={styles.webView}
                source={{ uri: session.youtubeLink }}
              />
            </View>

            <Text style={styles.textThree}>- DOWNLOADS -</Text>
            <View style={styles.horizontalLine}></View>
            <View style={styles.resourceContainer}>
              <View style={styles.resourceItem}>
                <ResourceDownloader
                  type={session.downloadableType}
                  title={session.downloadableTitle}
                  linktoDownload={session.downloadableLink}
                ></ResourceDownloader>
              </View>
              {isThereSecondDownloadable()}
            </View>

            <View style={styles.sessionsListFlexContainer}></View>
          </View>
        </LinearGradient>
      </ScrollView>
    </>
  );
};

/**/

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  resourceContainer: {
    height: 150,
    width: "80%",
    marginTop: 25,
  },
  resourceItem: {
    marginVertical: 15,
  },
  webView: {
    flex: 1,
    width: "100%",
    height: "100%",
    opacity: 0.99,
  },
  webViewWrapper: {
    overflow: "hidden",
    height: 162,
    width: 290,
    opacity: 1,
    marginTop: 25,
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
  textFour: {
    fontFamily: "Nimbus-Sans-BoldItalic",
    fontSize: 15,
    color: "#707070",
    marginVertical: 15,
    width: "80%",
    textAlign: "center",
  },
  image: {
    marginTop: 100,
    width: 170,
    height: 170,
  },
});

export default SessionPage;
