import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import AppButton from "../../components/Button";

const { width, height } = Dimensions.get("window");

const Splash2 = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleGenerateOTP = () => {
    if (!phoneNumber) {
      Alert.alert("Error", "Please enter a phone number.");
      return;
    }

    // Navigate to Verification screen with phone number as a parameter
    router.push({ pathname: "/Verification", params: { phoneNumber } });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={require("../../assets/images/Backkground1.png")}
        style={styles.backgroundImage}
      >
        <Image
          source={require("../../assets/images/background1.png")}
          style={styles.topRightImage}
          resizeMode="contain"
        />

        <View style={styles.contentContainer}>
          <Image
            source={require("../../assets/images/Splash2.png")}
            style={styles.carImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.heading}>Add Mobile Number</Text>
          <View style={styles.line} />
          <Text style={styles.subtitle}>Contact * </Text>
          <View style={styles.inputContainer}>
            <Image
              source={require("../../assets/images/Vector.png")}
              style={styles.phoneIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="+92 300 1234567"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <TouchableOpacity style={styles.button} onPress={handleGenerateOTP}>
              <Text style={styles.buttonText}>Generate OTP</Text>
            </TouchableOpacity>
          </View>

          <AppButton
            title="Verify"
            onPress={() => {}} // Empty function - no action on this screen
            buttonColor={"#A9A9A9"}
            textColor={"#A9A9A9"}
            textClassName="text-[#ffffff] text-xl font-semibold"
            className="w-full bg-[#A9A9A9] py-4 rounded-full mb-4 mt-8 flex-row items-center justify-center"
            width="100%"
            disabled={true}
          />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  topRightImage: {
    position: "absolute",
    top: 0,
    right: 0,
    width: width * 0.4,
    height: height * 0.15,
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  carImage: {
    width: width * 0.9,
    height: undefined,
    aspectRatio: 1,
    alignSelf: "center",
  },
  textContainer: {
    flex: 0.6,
    width: "100%",
    padding: width * 0.05,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  heading: {
    color: "#834DBF",
    fontSize: width * 0.06,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  line: {
    width: "100%",
    opacity: 0.2,
    height: 1,
    backgroundColor: "gray",
    marginVertical: 5,
  },
  subtitle: {
    marginTop: 10,
    fontSize: width * 0.045,
    fontWeight: "500",
    color: "black",
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
    borderWidth: 1,
    backgroundColor: "rgb(251, 246, 255)",
    borderColor: "rgb(251, 246, 230)",
    borderRadius: 8,
    marginTop: 10,
  },
  phoneIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: width * 0.04,
    paddingHorizontal: 10,
  },
  button: {
    marginLeft: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: "#4C9DE9",
    fontWeight: "500",
  },
});

export default Splash2;
