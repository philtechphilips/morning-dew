const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// Get the default Metro configuration for Expo
const config = getDefaultConfig(__dirname);

// Add NativeWind with a CSS input file
module.exports = withNativeWind(config, {
  input: "./app/global.css", // Ensure this path exists in your project
});
