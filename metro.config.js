const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Keep svg in assetExts for static files
config.resolver.assetExts.push("svg");

// Add svg to sourceExts for components
config.resolver.sourceExts.push("svg");

// Configure svg transformer
config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");

module.exports = withNativeWind(config, {
  input: "./global.css", // Adjust this if you have a global CSS file
});
