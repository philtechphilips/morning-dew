import { SafeAreaView, StyleSheet, StatusBar, Text, View } from "react-native";

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.header}>
        <Text style={{ color: "white" }}>Home</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
    paddingHorizontal: 100,
  },

  header: {
    padding: 20,
  },
});

export default HomeScreen;
