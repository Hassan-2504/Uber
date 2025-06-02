import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import MapView, {
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Region,
  Marker,
} from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons
import { router } from "expo-router"; // Import router for navigation
import AppButton from "../../components/Button"; // Assuming you have a custom AppButton component

const { width, height } = Dimensions.get("window");
const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

const INITIAL_POSITION = {
  latitude: 31.5204,
  longitude: 74.3587,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

const ParkingDetailsScreen = () => {
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState<Region>(INITIAL_POSITION);
  const [location, setLocation] = useState(null);

  const [startDateModalVisible, setStartDateModalVisible] = useState(false);
  const [endDateModalVisible, setEndDateModalVisible] = useState(false);
  const [startTimeModalVisible, setStartTimeModalVisible] = useState(false);
  const [endTimeModalVisible, setEndTimeModalVisible] = useState(false);

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());

  // Example parking spots data
  const parkingSpots = [
    {
      id: 1,
      coordinate: { latitude: 31.5204, longitude: 74.3587 },
      available: true,
    },
    {
      id: 2,
      coordinate: { latitude: 31.5205, longitude: 74.3588 },
      available: true,
    },
    {
      id: 3,
      coordinate: { latitude: 31.5206, longitude: 74.3589 },
      available: false,
    },
  ];

  useEffect(() => {
    const getLocationAsync = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Location permission not granted");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      if (currentLocation) {
        const newRegion = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        };
        setRegion(newRegion);
      }
    };

    getLocationAsync();
  }, []);

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const formatDay = (date) => {
    const options = { weekday: "long" };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const options = { hour: "numeric", minute: "2-digit", hour12: true };
    return date.toLocaleTimeString(undefined, options);
  };

  const renderDatePickerModal = (
    isVisible,
    setVisible,
    selectedDate,
    setSelectedDate
  ) => {
    const days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return date;
    });

    return (
      <Modal visible={isVisible} animationType="slide" transparent>
        <View style={pickerStyles.modalOverlay}>
          <View style={pickerStyles.modalContent}>
            <ScrollView>
              {days.map((day, index) => (
                <TouchableOpacity
                  key={index}
                  style={pickerStyles.pickerItem}
                  onPress={() => {
                    setSelectedDate(day);
                    setVisible(false);
                  }}
                >
                  <Text style={pickerStyles.pickerText}>
                    {formatDate(day)} ({formatDay(day)})
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={pickerStyles.closeButton}
              onPress={() => setVisible(false)}
            >
              <Text style={pickerStyles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const renderTimePickerModal = (
    isVisible,
    setVisible,
    selectedTime,
    setSelectedTime
  ) => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = ["00", "15", "30", "45"];

    return (
      <Modal visible={isVisible} animationType="slide" transparent>
        <View style={pickerStyles.modalOverlay}>
          <View style={pickerStyles.modalContent}>
            <ScrollView>
              {hours.map((hour) =>
                minutes.map((minute, index) => {
                  const time = new Date();
                  time.setHours(hour);
                  time.setMinutes(parseInt(minute, 10));
                  return (
                    <TouchableOpacity
                      key={`${hour}-${minute}-${index}`}
                      style={pickerStyles.pickerItem}
                      onPress={() => {
                        setSelectedTime(time);
                        setVisible(false);
                      }}
                    >
                      <Text style={pickerStyles.pickerText}>
                        {formatTime(time)}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              )}
            </ScrollView>
            <TouchableOpacity
              style={pickerStyles.closeButton}
              onPress={() => setVisible(false)}
            >
              <Text style={pickerStyles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Map Section */}
      <MapView
        ref={mapRef}
        provider={Platform.select({
          ios: PROVIDER_DEFAULT,
          android: PROVIDER_GOOGLE,
        })}
        style={styles.map}
        initialRegion={region || INITIAL_POSITION}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={true}
        loadingEnabled={true}
        loadingIndicatorColor="#673AB7"
        loadingBackgroundColor="#ffffff"
      >
        {parkingSpots.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={spot.coordinate}
            title={`Spot ${spot.id}`}
            pinColor={spot.available ? "#4CAF50" : "#F44336"} // Green for available, Red for reserved
          />
        ))}
      </MapView>

      <View style={styles.contentContainer}>
        <Text style={styles.header}>Cinema Parking</Text>
        <Text style={styles.subHeader}>Select Available Parking Spot</Text>

        {/* Car Number Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Enter Your Car Number *</Text>
          <View style={styles.inputFieldContainer}>
            <Ionicons
              name="car-sport"
              size={24}
              color="#834DBF"
              style={styles.carIcon}
            />
            <TextInput
              style={styles.inputField}
              placeholder="LHR-0000"
              placeholderTextColor="#B0B0B0"
            />
          </View>
        </View>

        {/* Date and Time Section */}
        <Text style={styles.header}>Start Date and Time</Text>
        <View style={styles.dateTimeSection}>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar" size={20} color="#834DBF" />
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setStartDateModalVisible(true)}
            >
              <Text style={styles.dateText}>
                {formatDate(selectedStartDate)}
              </Text>
              <Text style={styles.dayText}>{formatDay(selectedStartDate)}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.timeContainer}>
            <Ionicons name="time" size={20} color="#834DBF" />
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setStartTimeModalVisible(true)}
            >
              <Text style={styles.timeText}>
                {formatTime(selectedStartTime)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.header}>End Date and Time</Text>
        <View style={styles.dateTimeSection}>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar" size={20} color="#834DBF" />
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setEndDateModalVisible(true)}
            >
              <Text style={styles.dateText}>{formatDate(selectedEndDate)}</Text>
              <Text style={styles.dayText}>{formatDay(selectedEndDate)}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.timeContainer}>
            <Ionicons name="time" size={20} color="#834DBF" />
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setEndTimeModalVisible(true)}
            >
              <Text style={styles.timeText}>{formatTime(selectedEndTime)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Button */}
        <AppButton
          title="Confirm"
          onPress={() => router.push("/Slots")}
          buttonColor="#834DBF"
          textColor="#FFFFFF"
          width="100%"
          className="w-full bg-[#834DBF] py-4 rounded-full mb-4 flex-row items-center justify-center"
          textClassName="text-white text-xl font-semibold"
          customIcon={null}
        />
      </View>

      {/* Date Picker Modals */}
      {renderDatePickerModal(
        startDateModalVisible,
        setStartDateModalVisible,
        selectedStartDate,
        setSelectedStartDate
      )}
      {renderDatePickerModal(
        endDateModalVisible,
        setEndDateModalVisible,
        selectedEndDate,
        setSelectedEndDate
      )}

      {/* Time Picker Modals */}
      {renderTimePickerModal(
        startTimeModalVisible,
        setStartTimeModalVisible,
        selectedStartTime,
        setSelectedStartTime
      )}
      {renderTimePickerModal(
        endTimeModalVisible,
        setEndTimeModalVisible,
        selectedEndTime,
        setSelectedEndTime
      )}
    </View>
  );
};

// Picker Modal Styles (unchanged)
const pickerStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "60%",
  },
  pickerItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  pickerText: {
    fontSize: 18,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#673AB7",
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

// Main Styles for ParkingDetailsScreen (Updated for layout and consistency)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "20%",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FAF6FF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: -30, // Overlap the map slightly
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#834DBF",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  inputFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FBF6FF",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  carIcon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  dateTimeSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FBF6FF",
    borderRadius: 8,
    padding: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    flex: 1,
    marginRight: 10,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FBF6FF",
    borderRadius: 8,
    padding: 5,
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dateTimeButton: {
    flex: 1,
    justifyContent: "center",
    padding: 5,
  },
  dateText: {
    fontSize: 16,
    color: "#834DBF",
  },
  dayText: {
    fontSize: 12,
    color: "#834DBF",
  },
  timeText: {
    fontSize: 16,
    color: "#834DBF",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1000,
  },
});

export default ParkingDetailsScreen;
