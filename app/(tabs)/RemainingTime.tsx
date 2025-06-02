import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

interface TimeBoxProps {
  value: string;
  unit: string;
  color: string;
}
const DottedLine = () => (
  <View style={styles.dottedLine}>
    {[...Array(50)].map((_, i) => (
      <View key={i} style={styles.dot} />
    ))}
  </View>
);
const TimeBox = ({ value, unit, color }: TimeBoxProps) => (
  <View style={styles.timeBoxContainer}>
    <View style={[styles.timeBox, { backgroundColor: color }]}>
      <Text style={styles.timeValue}>{value}</Text>
      <Text style={styles.timeUnit}>{unit}</Text>
    </View>
  </View>
);

interface DetailRowProps {
  title: string;
  value: string;
}

const DetailRow = ({ title, value }: DetailRowProps) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailTitle}>{title}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const RemainingTimeScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => router.push("/(tabs)/Home")}
      >
        <Icon name="home" size={24} color="#9C58E0" />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.timerIcon}>
              <Icon name="timer" size={55} color="white" />
            </View>
            <Text style={styles.heading}>Remaining time</Text>
          </View>

          <View style={styles.timeBoxesContainer}>
            <TimeBox value="2" unit="Days" color="#611DEC" />
            <TimeBox value="14" unit="Hours" color="#EB1D67" />
            <TimeBox value="59" unit="Minutes" color="#EB8B1D" />
          </View>

          <View style={styles.parkingHeader}>
            <View style={styles.spotBadge}>
              <Text style={styles.spotNumber}>A-10</Text>
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.locationTitle}>A Cinema Parking</Text>
              <Text style={styles.locationSubtitle}>2nd Floor / A Sector</Text>
            </View>
          </View>

          <DottedLine />

          <View style={styles.detailsContainer}>
            <DetailRow title="Booking Date" value="Sep 23, 2024" />
            <DetailRow title="No. of Parking" value="#310" />
          </View>

          <View style={styles.barcode}>
            <Text style={styles.barcodeText}>Barcode Here</Text>
          </View>

          <TouchableOpacity
            style={styles.finishButton}
            onPress={() => router.push("/(tabs)/ThankYou")}
          >
            <Text style={styles.buttonText}>Finish</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.renewButton}
            onPress={() => {
              /* Renew Logic */
            }}
          >
            <Text style={styles.renewText}>Renew</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F2FB",
    paddingTop: 35,
    marginTop: 35,
  },
  homeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    width: "100%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  cardHeader: {
    alignItems: "center",
    marginBottom: 16,
  },
  timerIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FE8A71",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -60,
    marginBottom: 24,
  },
  heading: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "#000",
    marginBottom: 8,
  },
  timeBoxesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.04,
  },
  timeBoxContainer: {
    alignItems: "center",
  },
  timeBox: {
    width: 90,
    height: 90,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  timeValue: {
    color: "white",
    fontSize: width * 0.07,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  timeUnit: {
    color: "white",
    fontSize: width * 0.045,
    marginTop: height * 0.01,
    fontFamily: "Poppins-Regular",
  },
  parkingHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  spotBadge: {
    backgroundColor: "#FF7C52",
    width: 60,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  spotNumber: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 14,
  },
  locationInfo: {
    marginLeft: 12,
  },
  locationTitle: {
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "Poppins-Medium",
  },
  locationSubtitle: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: height * 0.025,
  },
  detailsContainer: {
    marginVertical: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  detailTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#888",
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#000",
    textAlign: "right",
  },
  barcode: {
    height: 60,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  barcodeText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#666",
  },
  finishButton: {
    backgroundColor: "#9C58E0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    width: "100%",
    marginTop: 24,
    marginBottom: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    marginRight: 8,
  },
  renewButton: {
    alignItems: "center",
    marginTop: 8,
  },
  renewText: {
    color: "#9C58E0",
    fontSize: 20,
    fontFamily: "Poppins-Bold",
  },
  dottedLine: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  dot: {
    width: 3,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 1.7,
  },
});

export default RemainingTimeScreen;
