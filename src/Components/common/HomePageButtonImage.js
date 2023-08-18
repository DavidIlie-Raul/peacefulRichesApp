import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

import CustomButton from "./CustomButton";

const HomePageButtons = ({ widgetTextContent, btnDestination }) => {
  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        <View style={styles.gridItem}>
          <Image
            source={require("../../images/Varianta2-10.png")}
            style={styles.image}
          />
          <Text style={styles.text}>{widgetTextContent}</Text>
        </View>
        <CustomButton
          title={"Go there now!"}
          destination={btnDestination}
          url={""}
        ></CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  gridContainer: {
    height: 400,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 15,
  },
  gridItem: {
    height: 125,
    width: 125,
    borderWidth: 2,
    borderColor: "#82B4F9",
    padding: 10,
    borderRadius: 16,
    marginBottom: 25,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  text: {
    textAlign: "center",
    fontFamily: "Nimbus-Sans-Bold",
    color: "#707070",
    paddingTop: 10,
  },
});

export default HomePageButtons;
