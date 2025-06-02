import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { scaleWidth, scaleHeight, commonStyles } from "../utils/responsive";

interface BottomNavigationProps {
  selectedTab: number;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ selectedTab }) => {
  const handleTabPress = (tabIndex: number) => {
    router.push(
      tabIndex === 0
        ? "/(tabs)/Home"
        : tabIndex === 1
        ? "/(tabs)/MapScreen"
        : tabIndex === 2
        ? "/(tabs)/Booking"
        : "/(tabs)/Profile"
    );
  };

  return (
    <View style={styles.bottomNavContainer}>
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => handleTabPress(0)}
        >
          <Ionicons
            name="home"
            size={scaleWidth(24)}
            color={selectedTab === 0 ? "#CA81FC" : "#666"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => handleTabPress(1)}
        >
          <Ionicons
            name="map"
            size={scaleWidth(24)}
            color={selectedTab === 1 ? "#CA81FC" : "#666"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => handleTabPress(2)}
        >
          <LinearGradient
            colors={["#CA81FC", "#E8A3BD"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Ionicons name="car" size={scaleWidth(20)} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => handleTabPress(3)}
        >
          <Ionicons
            name="person"
            size={scaleWidth(24)}
            color={selectedTab === 3 ? "#CA81FC" : "#666"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavContainer: {
    position: "absolute",
    bottom: scaleHeight(20),
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    paddingHorizontal: scaleWidth(16),
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(30),
    padding: scaleWidth(8),
    justifyContent: "space-around",
    alignItems: "center",
    ...commonStyles.shadow,
  },
  bottomNavItem: {
    alignItems: "center",
    justifyContent: "center",
    width: scaleWidth(50),
    height: scaleHeight(50),
  },
  gradientButton: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    borderRadius: scaleWidth(20),
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BottomNavigation;
