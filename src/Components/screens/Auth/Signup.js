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
import { useNavigation } from "@react-navigation/native";
import PocketBase from "pocketbase";
import { useAuth } from "../../../Utils/AuthContext";

const pb = new PocketBase("http://192.168.0.158:1450");

const CheckboxWithText = ({ label, onChange, color }) => {
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
          <AntDesign name="checkcircle" size={20} color="#82B4F9" />
        ) : (
          <Entypo name="circle" size={20} color={color || "#82B4F9"} />
        )}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const Signup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [password, setPassword] = useState("");
  const [checkbox1Checked, setCheckbox1Checked] = useState(false);
  const [checkbox2Checked, setCheckbox2Checked] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);
  const [isEmailTaken, setIsEmailTaken] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [inputBorderColor, setInputBorderColor] = useState("");
  const [checkboxColor, setCheckboxColor] = useState("");

  const authContext = useAuth();

  const { setIsLoggedIn, setUser, setCurrentAuthCredentials } = useAuth();

  const handleSignup = async () => {
    setIsEmailTaken(false);
    setIsUsernameTaken(false);
    setUsernameValid(true);
    setEmailValid(true);
    setPasswordValid(true);
    setConfirmPasswordValid(true);
    let lowerCaseEmail = email.toLocaleLowerCase();
    // Validate email, password, and confirm password before proceeding
    const isUsernameValid = /^[a-zA-Z0-9]+$/.test(username);
    const isEmailValid = /\S+@\S+\.\S+/.test(lowerCaseEmail);
    const isPasswordValid = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/.test(password);
    const isConfirmPasswordValid = confirmPassword === password;

    if (!isUsernameValid) {
      setUsernameValid(false);
      return;
    }

    if (!isEmailValid) {
      setEmailValid(false);
      return;
    }

    if (!isPasswordValid) {
      setPasswordValid(false);
      return;
    }

    if (!isConfirmPasswordValid) {
      setConfirmPasswordValid(false);
      return;
    }

    if (!checkbox1Checked || !checkbox2Checked) {
      console.log("agreement boxes not checked, return");

      setCheckboxColor("red");
      setTimeout(() => {
        setCheckboxColor("");
      }, 3000);

      return;
    }

    // Here you can add your logic for handling the signup
    console.log("Email:", lowerCaseEmail);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    console.log("Checkbox 1:", checkbox1Checked);
    console.log("Checkbox 2:", checkbox2Checked);
    // You can make API calls or perform authentication checks here

    const signupdata = {
      username: username,
      email: lowerCaseEmail,
      emailVisibility: false,
      password: password,
      passwordConfirm: confirmPassword,
      name: `${username}${Math.floor(Math.random() * 100000) + 1}`,
    };
    const processedPass = password.trim();
    console.log(signupdata.name);
    try {
      const record = await pb.collection("users").create(signupdata);
      console.log(record);

      setInputBorderColor("green");

      // Wait for 2 seconds then set borders back
      setTimeout(async () => {
        setInputBorderColor(""); // Reset the border colors
      }, 2000);

      try {
        const authdata = await pb
          .collection("users")
          .authWithPassword(lowerCaseEmail, password);
        console.log(pb.authStore.model, "logged in successfully");
        const initStatsObject = {
          usersname: record.id,
          courses_complete: 0,
          messages_sent: 0,
        };
        const initStatsRecord = await pb
          .collection("user_stats")
          .create(initStatsObject);
        if (pb.authStore.model !== null) {
          setIsLoggedIn(true);
          setUser(pb.authStore.model);
          setCurrentAuthCredentials({
            userOrEmail: lowerCaseEmail,
            pass: processedPass,
          });
          authContext.setIsLoggedIn(true); // Set isLoggedIn to true
        } else {
          authContext.setIsLoggedIn(false); // Set isLoggedIn to false
        }
      } catch (error) {
        console.log(
          error,
          error.data,
          "could not login, returned errors, redirecting to login page"
        );
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error.data.data);
      if (error?.data?.data?.username?.code === "validation_invalid_username") {
        setIsUsernameTaken(true);
        return;
      } else if (
        error?.data?.data?.email?.code === "validation_invalid_email"
      ) {
        setIsEmailTaken(true);
        console.log("email is taken, set emailtaken to true");
        return;
      }
    }
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
            <Text style={styles.title}>Signup</Text>
            <View style={styles.formContainer}>
              {/*Name Input Field*/}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: inputBorderColor
                        ? inputBorderColor
                        : usernameValid
                        ? "#82B4F9"
                        : "red",
                    },
                  ]}
                  placeholder="Letters and numbers only, eg. Dave2"
                  placeholderTextColor="#CDCDCD"
                  maxLength={50}
                  onChangeText={(text) => {
                    setUsername(text);
                  }}
                  value={username}
                />
                <Text
                  style={
                    !usernameValid
                      ? [styles.passGuideText, { color: "red" }]
                      : { display: "none" }
                  }
                >
                  Can only contain letters and numbers, no spaces or special
                  characters (!@#$) eg. davido21
                </Text>
                <Text
                  style={
                    isUsernameTaken
                      ? [styles.passGuideText, { color: "red" }]
                      : { display: "none" }
                  }
                >
                  Username already taken, please try a different one!
                </Text>
              </View>
              {/*Email Input Field*/}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: inputBorderColor
                        ? inputBorderColor
                        : emailValid
                        ? "#82B4F9"
                        : "red",
                    },
                  ]}
                  placeholder="eg. johnsmith@gmail.com"
                  placeholderTextColor="#CDCDCD"
                  maxLength={50} // Set the maximum character limit
                  onChangeText={(text) => {
                    setEmail(text);
                    // Perform email validation here
                    const isValid = /\S+@\S+\.\S+/.test(text); // Simple email validation
                    setEmailValid(isValid);
                  }}
                  value={email}
                />
                <Text
                  style={
                    isEmailTaken
                      ? [styles.passGuideText, { color: "red" }]
                      : { display: "none" }
                  }
                >
                  The email is invalid or already in use.
                </Text>
              </View>
              {/*Password Input Field*/}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: inputBorderColor
                        ? inputBorderColor
                        : passwordValid
                        ? "#82B4F9"
                        : "red",
                    }, // Update the border color
                  ]}
                  placeholder=""
                  placeholderTextColor="#CDCDCD"
                  maxLength={50} // Set the maximum character limit
                  secureTextEntry
                  onChangeText={(text) => {
                    setPassword(text);
                    // Perform password validation here
                    const isValid = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/.test(
                      text
                    );
                    setPasswordValid(isValid);
                  }}
                  value={password}
                />
                <Text style={styles.passGuideText}>
                  Should contain at least 8 characters, letters and numbers.
                  Special characters eg. (#@!$) are recommended, but not
                  required.
                </Text>
              </View>
              {/*Confirm Password Input Field*/}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: inputBorderColor
                        ? inputBorderColor
                        : confirmPasswordValid
                        ? "#82B4F9"
                        : "red",
                    },
                  ]}
                  placeholder=""
                  placeholderTextColor="#CDCDCD"
                  maxLength={50}
                  secureTextEntry
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    // Perform confirm password validation here
                    const isValid = text === password;
                    setConfirmPasswordValid(isValid);
                  }}
                  value={confirmPassword}
                />
              </View>

              <View style={styles.inputGroup}>
                <CheckboxWithText
                  label="I have read and agree to the Terms and Conditions and Privacy Policy."
                  onChange={setCheckbox1Checked}
                  color={checkboxColor}
                />
                <CheckboxWithText
                  label="I would like to signup to the Peaceful Riches    E-Mail Newsletter"
                  onChange={setCheckbox2Checked}
                  color={checkboxColor}
                />
              </View>

              <CustomLoginButton
                title={"Sign up"}
                maxWidth={"50%"}
                width={"40%"}
                onPress={handleSignup}
              ></CustomLoginButton>
              <View style={styles.footerContainer}>
                <View style={styles.horizontalLine}></View>
                <Text style={styles.footerText}>Have an account already?</Text>
                <CustomLoginButton
                  title={"Login"}
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
    height: 1150,
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

export default Signup;
