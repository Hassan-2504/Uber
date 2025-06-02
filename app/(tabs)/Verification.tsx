import React, { useState, useEffect, useRef, createRef } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import AppButton from "../../components/Button";

const { width, height } = Dimensions.get("window");

const Verification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const navigation = useNavigation();
  const route = useRoute();

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

    if (route.params && route.params.phoneNumber) {
      setPhoneNumber(route.params.phoneNumber);
    }

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [route.params]);

  const handleVerifyOTP = () => {
    const enteredOTP = otp.join("");
    if (enteredOTP.length !== 6) {
      Alert.alert("Error", "Please enter the full 6-digit OTP.");
      return;
    }
    if (enteredOTP === "123456") {
      Alert.alert("Success", "OTP verified successfully!");
      router.push("/Home");
    } else {
      Alert.alert("Error", "Invalid OTP. Please try again.");
    }
  };

  const handleResendOTP = () => {
    Alert.alert("Info", "OTP has been resent.");
  };

  const inputRefs = Array(6)
    .fill()
    .map(() => createRef());

  const handleInputChange = (index, text) => {
    const newText = text.replace(/[^0-9]/g, "");
    const newOtp = [...otp];
    newOtp[index] = newText;
    setOtp(newOtp);
    if (newText && index < 5) {
      inputRefs[index + 1].current.focus();
    } else if (index === 5) {
      Keyboard.dismiss();
    }
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
            source={require("../../assets/images/verification.png")}
            style={styles.carImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.heading}>Add Mobile Number</Text>
          <View style={styles.line} />
          <Text style={styles.subtitle}>Contact *</Text>
          <View style={styles.phoneInputContainer}>
            <Image
              source={require("../../assets/images/Vector.png")}
              style={styles.phoneIcon}
            />
            <TextInput
              style={styles.phoneInputText}
              placeholder="+92 300 1234567"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
          <Text style={styles.heading}>Enter OTP</Text>
          <View style={styles.otpInputContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={[
                  styles.otpInput,
                  digit ? styles.filledOtpInput : styles.emptyOtpInput,
                ]}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleInputChange(index, text)}
                ref={inputRefs[index]}
              />
            ))}
          </View>
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>
              If you didn't receive a code?{" "}
            </Text>
            <TouchableOpacity onPress={handleResendOTP}>
              <Text style={styles.resendButton}>Resend OTP</Text>
            </TouchableOpacity>
          </View>
          <AppButton
            title="Verify"
            onPress={handleVerifyOTP}
            buttonColor="#834DBF"
            textColor="#FFFFFF"
            width="100%"
            className="w-full bg-[#834DBF] py-4 rounded-full mb-4 flex-row items-center justify-center"
            textClassName="text-white text-xl font-semibold"
            customIcon={null}
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
    flex: 1,
    padding: width * 0.05,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    alignItems: "center",
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
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
    borderWidth: 1,
    backgroundColor: "rgb(251, 246, 255)",
    borderColor: "rgb(251, 246, 230)",
    borderRadius: 8,
    marginVertical: 10,
  },
  phoneIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  phoneInputText: {
    flex: 1,
    height: 40,
    fontSize: width * 0.04,
    paddingHorizontal: 10,
    color: "black",
  },
  otpInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  otpInput: {
    width: width * 0.12,
    height: height * 0.07,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: "center",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
  emptyOtpInput: {
    borderColor: "rgb(251, 246, 255)",
    backgroundColor: "rgb(251, 246, 255)",
  },
  filledOtpInput: {
    borderColor: "#673AB7",
    backgroundColor: "white",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  resendText: {
    color: "gray",
    marginRight: 5,
  },
  resendButton: {
    color: "red",
    fontWeight: "bold",
  },
});

export default Verification;
