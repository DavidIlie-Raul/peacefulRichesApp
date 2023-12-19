import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

function ImageViewerSheet(props: SheetProps<{ value: any }>) {
  const imageSource = `${props.payload.value}`;
  console.log(imageSource);
  return (
    <ActionSheet
      useBottomSafeAreaPadding
      id={props.sheetId}
      containerStyle={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageSource }} style={styles.image}></Image>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  image: {
    marginHorizontal: 10,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  container: {
    height: "60%",
  },
});

export default ImageViewerSheet;
