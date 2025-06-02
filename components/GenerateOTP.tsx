import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface GenerateOTPPopupProps {
  visible: boolean;
  onClose: () => void;
  onGenerateOTP: (phoneNumber: string) => void;
}

const GenerateOTPPopup: React.FC<GenerateOTPPopupProps> = ({
  visible,
  onClose,
  onGenerateOTP,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleGenerateOTP = () => {
    // Validate phone number
    const phoneRegex = /^3[0-9]{9}$/; // Pakistani mobile number format

    if (!phoneNumber.trim()) {
      Alert.alert("Error", "Please enter a phone number");
      return;
    }

    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert("Error", "Please enter a valid Pakistani phone number");
      return;
    }

    // Call the method to generate OTP with full phone number
    onGenerateOTP(`+92${phoneNumber}`);
  };

  const handleClose = () => {
    setPhoneNumber(""); // Reset phone number when closing
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.popup}>
          <LinearGradient
            colors={["#D8B3D5", "#D19BE8", "#CA81FC"]}
            style={styles.gradientHeader}
          >
            <Text style={styles.headerTitle}>Verify Your Phone</Text>
          </LinearGradient>

          <View style={styles.contentContainer}>
            <Text style={styles.title}>Enter Your Phone Number</Text>

            <View style={styles.phoneInputContainer}>
              <Text style={styles.countryCode}>+92</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="3XX XXXXXXX"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                maxLength={10}
                autoFocus={true}
              />
            </View>

            <Text style={styles.description}>
              We'll send a 6-digit verification code to this number
            </Text>

            <TouchableOpacity
              style={styles.generateButton}
              onPress={handleGenerateOTP}
            >
              <Text style={styles.generateButtonText}>Generate OTP</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
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
  },
  gradientHeader: {
    paddingVertical: 20,
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#834DBF",
    textAlign: "center",
    marginBottom: 20,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F6FF",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 50,
  },
  countryCode: {
    fontSize: 16,
    marginRight: 10,
    color: "#834DBF",
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: "#834DBF",
  },
  description: {
    fontSize: 14,
    color: "#757575",
    textAlign: "center",
    marginBottom: 20,
  },
  generateButton: {
    backgroundColor: "#834DBF",
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  generateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#834DBF",
  },
  closeButtonText: {
    color: "#834DBF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GenerateOTPPopup;
