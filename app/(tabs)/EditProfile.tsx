import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const { height } = Dimensions.get("window");

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState(route.params.profileData);
  const [profileImage, setProfileImage] = useState(
    require("../../assets/images/profile_image.png")
  );

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    });

    if (!result.cancelled) {
      setProfileImage({ uri: result.uri });
    }
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Success", "Profile updated successfully!");
      navigation.navigate("User  Profile", { updatedProfileData: profileData });
    }, 1500);
  };

  const handleChange = useCallback((field, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }, []);

  const EditableField = ({ label, value, icon }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <MaterialIcons
          name={icon}
          size={24}
          color="#757575"
          style={styles.inputIcon}
        />
        <TextInput
          value={value}
          onChangeText={(text) => handleChange(label.toLowerCase(), text)}
          style={styles.input}
          placeholderTextColor="#757575"
          autoCapitalize="none"
          secureTextEntry={label === "Password"}
          onFocus={() => Keyboard.dismiss()} // Dismiss keyboard on focus
        />
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust this value as needed
    >
      <View style={styles.contentContainer}>
        <ImageBackground
          source={require("../../assets/images/Gradient.png")}
          style={styles.gradientBackground}
          resizeMode="contain"
        />

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Edit Profile</Text>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate("Home")}
          >
            <MaterialIcons name="home" size={28} color="#673AB7" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileContent}>
          <TouchableOpacity
            style={styles.profileImageContainer}
            onPress={handleImagePicker}
            activeOpacity={0.9}
          >
            <Image source={profileImage} style={styles.profileImage} />
            <View style={styles.editImageButton}>
              <MaterialIcons name="camera-alt" size={16} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          <Text style={styles.emailText}>{profileData.email}</Text>

          <ScrollView style={styles.fieldsContainer}>
            <EditableField
              label="Your Name"
              value={profileData.name}
              icon="person"
            />
            <EditableField
              label="Contact"
              value={profileData.contact}
              icon="phone"
            />
            <EditableField
              label="Email"
              value={profileData.email}
              icon="email"
            />
            <EditableField
              label="Password"
              value={profileData.password}
              icon="lock"
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveChanges}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.saveButtonText}>Save Changes</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  contentContainer: {
    flex: 1,
    paddingTop: 30,
  },
  gradientBackground: {
    height: height * 0.3,
    marginTop: -40,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerButton: {
    backgroundColor: "white",
    width: 45,
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  profileContent: {
    alignItems: "center",
    paddingTop: 25,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "white",
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2196F3",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  emailText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#757575",
    marginTop: 16,
  },
  fieldsContainer: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 32,
  },
  fieldContainer: {
    marginVertical: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    marginBottom: 6,
  },
  inputContainer: {
    backgroundColor: "#F3F6FF",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#757575",
    paddingVertical: 16,
  },
  saveButton: {
    backgroundColor: "#673AB7",
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: "center",
    marginVertical: 20,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default EditProfileScreen;
