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
import BigCourseBanner from "../common/bigCourseBanner";

const CoursePage = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <UpperBanner></UpperBanner>
        </View>

        <View style={styles.lowerContainer}>
          <View style={styles.textBox}>
            <Text style={styles.textBoxSecondText}>Courses</Text>
            <View style={styles.horizontalLine} />
          </View>

          <BigCourseBanner
            btnDestination={"Course21DC"}
            imgSource={require("../../images/21DCBanner.png")}
            courseTitle={"THE 21 DAY CHALLENGE"}
          ></BigCourseBanner>
          <View style={styles.horizontalLine} />
          <Text style={styles.comingSoonText}>More coming soon!</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
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
  comingSoonText: {
    fontFamily: "Nimbus-Sans-Bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 60,
    paddingBottom: 150,
  },
  textBoxSecondText: {
    fontFamily: "Nimbus-Sans-Bold",
    textAlign: "center",
    marginTop: 0,
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
    marginVertical: 25,
  },
});

export default CoursePage;
