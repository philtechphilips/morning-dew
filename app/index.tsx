import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

const SplashScreenComponent = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const colorScheme = useColorScheme(); // Detect the current color scheme (light or dark)

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);

      const timer = setTimeout(() => {
        setLoading(false);
        router.push("/home");
      }, 5000);

      return () => clearTimeout(timer);
    }, [router]),
  );

  const isDarkMode = colorScheme === "dark";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#171717" : "white" },
      ]}
    >
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/church.jpg")}
        />
      </View>
      <View style={styles.textContainer}>
        <Text
          style={[styles.textTitle, { color: isDarkMode ? "#FFF" : "#171717" }]}
        >
          Morning Dew
        </Text>
        <Text style={[styles.tagline, { color: "#FFA500" }]}>
          Your daily guide to spiritual growth and divine inspiration.
        </Text>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={isDarkMode ? "#FFA500" : "#FF4500"}
          />
        ) : (
          <Text
            style={[
              styles.redirectingText,
              { color: isDarkMode ? "#FFF" : "#000" },
            ]}
          >
            Redirecting...
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    marginTop: "70%",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    borderRadius: 20,
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  textTitle: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "600",
    lineHeight: 32,
    fontFamily: "Merri-Bold",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
    lineHeight: 24,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontFamily: "Merri",
  },
  redirectingText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
    fontFamily: "Merri",
  },
});

export default SplashScreenComponent;
