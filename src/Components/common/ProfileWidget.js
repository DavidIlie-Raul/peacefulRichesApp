import { Text, Image, View, StyleSheet } from "react-native";
import ButtonOnlyText from "./ButtonOnlyText";

const ProfileWidget = () => {
  const handleLogout = () => {
    //Do Logout Logic Here
    console.log("logged Out");
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <Image
          style={styles.PFPImage}
          source={require("../../images/PFPTest.jpg")}
        ></Image>
        <Text style={styles.userNameText}>David Cultbertson</Text>
        <Text style={styles.userEmailText}>davidcultbertson@gmail.com</Text>
        <ButtonOnlyText
          title={"Logout"}
          destination={"Courses"}
          url={""}
          fontSize={15}
          onPress={handleLogout}
        ></ButtonOnlyText>
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  PFPImage: {
    maxHeight: 100,
    maxWidth: 100,
    borderRadius: 160,
    borderWidth: 1,
    borderColor: "#707070",
    marginVertical: 10,
  },
  userNameText: {
    color: "#4D4D4D",
    fontFamily: "Nimbus-Sans-Bold",
    fontSize: 18,
    marginBottom: 5,
  },
  userEmailText: {
    color: "#4D4D4D",
    fontFamily: "Nimbus-Sans-Bold",
    fontSize: 13,
    marginBottom: 25,
  },
});

export default ProfileWidget;
