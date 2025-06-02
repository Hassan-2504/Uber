import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface OTPPopupProps {
  visible: boolean;
  onClose: () => void;
  onVerify: (otpCode: string) => void;
  onResendOTP: () => void;
  initialPhoneNumber?: string;
}

const OTPPopup: React.FC<OTPPopupProps> = ({
  visible,
  onClose,
  onVerify,
  onResendOTP,
  initialPhoneNumber = "",
}) => {
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = useRef<(TextInput | null)[]>([]);

  // Reset OTP when popup opens
  useEffect(() => {
    if (visible) {
      setOtpValues(["", "", "", "", "", ""]);
      setPhoneNumber(initialPhoneNumber);
    }
  }, [visible, initialPhoneNumber]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Auto focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // Auto focus previous input if current is deleted
    if (!value && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    // Validate phone number
    if (!phoneNumber.trim()) {
      Alert.alert("Error", "Please enter a phone number");
      return;
    }

    // Validate OTP
    const otpCode = otpValues.join("");
    if (otpCode.length !== 6) {
      Alert.alert("Error", "Please enter a complete 6-digit OTP");
      return;
    }

    // Call the onVerify function with the OTP code
    onVerify(otpCode);
  };

  const handleResendCode = () => {
    onResendOTP();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.popup}>
          <LinearGradient
            colors={["#673AB7", "#512DA8"]}
            style={styles.gradientHeader}
          >
            <Text style={styles.headerTitle}>Verify Phone Number</Text>
          </LinearGradient>

          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollViewContent}
          >
            {/* Phone Number Display */}
            <View style={styles.inputLabelContainer}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <Text style={styles.required}>*</Text>
            </View>

            <View style={styles.phoneInputContainer}>
              <Text style={styles.phoneInputText}>{phoneNumber}</Text>
            </View>

            {/* OTP Input */}
            <Text style={styles.otpLabel}>Enter 6-Digit OTP</Text>

            <View style={styles.otpContainer}>
              {otpValues.map((value, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (otpInputRefs.current[index] = ref)}
                  style={[
                    styles.otpInput,
                    value ? styles.filledOtpInput : styles.emptyOtpInput,
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={value}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  autoCorrect={false}
                  selectTextOnFocus={true}
                />
              ))}
            </View>

            {/* Resend OTP */}
            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>Didn't receive the code? </Text>
              <TouchableOpacity onPress={handleResendCode}>
                <Text style={styles.resendButton}>Resend</Text>
              </TouchableOpacity>
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={handleVerify}
            >
              <Text style={styles.verifyButtonText}>Verify & Proceed</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  popup: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    maxHeight: "90%",
  },
  gradientHeader: {
    paddingVertical: 15,
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  inputLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  required: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
    marginLeft: 5,
  },
  phoneInputContainer: {
    height: 50,
    backgroundColor: "#F3F6FF",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    justifyContent: "center",
  },
  phoneInputText: {
    fontSize: 16,
    color: "#673AB7",
  },
  otpLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
    marginBottom: 10,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  emptyOtpInput: {
    borderColor: "#E0E0E0",
    backgroundColor: "#F5F5F5",
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
    fontSize: 16,
    color: "#757575",
  },
  resendButton: {
    color: "#673AB7",
    fontWeight: "bold",
  },
  verifyButton: {
    backgroundColor: "#673AB7",
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
  },
  verifyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OTPPopup;
