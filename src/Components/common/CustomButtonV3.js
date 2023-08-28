import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const CustomButtonV3 = ({ title, onPress, isChecked, onCheckboxPress }) => {
  const [buttonColor, setButtonColor] = useState("transparent");
  const navigation = useNavigation();

  return (
    <View style={styles.buttonBackground}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={onPress}
      >
        <View style={styles.checkBoxAndTitleContainer}>
          <TouchableOpacity onPress={onCheckboxPress}>
            <Ionicons
              name={isChecked ? "checkbox" : "checkbox-outline"}
              size={20}
              color={isChecked ? "#D954E5" : "#707070"}
              style={styles.checkbox}
            />
          </TouchableOpacity>
          <Text style={styles.buttonText}>{title}</Text>
        </View>
        <Ionicons name={"arrow-forward-circle"} size={20} color={"#D954E5"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: "black",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 30,
    maxWidth: "100%",
  },
  buttonText: {
    color: "black",
    fontSize: 12,
    fontFamily: "Nimbus-Sans-Bold",
    textAlign: "center",
    marginLeft: 5,
    paddingTop: 1,
  },
  buttonBackground: {
    width: "100%",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 16,
  },
  gradientStyle: {
    borderRadius: 16,
    height: 40,
  },
  checkbox: {
    marginLeft: 10,
  },
  checkBoxAndTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CustomButtonV3;
