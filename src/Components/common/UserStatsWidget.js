import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

import CustomButton from "./CustomButton";

const UserStatsWidget = ({ statType }) => {
  if (statType === "dateJoined") {
    return (
      <View style={styles.container}>
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <Text style={styles.statTitleText}>Joined:</Text>
            <Text style={styles.text}>22/08/2023</Text>
          </View>
        </View>
      </View>
    );
  } else if (statType === "coursesCompleted") {
    return (
      <View style={styles.container}>
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <Text style={styles.statTitleText}>Completed:</Text>
            <Text style={styles.text}>0 Courses</Text>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {},
  gridContainer: {
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
    borderRadius: 16,
    marginBottom: 25,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontFamily: "Nimbus-Sans-Bold",
    color: "#4D4D4D",
  },

  statTitleText: {
    textAlign: "center",
    fontFamily: "Nimbus-Sans-Bold",
    color: "#707070",
  },
});

export default UserStatsWidget;
