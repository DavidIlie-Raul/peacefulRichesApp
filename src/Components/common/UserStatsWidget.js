import { React, useEffect } from "react";
import PocketBase from "pocketbase";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

import CustomButton from "./CustomButton";
import { useAuth } from "../../Utils/AuthContext";
import { useState } from "react";

const UserStatsWidget = ({ statType }) => {
  const { dbUrl, currentAuthCredentials } = useAuth();
  const [dateJoined, setDateJoined] = useState(null);
  const [dbCoursesCompleted, setDBCoursesCompleted] = useState(null);
  const pb = new PocketBase(dbUrl);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const authData = await pb
          .collection("users")
          .authWithPassword(
            currentAuthCredentials.userOrEmail,
            currentAuthCredentials.pass
          );

        const dateJoined = pb.authStore.model.created;
        const DateJoined_year = dateJoined.substring(0, 4);
        const DateJoined_month = dateJoined.substring(5, 7);
        const DateJoined_day = dateJoined.substring(8, 10);

        const formattedDateJoined =
          DateJoined_year + "/" + DateJoined_month + "/" + DateJoined_day;
        setDateJoined(formattedDateJoined);

        const coursesCompleted = await pb
          .collection("user_stats")
          .getFirstListItem(`usersname = "${pb.authStore.model.id}"`);
        console.log(coursesCompleted);
        setDBCoursesCompleted(coursesCompleted.courses_completed);
      } catch (error) {
        return console.log("fetching stats has failed" + error);
      }
    };

    fetchStats(); // Call the function inside the useEffect
  }, []);

  if (statType === "dateJoined") {
    return (
      <View style={styles.container}>
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <Text style={styles.statTitleText}>Joined:</Text>
            <Text style={styles.text}>{dateJoined}</Text>
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
            <Text style={styles.text}>{dbCoursesCompleted}</Text>
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
