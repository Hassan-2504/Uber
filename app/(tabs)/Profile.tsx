import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [profileData, setProfileData] = useState({
    name: "John Smith",
    contact: "03005308403",
    email: "johnsmith@domain.abc",
    password: "************",
  });

  useEffect(() => {
    // Check if there are updated profile data passed from EditProfileScreen
    if (route.params?.updatedProfileData) {
      setProfileData(route.params.updatedProfileData);
    }
  }, [route.params?.updatedProfileData]);

  const ProfileField = ({ label, value, icon }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <MaterialIcons
          name={icon}
          size={24}
          color="#757575"
          style={styles.inputIcon}
        />
        <TextInput editable={false} value={value} style={styles.input} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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

          <Text style={styles.headerTitle}>Profile</Text>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate("Home")}
          >
            <MaterialIcons name="home" size={28} color="#673AB7" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileContent}>
          <Image
            source={require("../../assets/images/profile_image.png")}
            style={styles.profileImage}
          />
          <Text style={styles.emailText}>{profileData.email}</Text>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("EditProfile", { profileData })}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <ScrollView style={styles.fieldsContainer}>
            <ProfileField
              label="Your Name"
              value={profileData.name}
              icon="person"
            />
            <ProfileField
              label="Contact"
              value={profileData.contact}
              icon="phone"
            />
            <ProfileField
              label="Email"
              value={profileData.email}
              icon="email"
            />
            <ProfileField
              label="Password"
              value={profileData.password}
              icon="lock"
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF6FF",
  },
  contentContainer: {
    flex: 1,
    paddingTop: 30,
  },
  gradientBackground: {
    height: height * 0.3,
    margin: -26,
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "white",
  },
  emailText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#757575",
    marginTop: 16,
  },
  editButton: {
    backgroundColor: "#FF5722",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 16,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
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
});

export default UserProfileScreen;
