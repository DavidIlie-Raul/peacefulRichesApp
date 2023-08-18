import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const CustomButtonV2 = ({ title, destination, url }) => {
  const [buttonColor, setButtonColor] = useState("transparent");
  const navigation = useNavigation();
  const handleButtonPress = () => {
    if (destination === "") {
      console.log("The " + title + " button has no destination set");
    }
    if (url === "") {
      console.log("The " + title + " button has no url set");
    }
    if (url !== "" && destination === "") {
      console.log(
        "This button has a url and no destination, redirecting to url! URL:" +
          url
      );
      Linking.openURL(url);
    } else if (destination !== "" && url === "") {
      console.log(
        "This button has a destination and no url, redirecting to destination! Destination: " +
          destination
      );
      navigation.navigate(destination);
    }
  };

  const pressFunctionality = () => {};

  return (
    <View style={styles.buttonBackground}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={handleButtonPress}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    maxWidth: "100%",
  },
  buttonText: {
    color: "black",
    fontSize: 13,
    fontFamily: "Nimbus-Sans-Bold",
    textAlign: "center",
    verticalAlign: "middle",
  },
  buttonBackground: {
    width: "100%",
    borderTopColor: "black",
    borderTopWidth: 2,
  },
  gradientStyle: {
    borderRadius: 16,
    height: 40,
  },
});

export default CustomButtonV2;
