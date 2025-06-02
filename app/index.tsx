// app/index.tsx
import { Text, View } from "react-native";
import { useRouter } from "expo-router"; // Import useRouter for navigation
import "../global.css";

export default function Index() {
  const router = useRouter();

  const navigateToSplash = () => {
    router.push("/(tabs)/Splash1"); // Navigate to the Splash screen
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Text className="text-blue-700" onPress={navigateToSplash}>
        Edit app/index... Growing!! Tap to go to Splash
      </Text>
    </View>
  );
}
