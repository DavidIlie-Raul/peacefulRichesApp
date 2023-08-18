import React from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const UpperBanner = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#D954E5", "#82B4F9"]}
        style={[
          styles.gradientBackground,
          { width: Dimensions.get("window").width },
        ]}
      />
      <View style={styles.contentContainer}>
        <Image
          style={styles.bigBannerImage}
          source={require("../../images/Varianta2-12.png")}
        />
        <Text style={styles.title}>PEACEFUL RICHES</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: "-25%",
  },

  gradientBackground: {
    position: "absolute",
    height: Dimensions.get("window").height * 0.5,
    width: "100%",
  },

  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "20%",
  },

  bigBannerImage: {
    maxWidth: 150,
    maxHeight: 150,
    resizeMode: "center",
    marginTop: "0%",
  },

  title: {
    fontSize: 25,
    marginTop: "3%",
    color: "white",
    fontFamily: "Nimbus-Sans-Bold",
  },
});

export default UpperBanner;
