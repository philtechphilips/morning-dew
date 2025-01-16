import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import * as Speech from "expo-speech"; // Correct import
import bible from "../../../constants/bible.json"; // Update the path to your Bible JSON file

type Bible = {
  name: string;
  chapters: string[][];
}[];

const typedBible: Bible = bible as Bible;

const devotionData = [
  {
    date: "THU, JAN 16, 2025",
    title: "Identifying Wall of Jericho Part 3",
    read: "Genesis 1:1-5", // Example verse reference
    reflection:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio temporibus quidem deleniti animi? Ullam, corporis. Fuga eligendi adipisci aperiam blanditiis rerum perspiciatis error modi corrupti in eius, eaque exercitationem aliquam dignissimos, labore facilis ipsum a nam officiis praesentium est veniam!",
    prayer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quod.",
    application:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quod.",
  },
];

const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  // Get the current date and format it
  const currentDate = new Date();
  const formattedDate = currentDate
    .toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();

  const todayDevotion = devotionData.find(
    (devotion) => devotion.date === formattedDate,
  );

  const getVerses = (reference: string): string => {
    if (!reference) return "";

    // Parse the reference
    const [book, chapterAndVerses] = reference.split(" ");
    const [chapter, verseRange] = chapterAndVerses.split(":");
    const [startVerse, endVerse] = verseRange.split("-").map(Number);

    // Find the book in the Bible data
    const bookData = typedBible.find(
      (b) => b.name.toLowerCase() === book.toLowerCase(),
    );
    if (!bookData) return "Book not found";

    // Get the chapter data
    const chapterData = bookData?.chapters[parseInt(chapter, 10) - 1];
    if (!chapterData) return "Chapter not found";

    // Select and process the verses
    const selectedVerses = chapterData.slice(startVerse - 1, endVerse);
    return selectedVerses
      .map((verse, index) => {
        // Preserve short inline annotations (e.g., "{it was}") but remove long ones with colons or explanations
        const cleanedVerse = verse.replace(/\{[^{}]*?:.*?\}/g, "").trim();
        return `${startVerse + index}. ${cleanedVerse}`;
      })
      .join("\n");
  };

  let bibleVerses = "";
  if (todayDevotion) {
    bibleVerses = getVerses(todayDevotion?.read);
  }

  const readAloud = () => {
    const content = `
      Date: ${formattedDate}
      Title: ${todayDevotion?.title}
      Read: ${todayDevotion?.read}
      Verses: ${bibleVerses}
      Reflection: ${todayDevotion?.reflection}
      Application: ${todayDevotion?.application}
    `;
    Speech.speak(content, {
      language: "en",
    });
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#000" : "#fff" },
      ]}
    >
      <View style={styles.header}>
        <Text
          style={[styles.headerText, { color: isDarkMode ? "#fff" : "#000" }]}
        >
          Home
        </Text>
        <TouchableOpacity onPress={readAloud}>
          <Icon
            name="volume-up"
            size={24}
            color={isDarkMode ? "#fff" : "#000"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingBottom: 120 }}
      >
        <View
          style={[
            styles.verseContainer,
            { backgroundColor: isDarkMode ? "#171717" : "#f5f5f5" },
          ]}
        >
          <View style={styles.dateRow}>
            <FontAwesome
              name="calendar"
              size={24}
              color="#FFA500"
              style={styles.icon}
            />
            <Text style={[styles.title]}>{formattedDate}</Text>
          </View>

          <Text
            style={[
              styles.devotionTitle,
              { color: isDarkMode ? "#f5f5f5" : "#171717" },
            ]}
          >
            {todayDevotion?.title}
          </Text>
        </View>

        <View
          style={[
            styles.verseContainer,
            { backgroundColor: isDarkMode ? "#171717" : "#f5f5f5" },
          ]}
        >
          <View style={styles.readRow}>
            <FontAwesome
              name="book"
              size={24}
              color="#FFA500"
              style={styles.icon}
            />
            <Text style={[styles.title, { marginLeft: 8 }]}>READ:</Text>
          </View>

          <Text
            style={[
              styles.content,
              { color: isDarkMode ? "#fff" : "#171717", marginTop: 8 },
            ]}
          >
            {todayDevotion?.read}
          </Text>

          <Text
            style={[
              styles.content,
              { color: isDarkMode ? "#fff" : "#171717", marginTop: 8 },
            ]}
          >
            {bibleVerses}
          </Text>
        </View>

        <View
          style={[
            styles.verseContainer,
            { backgroundColor: isDarkMode ? "#171717" : "#f5f5f5" },
          ]}
        >
          <View style={styles.readRow}>
            <FontAwesome
              name="lightbulb"
              size={24}
              color="#FFA500"
              style={styles.icon}
            />
            <Text style={[styles.title, { marginLeft: 8 }]}>REFLECTION:</Text>
          </View>

          <Text
            style={[
              styles.content,
              { color: isDarkMode ? "#fff" : "#171717", marginTop: 8 },
            ]}
          >
            {todayDevotion?.reflection}
          </Text>
        </View>

        <View
          style={[
            styles.verseContainer,
            {
              backgroundColor: isDarkMode ? "#171717" : "#f5f5f5",
              marginBottom: 80,
            },
          ]}
        >
          <View style={[styles.readRow]}>
            <FontAwesome
              name="tasks"
              size={24}
              color="#FFA500"
              style={styles.icon}
            />
            <Text style={[styles.title, { marginLeft: 8 }]}>Application:</Text>
          </View>

          <Text
            style={[
              styles.content,
              { color: isDarkMode ? "#fff" : "#171717", marginTop: 8 },
            ]}
          >
            {todayDevotion?.application}
          </Text>
        </View>
      </ScrollView>

      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        translucent
        backgroundColor="transparent"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  header: {
    padding: 20,
    marginTop: 10,
    position: "sticky",
    top: 0,
    zIndex: 1,
    width: "100%",
    shadowRadius: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "500",
  },
  verseContainer: {
    padding: 16,
    backgroundColor: "#171717",
    marginBottom: 20,
    borderRadius: 8,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  readRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 22,
    fontFamily: "Merri",
    color: "#FFA500",
  },
  content: {
    fontSize: 20,
    lineHeight: 32,
    fontFamily: "Merri",
  },
  devotionTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: "Merri-Bold",
    marginTop: 8,
  },
});

export default HomeScreen;
