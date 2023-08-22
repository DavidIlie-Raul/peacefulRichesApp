import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import CustomLoginButton from "../../common/CustomLoginButton";
import CustomButton from "../../common/CustomButton";
import ButtonOnlyText from "../../common/ButtonOnlyText";

const CheckboxWithText = ({ label, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onChange && onChange(!isChecked);
  };

  return (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={handleCheckboxChange}
    >
      <View style={styles.checkbox}>
        {isChecked ? (
          <AntDesign name="checkcircle" size={20} color="#D954E5" />
        ) : (
          <Entypo name="circle" size={20} color="#82B4F9" />
        )}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const PassReset = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox1Checked, setCheckbox1Checked] = useState(false);
  const [checkbox2Checked, setCheckbox2Checked] = useState(false);

  const handleReset = () => {
    // Here you can add your logic for handling the login
    console.log("Email:", email);
    console.log("Pass Reset initiated");
    // You can make API calls or perform authentication checks here
  };

  const screenHeight = Dimensions.get("window").height;

  return (
    <View style={[styles.mainContainer, { height: screenHeight }]}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#D954E5", "#82B4F9"]}
          style={styles.gradientBackground}
        >
          <View style={styles.midContainer}>
            <Text style={styles.title}>Forgot your password?</Text>
            <Text style={styles.smallerTitle}>
              Enter the Email associated to your account below to proceed with
              resetting your password.
            </Text>
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="eg. johnsmith@gmail.com"
                  placeholderTextColor="#CDCDCD"
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                />
              </View>

              <CustomLoginButton
                title={"Proceed"}
                maxWidth={"50%"}
                width={"40%"}
                onPress={handleReset}
              ></CustomLoginButton>
              <View style={styles.footerContainer}>
                <View style={styles.horizontalLine}></View>
                <Text style={styles.footerText}>Changed your mind?</Text>
                <CustomLoginButton
                  title={"Go Back"}
                  destination={"Login"}
                  url={""}
                  width={"40%"}
                  maxWidth={"50%"}
                ></CustomLoginButton>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  },

  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    maxWidth: "100%",
  },

  input: {
    width: "100%",
    height: 40,
    borderColor: "#82B4F9",
    borderWidth: 2,
    borderRadius: 6,
    padding: 10,
  },
  inputGroup: {
    marginBottom: 30,
    width: "100%",
  },
  inputLabel: {
    width: "100%",
    fontFamily: "Nimbus-Sans-Bold",
    fontSize: 15,
    color: "#707070",
  },

  gradientBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  footerContainer: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  footerText: {
    marginBottom: 15,
    fontFamily: "Nimbus-Sans-Bold",
    fontSize: 15,
    color: "#707070",
    textAlign: "center",
  },
  bigBannerImage: {
    maxWidth: 150,
    maxHeight: 150,
    resizeMode: "center",
    marginTop: 30,
  },

  midContainer: {
    backgroundColor: "white",
    width: 320,
    marginVertical: "20%",
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  formContainer: {
    marginVertical: 50,
    height: 300,
    width: "80%",
    alignItems: "center",
  },

  checkboxLabel: {
    flex: 1,
    fontFamily: "Nimbus-Sans-Bold",
    fontSize: 10,
    textAlign: "left",
    color: "#82B4F9",
    marginLeft: 5,
    width: "100%",
  },

  logoTitle: {
    fontSize: 22,
    marginTop: "3%",
    color: "black",
    fontFamily: "Nimbus-Sans-Bold",
  },

  passGuideText: {
    fontFamily: "Nimbus-Sans-Bold",
    fontSize: 8,
    marginTop: 5,
    textAlign: "center",
    color: "#CDCDCD",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 60,
  },
  smallerTitle: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#707070",
    marginTop: 15,
    maxWidth: "80%",
  },
  textBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    marginTop: 32,
    textAlign: "center",
  },
  textBoxFirstText: {
    fontFamily: "Nimbus-Sans-Bold",
    fontSize: 22,
    textAlign: "center",
    color: "#707070",
  },
  textBoxSecondText: {
    fontFamily: "Nimbus-Sans-Bold",
    textAlign: "center",
    marginTop: 60,
    fontSize: 22,
    color: "#4B4B4B",
  },
  horizontalLine: {
    width: 100,
    height: 2,
    backgroundColor: "#82B4F9",
    marginVertical: 15,
  },
});

export default PassReset;
