import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import BottomNavigation from "../../components/BottomNavigation";
import { useFonts } from "expo-font";
import ExtendTimeModal from "../../components/ExtendTimeModal";

const { width, height } = Dimensions.get("window");

interface TimerBoxProps {
  value: string;
  label: string;
  color: string;
}

interface DetailRowProps {
  title: string;
  value: string;
}

interface ActionButtonProps {
  label: string;
  backgroundColor: string;
  onPress: () => void;
}

const TimerBox = ({ value, label, color }: TimerBoxProps) => (
  <View style={[styles.timerBox, { backgroundColor: color }]}>
    <Text style={styles.timerValue}>{value}</Text>
    <Text style={styles.timerLabel}>{label}</Text>
  </View>
);

const DetailRow = ({ title, value }: DetailRowProps) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailTitle}>{title}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const ActionButton = ({
  label,
  backgroundColor,
  onPress,
}: ActionButtonProps) => (
  <TouchableOpacity
    style={[styles.actionButton, { backgroundColor }]}
    onPress={onPress}
  >
    <Text style={styles.actionButtonText}>{label}</Text>
  </TouchableOpacity>
);

const DottedLine = () => {
  return (
    <View style={styles.dottedLine}>
      {[...Array(50)].map((_, i) => (
        <View key={i} style={styles.dot} />
      ))}
    </View>
  );
};

const BookingScreen = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  const [showExtendModal, setShowExtendModal] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  const handleExtendTime = () => {
    setShowExtendModal(true);
  };

  const handleEndParking = () => {
    router.push("/(tabs)/RemainingTime");
  };

  const handleFindVehicle = () => {
    router.push("/(tabs)/Navigation");
  };

  const handleConfirmExtension = () => {
    setShowExtendModal(false);
    // Handle extension confirmation
    router.push("/(tabs)/TransactionDetails");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Icon name="arrow-back" size={24} color="#673AB7" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Parking Session</Text>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.push("/(tabs)/Home")}
        >
          <Icon name="home" size={24} color="#673AB7" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.timerContainer}>
          <TimerBox value="2" label="Days" color="#611DEC" />
          <TimerBox value="14" label="Hours" color="#EB1D67" />
          <TimerBox value="59" label="Minutes" color="#EB8B1D" />
        </View>

        <View style={styles.card}>
          <View style={styles.parkingHeader}>
            <View style={styles.spotBadge}>
              <Text style={styles.spotText}>A-10</Text>
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.locationTitle}>A Cinema Parking</Text>
              <Text style={styles.locationSubtitle}>2nd Floor / A Sector</Text>
            </View>
          </View>

          <DottedLine />

          <View style={styles.section}>
            <DetailRow title="Booking Date" value="Sep 23, 2024" />
            <DetailRow title="No. of Parking" value="#310" />
          </View>

          <DottedLine />

          <View style={styles.section}>
            <DetailRow title="Arrive After" value="22 Apr, Mon" />
            <DetailRow title="Exit Before" value="24 Apr, Mon" />
            <DetailRow title="Duration" value="2 days, 2 Hours" />
          </View>

          <DottedLine />

          <TouchableOpacity
            style={styles.findVehicleButton}
            onPress={handleFindVehicle}
          >
            <Icon name="location-on" size={24} color="white" />
            <Text style={styles.findVehicleText}>Find My Vehicle</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.extendButton}
            onPress={handleExtendTime}
          >
            <Text style={styles.buttonText}>Extend Time</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.endButton} onPress={handleEndParking}>
            <Text style={styles.buttonText}>End Parking</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNavigation selectedTab={1} />

      <ExtendTimeModal
        visible={showExtendModal}
        onClose={() => setShowExtendModal(false)}
        onConfirm={handleConfirmExtension}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5FF",
    paddingTop: 30,
  },
  scrollContent: {
    padding: width * 0.04,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FAF6FF",
  },
  headerButton: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    marginVertical: 16,
    color: "#000",
  },
  timerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  timerBox: {
    width: width * 0.28,
    height: width * 0.27,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  timerValue: {
    color: "white",
    fontSize: 28,
    fontFamily: "Poppins-SemiBold",
  },
  timerLabel: {
    color: "white",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    opacity: 0.8,
    marginTop: 1,
  },
  card: {
    backgroundColor: "white",
    borderRadius: width * 0.025,
    padding: width * 0.05,
    marginVertical: 6,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  parkingHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  spotBadge: {
    backgroundColor: "#FF4444",
    padding: width * 0.06,
    borderRadius: width * 0.015,
  },
  spotText: {
    color: "white",
    fontWeight: "bold",
    fontSize: width * 0.04,
  },
  locationInfo: {
    marginLeft: width * 0.03,
  },
  locationTitle: {
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "Poppins-Medium ",
  },
  locationSubtitle: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    marginTop: 2,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
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
  findVehicleButton: {
    backgroundColor: "#673AB7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: height * 0.017,
    borderRadius: 50,
    marginTop: height * 0.017,
  },
  findVehicleText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    marginLeft: 8,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.02,
    gap: width * 0.04,
  },
  extendButton: {
    flex: 1,
    padding: height * 0.015,
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: "#32AF36",
  },
  endButton: {
    flex: 1,
    padding: height * 0.015,
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: "#EE4244",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  section: {
    paddingVertical: 4,
  },
  dottedLine: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginVertical: 6,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E0E0E0",
  },
  parkingSpotHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  spotNumber: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  parkingInfo: {
    marginLeft: width * 0.03,
  },
  parkingTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#000",
  },
  parkingSubtitle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#666",
  },
});

export default BookingScreen;
