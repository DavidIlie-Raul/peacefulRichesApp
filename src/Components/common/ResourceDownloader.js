import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";

const ResourceDownloader = ({ title, onPress, type, linktoDownload }) => {
  const [buttonColor, setButtonColor] = useState("transparent");
  const navigation = useNavigation();
  const icon = "exclamation";
  const IconTypeObject = () => {
    if (type === "pdf") {
      return <AntDesign name="pdffile1" size={18} color="black" />;
    } else if (type === "audio") {
      return <Ionicons name="musical-notes-outline" size={18} color="black" />;
    }
  };

  const handleDownload = async () => {
    const filename = "test.pdf";
    const result = await FileSystem.downloadAsync(
      "https://replit.com/@DavidIlie2/backEndPRWS#test.pdf",
      FileSystem.documentDirectory + filename
    );

    console.log(result);

    save(result.uri, filename, result.headers["content-type"].toLowerCase());
  };

  const save = async (uri, filename, mimetype) => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((e) => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };

  return (
    <View style={styles.buttonBackground}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={handleDownload}
      >
        <View style={styles.leftContent}>
          <IconTypeObject></IconTypeObject>
          <Text style={styles.buttonText}>{title}</Text>
        </View>
        <FontAwesome
          style={styles.downloadButton}
          name="download"
          size={20}
          color="#D954E5"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = new StyleSheet.create({
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
  downloadButton: {
    marginRight: 5,
  },
  gradientStyle: {
    borderRadius: 16,
    height: 40,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ResourceDownloader;
