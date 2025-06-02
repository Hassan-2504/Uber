import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./Navigation"; // You'll create this

const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    // Add other reducers here
  },
});

export default store;
