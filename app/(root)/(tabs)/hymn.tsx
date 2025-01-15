import { hymns } from "@/constants/hymns";
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Hymn = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  // State to manage the search query and search box visibility
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  // Function to filter hymns based on the search query
  const filteredHymns = hymns.filter((hymn) =>
    hymn.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderHymnItem = ({ item, index }: { item: any; index: number }) => (
    <View
      style={[
        styles.hymnItem,
        { backgroundColor: isDarkMode ? "#171717" : "#f5f5f5" },
      ]}
    >
      <Text
        style={[styles.hymnText, { color: isDarkMode ? "#fff" : "#000" }]}
      >{`${index + 1}. ${item.title}`}</Text>
    </View>
  );

  // Function to clear the search input
  const clearSearch = () => {
    setSearchQuery("");
  };

  // Toggle search box visibility
  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      setSearchQuery(""); // Clear search query when toggling the search box visibility
    }
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
          Hymns
        </Text>
        <TouchableOpacity onPress={toggleSearchVisibility}>
          <Icon name="search" size={24} color={isDarkMode ? "#fff" : "#000"} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      {isSearchVisible && (
        <View
          style={[
            styles.searchContainer,
            { backgroundColor: isDarkMode ? "#333" : "#e0e0e0" },
          ]}
        >
          <TextInput
            style={[
              styles.searchInput,
              { color: isDarkMode ? "#fff" : "#000" },
            ]}
            placeholder="Search Hymns"
            placeholderTextColor={isDarkMode ? "#aaa" : "#555"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearIcon}>
              <Icon
                name="clear"
                size={24}
                color={isDarkMode ? "#fff" : "#000"}
              />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Filtered Hymns List */}
      <FlatList
        data={filteredHymns}
        renderItem={renderHymnItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />

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
  },
  header: {
    padding: 20,
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 6,
  },
  clearIcon: {
    paddingLeft: 10,
  },
  listContainer: {
    paddingBottom: 80,
  },
  hymnItem: {
    padding: 16,
    paddingVertical: 28,
    borderRadius: 8,
    marginBottom: 8,
  },
  hymnText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Merri",
  },
  hymnDetails: {
    fontSize: 14,
    color: "#666",
  },
  chorusContainer: {
    marginTop: 10,
  },
  chorusText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chorusLine: {
    fontSize: 14,
    color: "#333", // For light mode
  },
});

export default Hymn;
