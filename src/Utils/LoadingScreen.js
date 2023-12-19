import { View, Text, Image, StyleSheet, Button } from "react-native";
import { React, useRef, useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import "../images/image1.png";

const LoadingScreen = () => {
  const defaultAnim = useSharedValue(90);

  const duration = 3000;

  const animatedDefault = useAnimatedStyle(() => ({
    transform: [{ rotateZ: defaultAnim.value + "deg" }],
  }));

  useEffect(() => {
    defaultAnim.value = withRepeat(
      withTiming(-defaultAnim.value, {
        easing: Easing.bounce,
        duration,
      }),
      -1,
      true
    );
  }, []);

  return (
    <Animated.View style={styles.container}>
      <Animated.Image
        style={[styles.logo, animatedDefault]}
        source={require("../images/Varianta2-10.png")}
      ></Animated.Image>
      <Text style={styles.headline}>PEACEFUL RICHES</Text>
      <Text style={styles.loadingText}>Loading</Text>
    </Animated.View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
  logo: {
    resizeMode: "center",
    maxHeight: "20%",
    maxWidth: "100%",
    marginBottom: 10,
  },
  loadingText: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 20,
  },
  headline: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 25,
    marginBottom: 30,
  },
});
