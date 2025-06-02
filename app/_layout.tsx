// app/layout.tsx
import { Stack } from "expo-router";
import "../global.css";
import { Provider } from "react-redux";
import store from "./store/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Add more screens here as needed */}
      </Stack>
    </Provider>
  );
}
