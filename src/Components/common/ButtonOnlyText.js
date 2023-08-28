import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const ButtonOnlyText = ({ title, destination, url, fontSize, onPress }) => {
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

  const dynamicOnPress = onPress ? onPress : handleButtonPress;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonColor }]}
      onPress={dynamicOnPress}
    >
      <Text style={[styles.buttonText, { fontSize: fontSize }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100%",
  },
  buttonText: {
    color: "#D954E5",
    fontFamily: "Nimbus-Sans-Bold",
    textAlign: "left",
    verticalAlign: "middle",
    width: "100%",
  },
});

export default ButtonOnlyText;
