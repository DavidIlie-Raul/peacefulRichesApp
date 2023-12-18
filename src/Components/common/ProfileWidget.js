import { Text, Image, View, StyleSheet } from "react-native";
import ButtonOnlyText from "./ButtonOnlyText";
import PocketBase from "pocketbase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../../Utils/AuthContext";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileWidget = () => {
  const {
    setIsLoggedIn,
    user,
    setUser,
    dbUrl,
    currentAuthCredentials,
    authJWT,
  } = useAuth();
  const [pfpImgUri, setPfPImgUri] = useState(null);
  const pb = new PocketBase(dbUrl);

  const [selectedImage, setSelectedImage] = useState(null);

  const getProfilePictureFromServer = () => {
    const userPfp = user.avatar;
    const userID = user.id;

    if (
      userPfp &&
      userPfp !== "" &&
      userPfp !== null &&
      userPfp !== undefined
    ) {
      const urlBase = `${dbUrl}/api/files`;
      const urlIdentifier = `/${user.collectionId}/${userID}/${userPfp}`;
      const pfpURI = `${urlBase}${urlIdentifier}`;
      setPfPImgUri(pfpURI);
    }
  };

  useEffect(() => {
    getProfilePictureFromServer();
  }, []);

  const handleLogout = () => {
    // Do Logout Logic Here
    setUser(null);
    pb.authStore.clear;
    AsyncStorage.removeItem("authJWT");
    if (pb.authStore.model === null) {
      setIsLoggedIn(false);
    } else {
      return console.log("Logout Failed");
    }
    console.log("logged Out");
  };

  const addPfp = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);

      //handle file upload and response of that upload

      const formData = new FormData();

      formData.append("avatar", {
        name: "avatar",
        uri: result.assets[0].uri,
        type: "image/jpg",
      });

      try {
        pb.authStore.save(authJWT, null);
        await pb.collection("users").authRefresh();
        console.log(pb.authStore);
        console.log(pb.authStore.model.id);
        const response = await pb
          .collection(user.collectionName)
          .update(user.id, formData);
        console.log(response);
      } catch (error) {
        return console.log("updating PFP failed:" + error);
      }

      setPfPImgUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        {pfpImgUri ? (
          <TouchableOpacity onPress={() => addPfp()}>
            <Image style={styles.PFPImage} source={{ uri: pfpImgUri }}></Image>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => addPfp()}>
            <View style={styles.addPfp}>
              <MaterialCommunityIcons
                name="file-image-plus-outline"
                size={24}
                color="#D954E5"
              ></MaterialCommunityIcons>
            </View>
          </TouchableOpacity>
        )}
        <Text style={styles.userNameText}>{user.username}</Text>
        <Text style={styles.userEmailText}>{user.email}</Text>
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
    height: 100,
    width: 100,
    maxHeight: 100,
    maxWidth: 100,
    borderRadius: 160,
    borderWidth: 2,
    borderColor: "#82B4F9",
    marginVertical: 15,
  },
  addPfp: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
    maxHeight: 100,
    maxWidth: 100,
    borderRadius: 160,
    borderWidth: 2,
    borderColor: "#82B4F9",
    marginVertical: 15,
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
