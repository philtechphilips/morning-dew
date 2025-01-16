import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { hymns } from "@/constants/hymns"; // Import hymns data
import { useLocalSearchParams, useRouter } from "expo-router"; // Correct hook to use
import { Ionicons } from "@expo/vector-icons"; // Icon library for back arrow

const HymnDetail = () => {
  const { hymnId } = useLocalSearchParams<{ hymnId?: any }>();
  const hymn = hymns.find((hymn) => hymn.id == hymnId); // Find the hymn by id
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  if (!hymn) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? "#000" : "#fff" },
        ]}
      >
        <Text style={[{ color: isDarkMode ? "#fff" : "#000" }]}>
          Hymn not found
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#000" : "#e0e0e0" },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDarkMode ? "#fff" : "#171717"} // Set color based on theme
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerText,
            { color: isDarkMode ? "#fff" : "#171717" },
          ]}
        >
          Hymn {hymnId}
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title]}>{hymn.title}</Text>

        {hymn.verses.map((verse, index) => (
          <View
            style={[
              styles.verseContainer,
              { backgroundColor: isDarkMode ? "#171717" : "#f5f5f5" },
            ]}
            key={index}
          >
            <Text style={[styles.verseText]}>Verse {index + 1}:</Text>
            {verse.map((line, idx) => (
              <Text
                key={idx}
                style={[
                  styles.verseLine,
                  { color: isDarkMode ? "#ddd" : "#171717" },
                ]}
              >
                {line}
              </Text>
            ))}
          </View>
        ))}
        {hymn.chorus.length > 0 && (
          <View
            style={[
              styles.verseContainer,
              { backgroundColor: isDarkMode ? "#171717" : "#f5f5f5" },
            ]}
          >
            <Text style={[styles.sectionTitle]}>Chorus</Text>
            {hymn.chorus.map((line, index) => (
              <Text
                key={index}
                style={[
                  styles.verseLine,
                  { color: isDarkMode ? "#ddd" : "#171717" },
                ]}
              >
                {line}
              </Text>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center", // Align items horizontally
  },
  backButton: {
    paddingVertical: 5,
    paddingRight: 15, // Spacing between back arrow and title
  },
  headerText: {
    fontSize: 28,
    fontWeight: "500",
    flex: 1, // Allow title to take remaining space
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    paddingVertical: 40,
    fontFamily: "Merri-Bold",
    color: "#FFA500",
    paddingHorizontal: 24,
  },
  verseContainer: {
    padding: 16,
    backgroundColor: "#171717",
    marginBottom: 20,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Merri",
    marginTop: 20,
    color: "#FFA500",
  },
  verseText: {
    fontSize: 20,
    fontFamily: "Merri",
    color: "#FFA500",
  },
  verseLine: {
    fontSize: 20,
    marginTop: 10,
    fontFamily: "Merri",
  },
  chorusLine: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default HymnDetail;
