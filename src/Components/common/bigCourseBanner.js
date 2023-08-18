import { Text, View, Image, StyleSheet } from "react-native";
import CustomButtonV2 from "./CustomButtonV2";

const BigCourseBanner = ({ btnDestination, imgSource, courseTitle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image style={styles.image} source={imgSource}></Image>
        <CustomButtonV2
          title={courseTitle}
          destination={btnDestination}
          url={""}
        ></CustomButtonV2>
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {},
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 300,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    maxWidth: "100%",
    height: 200,
    resizeMode: "contain",
  },
});

export default BigCourseBanner;
