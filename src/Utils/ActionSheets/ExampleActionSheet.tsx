import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

function ExampleSheet(props: SheetProps<{ value: string }>) {
  return (
    <ActionSheet
      useBottomSafeAreaPadding
      id={props.sheetId}
      containerStyle={styles.container}
    >
      <View style={styles.optionView}>
        <Text style={styles.headingText}>Add Attachments</Text>
      </View>

      <View style={styles.optionView}>
        <TouchableOpacity
          onPress={() => {
            SheetManager.hide(props.sheetId, { payload: "image" });
          }}
        >
          <View style={styles.optionContainer}>
            <FontAwesome
              name="image"
              size={20}
              color="black"
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Attach Image(s)</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.optionView}>
        <TouchableOpacity
          onPress={() => {
            SheetManager.hide(props.sheetId, { payload: "file" });
          }}
        >
          <View style={styles.optionContainer}>
            <FontAwesome
              name="file-o"
              size={20}
              color="black"
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Attach File(s)</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: 20,
    color: "cyan",
    textAlign: "center",
    fontFamily: "Nimbus-Sans-Bold",
    paddingVertical: "5%",
  },
  optionText: {
    textAlign: "center",
    fontFamily: "Nimbus-Sans-Regular",
  },
  optionIcon: {
    marginRight: 5,
  },
  optionView: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    paddingHorizontal: 5,
  },
  optionContainer: {
    margin: "5%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
  },
  container: {
    minHeight: "30%",
  },
});

export default ExampleSheet;
