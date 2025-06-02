import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AppButton from "../../components/Button";

const { width, height } = Dimensions.get("window");

const BookingSuccessScreen = () => {
  const bookingDetails = {
    spot: "A-10",
    location: "Cinema Parking",
    address: "Basement / A - Block / Slot - 10",
    arriveTime: "12:30 PM",
    arriveDate: "Feb 12, 2025",
    exitTime: "04:30 PM",
    exitDate: "Feb 12, 2025",
    duration: "4 Hours",
    total: "10.00 €",
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={styles.backgroundImage}
    >
      {/* Home Button */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => router.push("/(tabs)/Home")}
      >
        <View style={styles.homeButtonContainer}>
          <Ionicons name="home" size={24} color="white" />
        </View>
      </TouchableOpacity>

      {/* Main Content */}
      <View style={styles.container}>
        {/* Success Icon */}
        <View style={styles.successIconContainer}>
          <Ionicons name="checkmark" size={50} color="white" />
        </View>

        {/* Success Message */}
        <Text style={styles.successTitle}>Booking Successful</Text>
        <Text style={styles.totalAmount}>{bookingDetails.total}</Text>

        {/* Spot Details */}
        <View style={styles.spotContainer}>
          <View style={styles.spotNumberBox}>
            <Text style={styles.spotNumber}>{bookingDetails.spot}</Text>
          </View>
          <View style={styles.locationContainer}>
            <Text style={styles.location}>{bookingDetails.location}</Text>
            <Text style={styles.address}>{bookingDetails.address}</Text>
          </View>
        </View>

        {/* Booking Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Booking Details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Arrive at</Text>
            <Text style={styles.detailValue}>
              {`${bookingDetails.arriveTime} / ${bookingDetails.arriveDate}`}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Exit at</Text>
            <Text style={styles.detailValue}>
              {`${bookingDetails.exitTime} / ${bookingDetails.exitDate}`}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>{bookingDetails.duration}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Cost Paid</Text>
            <Text style={styles.totalValue}>{bookingDetails.total}</Text>
          </View>
        </View>

        {/* View Map Button */}
        <AppButton
          title="View Map"
          onPress={() => router.push("/(tabs)/MapScreen")}
          buttonColor="#834DBF"
          textColor="#FFFFFF"
          width="100%"
          className="w-full bg-[#834DBF] py-4 rounded-full mb-4 flex-row items-center justify-center"
          textClassName="text-white text-xl font-semibold"
          customIcon={null}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  homeButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1000,
  },
  homeButtonContainer: {
    backgroundColor: "#834DBF",
    borderRadius: 12,
    padding: 8,
  },
  container: {
    height: height * 0.75,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: height * 0.25,
    padding: 20,
    alignItems: "center",
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#834DBF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    color: "#834DBF",
    fontWeight: "600",
    marginBottom: 10,
  },
  totalAmount: {
    fontSize: 32,
    color: "#FF5722",
    fontWeight: "bold",
    marginBottom: 30,
  },
  spotContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 30,
  },
  spotNumberBox: {
    backgroundColor: "#FF5722",
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
  },
  spotNumber: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  locationContainer: {
    flex: 1,
  },
  location: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    color: "#666",
  },
  detailsContainer: {
    width: "100%",
    marginBottom: 30,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 16,
    color: "#333",
  },
  detailValue: {
    fontSize: 16,
    color: "#666",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  totalLabel: {
    fontSize: 18,
    color: "#FF5722",
    fontWeight: "600",
  },
  totalValue: {
    fontSize: 18,
    color: "#FF5722",
    fontWeight: "600",
  },
});

export default BookingSuccessScreen;
