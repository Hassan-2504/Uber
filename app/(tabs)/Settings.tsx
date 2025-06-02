import {
  View,
  Text,
  Switch,
  ScrollView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import BottomNavigation from "../../components/BottomNavigation";

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Account Section */}
        <Pressable style={styles.menuItem}>
          <View style={styles.menuItemContent}>
            <Ionicons name="person-outline" size={24} color="#007AFF" />
            <View style={styles.textContainer}>
              <Text style={styles.menuTitle}>Account</Text>
              <Text style={styles.menuSubtitle}>
                Manage your account settings
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
          </View>
        </Pressable>

        {/* Notifications Section */}
        <View style={styles.menuItem}>
          <View style={styles.menuItemContent}>
            <Ionicons name="notifications-outline" size={24} color="#34C759" />
            <View style={styles.textContainer}>
              <Text style={styles.menuTitle}>Enable Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
            />
          </View>
        </View>

        {/* Privacy Section */}
        <Pressable style={styles.menuItem}>
          <View style={styles.menuItemContent}>
            <Ionicons name="lock-closed-outline" size={24} color="#FF9500" />
            <View style={styles.textContainer}>
              <Text style={styles.menuTitle}>Privacy</Text>
              <Text style={styles.menuSubtitle}>Manage privacy settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
          </View>
        </Pressable>

        {/* Language Section */}
        <Pressable style={styles.menuItem}>
          <View style={styles.menuItemContent}>
            <Ionicons name="language" size={24} color="#AF52DE" />
            <View style={styles.textContainer}>
              <Text style={styles.menuTitle}>Language</Text>
              <Text style={styles.menuSubtitle}>Change app language</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
          </View>
        </Pressable>

        {/* About Section */}
        <Pressable style={styles.menuItem}>
          <View style={styles.menuItemContent}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#5856D6"
            />
            <View style={styles.textContainer}>
              <Text style={styles.menuTitle}>About</Text>
              <Text style={styles.menuSubtitle}>App version and details</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
          </View>
        </Pressable>
      </ScrollView>
      <BottomNavigation selectedTab={3} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF6FF",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  scrollView: {
    flex: 1,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
    backgroundColor: "#fff",
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  menuSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});

export default Settings;
