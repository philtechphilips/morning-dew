import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

const SplashScreenComponent = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
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
        <Text style={styles.textTitle}>Morning Dew</Text>
        <Text style={styles.tagline}>
          Your daily guide to spiritual growth and divine inspiration.
        </Text>
        {loading ? (
          <ActivityIndicator size="large" color="#FFA500" />
        ) : (
          <Text>Redirecting...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
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
  tagline: {
    fontSize: 16,
    color: "#FFA500",
    textAlign: "center",
    fontWeight: "400",
    marginBottom: 20,
    lineHeight: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontFamily: "Merri",
  },
  textTitle: {
    fontSize: 24,
    color: "#FFF",
    textAlign: "center",
    fontWeight: "400",
    lineHeight: 24,
    fontFamily: "Merri-Bold",
  },
});

export default SplashScreenComponent;
