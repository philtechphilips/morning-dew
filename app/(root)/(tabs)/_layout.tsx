import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import React from "react"; // Import necessary components for SVG

// Inline SVG icon component
const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: JSX.Element; // Type for the SVG component
  title: string;
}) => (
  <View style={{ alignItems: "center", marginTop: 20 }}>
    <View style={{ width: 60, height: 24 }}>
      {React.cloneElement(icon, {
        color: focused ? "#FFA500" : "#FFF", // Set color dynamically based on focus
      })}
    </View>
    <Text
      style={{
        color: focused ? "#FFA500" : "#fff",
        width: 60,
        textAlign: "center",
        fontWeight: 500,
      }}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  // Example SVG icons as JSX elements
  const HomeIcon = (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      style={{ backgroundColor: "transparent" }}
    >
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path
        d="M12.5812 2.68627C12.2335 2.43791 11.7664 2.43791 11.4187 2.68627L1.9187 9.47198L3.08118 11.0994L11.9999 4.7289L20.9187 11.0994L22.0812 9.47198L12.5812 2.68627ZM19.5812 12.6863L12.5812 7.68627C12.2335 7.43791 11.7664 7.43791 11.4187 7.68627L4.4187 12.6863C4.15591 12.874 3.99994 13.177 3.99994 13.5V20C3.99994 20.5523 4.44765 21 4.99994 21H18.9999C19.5522 21 19.9999 20.5523 19.9999 20V13.5C19.9999 13.177 19.844 12.874 19.5812 12.6863ZM5.99994 19V14.0146L11.9999 9.7289L17.9999 14.0146V19H5.99994Z"
        fill="currentColor" // Set the fill to currentColor for dynamic color changes
      />
    </Svg>
  );

  const SearchIcon = (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      style={{ backgroundColor: "transparent" }}
    >
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path
        d="M14 21C13.4477 21 13 20.5523 13 20V12C13 11.4477 13.4477 11 14 11H20C20.5523 11 21 11.4477 21 12V20C21 20.5523 20.5523 21 20 21H14ZM4 13C3.44772 13 3 12.5523 3 12V4C3 3.44772 3.44772 3 4 3H10C10.5523 3 11 3.44772 11 4V12C11 12.5523 10.5523 13 10 13H4ZM9 11V5H5V11H9ZM4 21C3.44772 21 3 20.5523 3 20V16C3 15.4477 3.44772 15 4 15H10C10.5523 15 11 15.4477 11 16V20C11 20.5523 10.5523 21 10 21H4ZM5 19H9V17H5V19ZM15 19H19V13H15V19ZM13 4C13 3.44772 13.4477 3 14 3H20C20.5523 3 21 3.44772 21 4V8C21 8.55228 20.5523 9 20 9H14C13.4477 9 13 8.55228 13 8V4ZM15 5V7H19V5H15Z"
        fill="currentColor" // Set the fill to currentColor for dynamic color changes
      />
    </Svg>
  );

  const HymnIcon = (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      style={{ backgroundColor: "transparent" }}
    >
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path
        d="M20 3V17C20 19.2091 18.2091 21 16 21C13.7909 21 12 19.2091 12 17C12 14.7909 13.7909 13 16 13C16.7286 13 17.4117 13.1948 18 13.5351V5H9V17C9 19.2091 7.20914 21 5 21C2.79086 21 1 19.2091 1 17C1 14.7909 2.79086 13 5 13C5.72857 13 6.41165 13.1948 7 13.5351V3H20ZM5 19C6.10457 19 7 18.1046 7 17C7 15.8954 6.10457 15 5 15C3.89543 15 3 15.8954 3 17C3 18.1046 3.89543 19 5 19ZM16 19C17.1046 19 18 18.1046 18 17C18 15.8954 17.1046 15 16 15C14.8954 15 14 15.8954 14 17C14 18.1046 14.8954 19 16 19Z"
        fill="currentColor" // Set the fill to currentColor for dynamic color changes
      />
    </Svg>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#2a2a2a",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={HomeIcon} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={SearchIcon} title="Explore" />
          ),
        }}
      />
      <Tabs.Screen
        name="hymn"
        options={{
          title: "Hymn",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={HymnIcon} title="Hymn" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
