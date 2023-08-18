import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

import CustomButton from "./CustomButton";

const CustomButtonRow = () => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.gridItem}>
        <CustomButton
          title={"Go there now!"}
          url={"http://www.peacefulriches.com"}
          destination={""}
        ></CustomButton>
      </View>

      <View style={styles.gridItem}>
        <CustomButton
          title={"Go there now!"}
          url={"https://discord.gg/TZmha3AUzW"}
          destination={""}
        ></CustomButton>
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  gridItem: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    marginHorizontal: "8%",
  },
});

export default CustomButtonRow;
