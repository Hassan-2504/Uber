// app/(tabs)/layout.tsx
import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen name="Splash1" options={{ headerShown: false }} />
      <Stack.Screen name="Splash2" options={{ headerShown: false }} />
      <Stack.Screen name="Verification" options={{ headerShown: false }} />
      <Stack.Screen name="Home" options={{ headerShown: false }} />
      <Stack.Screen name="Profile" options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" options={{ headerShown: false }} />
      <Stack.Screen name="Notification" options={{ headerShown: false }} />
      <Stack.Screen name="Booking" options={{ headerShown: false }} />
      <Stack.Screen name="Transactions" options={{ headerShown: false }} />
      <Stack.Screen name="Settings" options={{ headerShown: false }} />
      <Stack.Screen name="BookingSuccess" options={{ headerShown: false }} />
      <Stack.Screen name="RemainingTime" options={{ headerShown: false }} />
      <Stack.Screen name="ThankYou" options={{ headerShown: false }} />
      <Stack.Screen name="Navigation" options={{ headerShown: false }} />
      <Stack.Screen name="ParkingScreen" options={{ headerShown: false }} />
      <Stack.Screen name="Details" options={{ headerShown: false }} />
      <Stack.Screen name="Slots" options={{ headerShown: false }} />
      <Stack.Screen name="BookParkingScreen" options={{ headerShown: false }} />
      <Stack.Screen name="MapScreen" options={{ headerShown: false }} />
      <Stack.Screen
        name="TransactionDetails"
        options={{ headerShown: false }}
      />
      {/* Add more screens here with headerShown: false as needed */}
    </Stack>
  );
}
