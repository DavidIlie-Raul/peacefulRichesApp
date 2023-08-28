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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox1Checked, setCheckbox1Checked] = useState(false);
  const [checkbox2Checked, setCheckbox2Checked] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  const handleLogin = () => {
    // Here you can add your logic for handling the login
    const isValid = /\S+@\S+\.\S+/.test(email);
    if (!isValid) {
      setEmailValid(false);
    }
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Checkbox 1:", checkbox1Checked);
    console.log("Checkbox 2:", checkbox2Checked);
    // You can make API calls or perform authentication checks here
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <LinearGradient
          colors={["#D954E5", "#82B4F9"]}
          style={styles.gradientBackground}
        >
          <View style={styles.midContainer}>
            <Image
              style={styles.bigBannerImage}
              source={require("../../../images/Varianta2-10.png")}
            ></Image>
            <Text style={styles.logoTitle}> PEACEFUL RICHES</Text>
            <View style={styles.horizontalLine}></View>
            <Text style={styles.title}>Login</Text>
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={[
                    styles.input,
                    { borderColor: emailValid ? "#82B4F9" : "red" },
                  ]}
                  placeholder="eg. johnsmith@gmail.com"
                  placeholderTextColor="#CDCDCD"
                  onChangeText={(text) => {
                    setEmail(text);
                    // Perform email validation here
                    const isValid = /\S+@\S+\.\S+/.test(text); // Simple email validation
                    setEmailValid(isValid);
                  }}
                  value={email}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder=""
                  placeholderTextColor="#CDCDCD"
                  secureTextEntry
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                />
                <ButtonOnlyText
                  title={"Forgot Password?"}
                  url={""}
                  destination={"PassReset"}
                  fontSize={10}
                ></ButtonOnlyText>
              </View>

              <CustomLoginButton
                title={"Login"}
                maxWidth={"50%"}
                width={"40%"}
                onPress={handleLogin}
              ></CustomLoginButton>
              <View style={styles.footerContainer}>
                <View style={styles.horizontalLine}></View>
                <Text style={styles.footerText}>No account yet?</Text>
                <CustomLoginButton
                  title={"Signup"}
                  destination={"Signup"}
                  url={""}
                  width={"40%"}
                  maxWidth={"50%"}
                ></CustomLoginButton>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 800,
    backgroundColor: "white",
    width: 320,
    marginVertical: "20%",
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  formContainer: {
    marginTop: 50,
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

export default Login;
