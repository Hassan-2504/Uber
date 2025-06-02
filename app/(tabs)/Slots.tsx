import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import AppButton from "../../components/Button";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

const Slots = () => {
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null); // State to track selected spot

  // Updated parking spots data with floor information - 40 spots total (10 per floor)
  const parkingSpotsData = [
    { id: 1, floor: "Basement", available: true },
    { id: 2, floor: "Basement", available: true },
    { id: 3, floor: "Basement", available: true },
    { id: 4, floor: "Basement", available: false },
    { id: 5, floor: "Basement", available: true },
    { id: 6, floor: "Basement", available: true },
    { id: 7, floor: "Basement", available: false },
    { id: 8, floor: "Basement", available: true },
    { id: 9, floor: "Basement", available: true },
    { id: 10, floor: "Basement", available: true },
    { id: 11, floor: "Ground Floor", available: true },
    { id: 12, floor: "Ground Floor", available: false },
    { id: 13, floor: "Ground Floor", available: true },
    { id: 14, floor: "Ground Floor", available: true },
    { id: 15, floor: "Ground Floor", available: true },
    { id: 16, floor: "Ground Floor", available: true },
    { id: 17, floor: "Ground Floor", available: true },
    { id: 18, floor: "Ground Floor", available: false },
    { id: 19, floor: "Ground Floor", available: true },
    { id: 20, floor: "Ground Floor", available: true },
    { id: 21, floor: "1st Floor", available: true },
    { id: 22, floor: "1st Floor", available: false },
    { id: 23, floor: "1st Floor", available: true },
    { id: 24, floor: "1st Floor", available: true },
    { id: 25, floor: "1st Floor", available: true },
    { id: 26, floor: "1st Floor", available: true },
    { id: 27, floor: "1st Floor", available: true },
    { id: 28, floor: "1st Floor", available: false },
    { id: 29, floor: "1st Floor", available: true },
    { id: 30, floor: "1st Floor", available: true },
    { id: 31, floor: "2nd", available: true },
    { id: 32, floor: "2nd", available: true },
    { id: 33, floor: "2nd", available: false },
    { id: 34, floor: "2nd", available: true },
    { id: 35, floor: "2nd", available: true },
    { id: 36, floor: "2nd", available: true },
    { id: 37, floor: "2nd", available: true },
    { id: 38, floor: "2nd", available: false },
    { id: 39, floor: "2nd", available: true },
    { id: 40, floor: "2nd", available: true },
  ];

  const handleFloorSelect = (floor) => {
    setSelectedFloor(floor);
    setSelectedSpot(null); // Clear selected spot when floor changes
  };

  const handleSpotSelect = (spotId) => {
    setSelectedSpot(spotId);
  };

  const getSpotsForSelectedFloor = () => {
    if (!selectedFloor) return [];
    return parkingSpotsData.filter((spot) => spot.floor === selectedFloor);
  };

  const spotsToShow = getSpotsForSelectedFloor();

  return (
    <View style={styles.container}>
      {/* Map Section */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825, // Example Latitude, replace with actual coordinates
          longitude: -122.4324, // Example Longitude, replace with actual coordinates
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      <ScrollView style={styles.contentContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cinema Parking</Text>
          <View style={styles.headerLine} />
          <Text style={styles.headerSubtitle}>
            Select Available Parking Spot
          </Text>
        </View>

        {/* Parking Floors Selection */}
        <ScrollView
          horizontal={true} // Enable horizontal scrolling
          style={styles.floorSelectionScroll} // Apply scrollview style
          contentContainerStyle={styles.floorSelection} // Apply content container style
          showsHorizontalScrollIndicator={false} // Hide scroll indicator if desired
        >
          {["Basement", "Ground Floor", "1st Floor", "2nd"].map((floor) => (
            <TouchableOpacity
              key={floor}
              style={[
                styles.floorButton,
                selectedFloor === floor && styles.floorButtonSelected,
              ]}
              onPress={() => handleFloorSelect(floor)}
            >
              <Text
                style={[
                  styles.floorButtonText,
                  selectedFloor === floor && styles.floorButtonTextSelected,
                ]}
              >
                {floor}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Parking Block - Conditionally render if a floor is selected */}
        {selectedFloor && (
          <View style={styles.parkingBlock}>
            <Text style={styles.blockTitle}>A - Block</Text>
            <View style={styles.spotGrid}>
              {spotsToShow.slice(0, 5).map(
                (
                  spot,
                  index // Display first 5 spots for selected floor
                ) => (
                  <View
                    key={`${selectedFloor}-row1-${index}`}
                    style={styles.spotContainer}
                  >
                    <TouchableOpacity
                      style={[styles.carContainer, styles.carBorder]}
                      onPress={() => handleSpotSelect(spot.id)}
                    >
                      <Text style={styles.spotNumber}>
                        {String(spot.id).padStart(2, "0")}
                      </Text>
                      <Ionicons
                        name="car"
                        size={30}
                        color={spot.available ? "#4CAF50" : "#F44336"}
                      />
                      <Text style={styles.statusText}>
                        {spot.available ? "Available" : "Reserved"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
              )}
            </View>
            <View style={styles.spotGrid}>
              {spotsToShow.slice(5, 10).map(
                (
                  spot,
                  index // Display next 5 spots for selected floor
                ) => (
                  <View
                    key={`${selectedFloor}-row2-${index}`}
                    style={styles.spotContainer}
                  >
                    <TouchableOpacity
                      style={[styles.carContainer, styles.carBorder]}
                      onPress={() => handleSpotSelect(spot.id)}
                    >
                      <Text style={styles.spotNumber}>
                        {String(spot.id).padStart(2, "0")}
                      </Text>
                      <Ionicons
                        name="car"
                        size={30}
                        color={spot.available ? "#4CAF50" : "#F44336"}
                      />
                      <Text style={styles.statusText}>
                        {spot.available ? "Available" : "Reserved"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
              )}
            </View>
          </View>
        )}

        {/* Next Button */}
        <AppButton
          title="Next"
          buttonColor="#834DBF"
          textColor="#FFFFFF"
          width="100%"
          className="w-full bg-[#834DBF] py-4 rounded-full mb-4 flex-row items-center justify-center"
          textClassName="text-white text-xl font-semibold"
          customIcon={null}
          onPress={() => {
            if (selectedSpot) {
              router.push("/BookParkingScreen");
              alert(
                `Next button pressed, Selected Spot ID: ${selectedSpot}, Floor: ${selectedFloor}`
              );
              // Navigation or action to proceed after spot selection
            } else {
              alert("Please select a parking spot.");
            }
          }}
          disabled={!selectedSpot} // Disable if no spot is selected
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: height * 0.4, // Adjusted map height to 35%
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#f2f2f2", // Light Grey Background
    paddingHorizontal: 20, // Horizontal Padding
    paddingTop: 30, // Top Padding inside content area
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: -30, // Overlap the map slightly
  },
  header: {
    alignItems: "flex-start", // Align header content to start
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 26, // Larger Header Title
    fontWeight: "bold",
    color: "#834DBF", // Darker Header Text
  },
  headerSubtitle: {
    fontSize: 18, // Style for subtitle under header
    color: "#777",
    marginTop: 5,
  },
  headerLine: {
    width: "100%",
    height: 1, // Thinner line
    backgroundColor: "#ddd", // Very light grey line
    marginVertical: 10,
  },
  floorSelectionScroll: {
    marginBottom: 20,
  },
  floorSelection: {
    flexDirection: "row",
    paddingRight: 20,
  },
  floorButton: {
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  floorButtonText: {
    fontSize: 16,
    color: "#834DBF",
  },
  floorButtonSelected: {
    backgroundColor: "#834DBF",
  },
  floorButtonTextSelected: {
    color: "#fff",
  },
  parkingBlock: {
    marginBottom: 30,
  },
  blockTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#834DBF",
    marginBottom: 10,
  },
  spotGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  spotContainer: {
    width: "18%",
    alignItems: "center",
  },
  carContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF", // White car container
    borderRadius: 10,
    paddingVertical: 10, // Vertical padding adjusted
    paddingHorizontal: 15, // Horizontal padding adjusted
    borderWidth: 1,
    borderColor: "#ddd",
  },
  carBorder: {
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  spotNumber: {
    fontSize: 14, // Adjusted Spot Number size
    fontWeight: "bold",
    fontFamily: "Poppins-Regular",
    color: "#444",
    marginBottom: 7,
  },
  statusText: {
    fontSize: 7,
    flexDirection: "row", // Changed from direction to flexDirection for proper layout
    fontWeight: "bold",
    fontFamily: "Poppins-Regular",
    color: "#777",
  },
  nextButton: {
    backgroundColor: "#834DBF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
  },
  nextButtonDisabled: {
    backgroundColor: "#E0E0E0",
  },
  nextButtonTextDisabled: {
    color: "#777",
  },
});

export default Slots;
