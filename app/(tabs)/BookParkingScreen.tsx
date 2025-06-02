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

const { height } = Dimensions.get("window");

const BookingConfirmationScreen = () => {
  const bookingDetails = {
    spot: "A-10",
    location: "Cinema Parking",
    address: "Basement / A - Block / Slot - 10",
    carNumber: "LHR-0000",
    startDate: "February 12, 2025",
    startDay: "Wednesday",
    startTime: "12:30 PM",
    endDate: "February 12, 2025",
    endDay: "Wednesday",
    endTime: "04:30 PM",
    hourlyRate: "2.5 €",
    total: "10.00 €",
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={styles.backgroundImage}
    >
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <View style={styles.backButtonContainer}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </View>
      </TouchableOpacity>

      <Text style={styles.screenTitle}>Book Parking Space</Text>

      {/* Main Content */}
      <View style={styles.container}>
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

        {/* Booking Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Details</Text>
          <View style={styles.carNumberContainer}>
            <Ionicons name="car" size={24} color="#FF5722" />
            <Text style={styles.carNumber}>{bookingDetails.carNumber}</Text>
          </View>

          {/* Time Details */}
          <View style={styles.timeDetailsContainer}>
            <View style={styles.timeColumn}>
              <Text style={styles.timeLabel}>Arrive at</Text>
              <View style={styles.dateTimeBox}>
                <View style={styles.iconContainer}>
                  <Ionicons name="calendar-outline" size={20} color="#FF5722" />
                </View>
                <View>
                  <Text style={styles.dateText}>
                    {bookingDetails.startDate}
                  </Text>
                  <Text style={styles.dayText}>{bookingDetails.startDay}</Text>
                </View>
              </View>
              <View style={styles.dateTimeBox}>
                <View style={styles.iconContainer}>
                  <Ionicons name="time-outline" size={20} color="#FF5722" />
                </View>
                <Text style={styles.timeText}>{bookingDetails.startTime}</Text>
              </View>
            </View>

            <View style={styles.timeColumn}>
              <Text style={styles.timeLabel}>Exit at</Text>
              <View style={styles.dateTimeBox}>
                <View style={styles.iconContainer}>
                  <Ionicons name="calendar-outline" size={20} color="#FF5722" />
                </View>
                <View>
                  <Text style={styles.dateText}>{bookingDetails.endDate}</Text>
                  <Text style={styles.dayText}>{bookingDetails.endDay}</Text>
                </View>
              </View>
              <View style={styles.dateTimeBox}>
                <View style={styles.iconContainer}>
                  <Ionicons name="time-outline" size={20} color="#FF5722" />
                </View>
                <Text style={styles.timeText}>{bookingDetails.endTime}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Booking Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Per Hour Cost</Text>
            <Text style={styles.summaryValue}>{bookingDetails.hourlyRate}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>VAT</Text>
            <Text style={styles.summaryValue}>0 €</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Cost</Text>
            <Text style={styles.totalValue}>{bookingDetails.total}</Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.paymentSection}>
          <View style={styles.paymentRow}>
            <Ionicons name="card-outline" size={24} color="#0066FF" />
            <Text style={styles.paymentLabel}>Payment Method</Text>
            <Text style={styles.paymentValue}>Stripe ▼</Text>
          </View>
        </View>

        {/* Book Now Button */}
        <AppButton
          title="Book Now"
          onPress={() => router.push("/BookingSuccess")}
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
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1000,
  },
  backButtonContainer: {
    backgroundColor: "#834DBF",
    borderRadius: 12,
    padding: 8,
  },
  screenTitle: {
    position: "absolute",
    top: 50,
    left: 70,
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "600",
    zIndex: 1000,
  },
  container: {
    height: height * 0.85,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: height * 0.15,
    padding: 20,
    justifyContent: "space-between",
  },
  spotContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  carNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3F0",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  carNumber: {
    marginLeft: 10,
    fontSize: 16,
    color: "#FF5722",
    fontWeight: "500",
  },
  timeDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeColumn: {
    flex: 1,
    marginRight: 10,
  },
  timeLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  dateTimeBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3F0",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  dateText: {
    fontSize: 14,
    color: "#FF5722",
  },
  dayText: {
    fontSize: 12,
    color: "#FF5722",
    opacity: 0.8,
  },
  timeText: {
    fontSize: 14,
    color: "#FF5722",
    marginLeft: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#666",
  },
  summaryValue: {
    fontSize: 16,
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF5722",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF5722",
  },
  paymentSection: {
    marginBottom: 20,
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F7FF",
    padding: 15,
    borderRadius: 12,
  },
  paymentLabel: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#0066FF",
  },
  paymentValue: {
    fontSize: 16,
    color: "#0066FF",
    fontWeight: "500",
  },
});

export default BookingConfirmationScreen;
