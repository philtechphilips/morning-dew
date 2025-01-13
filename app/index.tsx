import { Link } from "expo-router";
import { Text, View } from "react-native";
import "./global.css";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-blue-900 text-xl">
        Edit app/index.tsx to edit this screen.
      </Text>
      <Link href="/explore">Explore</Link>
    </View>
  );
}
