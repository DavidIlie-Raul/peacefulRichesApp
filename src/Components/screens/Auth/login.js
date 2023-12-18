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
import { useAuth } from "../../../Utils/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PocketBase from "pocketbase";

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
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authHasNotFailed, setAuthHasNotFailed] = useState(true);
  const [isUserOrEmailEmpty, setIsUserOrEmailEmpty] = useState(false);
  const [isPassValid, setIsPassValid] = useState(true);
  const { dbUrl } = useAuth();
  const pb = new PocketBase(dbUrl);

  const { setIsLoggedIn, setUser, setCurrentAuthCredentials } = useAuth();

  const handleLogin = async () => {
    setIsUserOrEmailEmpty(false);
    setAuthHasNotFailed(true);
    setIsPassValid(true);
    // Here you can add your logic for handling the login
    const lowerCaseEmail = emailOrUsername.toLocaleLowerCase().trim();
    const processedPass = password.trim();

    //check if pass is valid, if not, make the input red, then turn it back after 5 seconds
    if (lowerCaseEmail === "" || lowerCaseEmail === null) {
      setIsUserOrEmailEmpty(true);

      setTimeout(() => {
        setIsUserOrEmailEmpty(false);
      }, 5000);

      return;
    }

    //check if pass is valid, if not, make the input red, then turn it back after 5 seconds
    if (password === "" || password === null) {
      setIsPassValid(false);

      setTimeout(() => {
        setIsPassValid(true);
      }, 5000);

      return;
    }

    console.log("Email:", lowerCaseEmail);
    console.log("Password:", processedPass);
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(lowerCaseEmail, processedPass);

      if (pb.authStore.model !== null) {
        setIsLoggedIn(true);
        console.log(pb.authStore);
        await AsyncStorage.setItem("authJWT", pb.authStore.token);
        setUser(pb.authStore.model);
        setCurrentAuthCredentials({
          userOrEmail: lowerCaseEmail,
          pass: processedPass,
        });
      } else {
        setIsLoggedIn(false);
      }
      // You can make API calls or perform authentication checks here
    } catch (error) {
      setIsLoggedIn(false);
      console.log(error);
      // Check if the error has a response status code
      if (error.data && error.data.code === 400) {
        console.log("Authentication failed with status code 400");
        setAuthHasNotFailed(false);
        setTimeout(() => {
          setAuthHasNotFailed(true);
        }, 4000);
      } else {
        console.log("login Failed with error:" + error);
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
            <Text style={styles.title}>Login</Text>
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email or Username</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor:
                        !isUserOrEmailEmpty && authHasNotFailed
                          ? "#82B4F9"
                          : "red",
                    },
                  ]}
                  placeholder="eg. john@gmail.com or john21"
                  placeholderTextColor="#CDCDCD"
                  onChangeText={(text) => {
                    setEmailOrUsername(text);
                  }}
                  value={emailOrUsername}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor:
                        isPassValid && authHasNotFailed ? "#82B4F9" : "red",
                    },
                  ]}
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
