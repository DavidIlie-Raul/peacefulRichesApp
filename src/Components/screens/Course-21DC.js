import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CustomButtonV3 from "../common/CustomButtonV3";
import { useNavigation } from "@react-navigation/native";

const Course21DC = () => {
  const sessions = [
    "The Right To Be Rich",
    "It’s Amazing To Be Rich",
    "Expect To Be Rich",
    "Victim Or Victor",
    "Scripting",
    "The Poverty Detox",
    "Create Space For Riches",
    "What Do You Want",
    "How To Dream",
    "Feel It Now",
    "Let The Riches Flow",
    "Challenge",
    "Re-Write Limiting Stories",
    "Self Love",
    "I Love Everything",
    "Heal Your Past",
    "Awaken Your Intuition",
    "Skills Of The Rich",
    "Personal Branding",
    "People Upgrade",
    "Inspired Action",
  ];

  const courseName = "THE 21 DAY CHALLENGE";

  const navigation = useNavigation();

  const navigateToSession = (index, courseName) => {
    // Assuming you have a screen named SessionPage where the session content is displayed
    navigation.navigate("SessionPage", {
      sessionIndex: index,
      courseName: courseName,
    });
  };

  return (
    <ScrollView>
      <LinearGradient
        colors={["rgba(130, 180, 249, 0.8)", "white"]}
        locations={[0, 0.06]} // Adjust the locations as needed
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.container}
      >
        <View style={styles.upperContainer}>
          <Image
            style={styles.image}
            source={require("../../images/Varianta2-10.png")}
          ></Image>
          <Text style={styles.textOne}>PEACEFUL RICHES</Text>
          <Text style={styles.textTwo}>THE 21 DAY CHALLENGE</Text>
          <View style={styles.horizontalLine} />
        </View>
        <View style={styles.lowerContainer}>
          <Text style={styles.textThree}>- SESSIONS -</Text>
          <View style={styles.sessionsListFlexContainer}>
            {sessions.map((session, index) => (
              <View key={index} style={styles.gridItem}>
                <View
                  key={index + 1}
                  style={styles.buttonsHorizontalLine}
                ></View>
                <CustomButtonV3
                  title={`#${index + 1} ${session}`}
                  destination={`PR12DC-${index + 1}`}
                  onPress={() => navigateToSession(index, courseName)}
                ></CustomButtonV3>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = new StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
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
  image: {
    marginTop: 100,
    width: 170,
    height: 170,
  },
});

export default Course21DC;
