import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  VirtualizedList,
} from "react-native";
import QuickLinksFourButtons from "../common/QuickLinksFourButtons";
import UpperBanner from "../PageSections/upperBanner";
import HomePageButtons from "../common/HomePageButtonImage";

const LandingPage = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <UpperBanner></UpperBanner>
        </View>

        <View style={styles.lowerContainer}>
          <View style={styles.textBox}>
            <Text style={styles.textBoxFirstText}>
              Welcome to the Peaceful Riches Community!{" "}
            </Text>
            <Text style={styles.textBoxSecondText}>Let's get you started!</Text>
            <View style={styles.horizontalLine} />
          </View>

          <View style={styles.buttonContainer}>
            <HomePageButtons
              widgetTextContent={"Check out the Chat!"}
              btnDestination={"News"}
            ></HomePageButtons>
            <HomePageButtons
              widgetTextContent={"Check out the Courses!"}
              btnDestination={"Course"}
            ></HomePageButtons>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    width: "100%",
  },

  upperContainer: {},

  lowerContainer: {
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
    paddingTop: "5%",
    marginTop: "8%",
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
  },

  svg: {
    position: "absolute",
    top: "27%", // Adjust this value to align with your lower banner
    zIndex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 32,
  },
  textBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    marginTop: 32,
    textAlign: "center",
  },
  textBoxFirstText: {
    fontFamily: "Nimbus-Sans-Bold",
    fontSize: 22,
    textAlign: "center",
    color: "#707070",
  },
  textBoxSecondText: {
    fontFamily: "Nimbus-Sans-Bold",
    textAlign: "center",
    marginTop: 60,
    fontSize: 22,
    color: "#4B4B4B",
  },

  innerTextBox: {
    display: "flex",
    alignItems: "center",
  },
  textBoxText: {
    height: "100%",
    textAlign: "center",
    fontFamily: "Nimbus-Sans-Bold",
    fontSize: 22,
    color: "#707070",
  },
  textBoxTextTwo: {
    height: "100%",
    textAlign: "center",
    fontFamily: "Nimbus-Sans-Bold",
    fontSize: 22,
    color: "#4B4B4B",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  gridItem: {
    width: "40%",
    aspectRatio: 1,
    margin: 8,
    borderRadius: 8,
  },
  banner: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  bannerText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  bigBannerImage: {
    maxWidth: "95%",
    maxHeight: 200,
    resizeMode: "center",
    marginTop: "10%",
  },
  horizontalLine: {
    width: 100,
    height: 2,
    backgroundColor: "#82B4F9",
    marginVertical: 15,
  },
});

export default LandingPage;
