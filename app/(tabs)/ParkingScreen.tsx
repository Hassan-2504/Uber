import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
  Alert, // Import Alert
  ActivityIndicator, // Import ActivityIndicator
  Platform,
} from "react-native";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import * as Location from "expo-location";
import AppButton from "../../components/Button";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons
import MapViewDirections from "react-native-maps-directions"; // Import MapViewDirections

const { width } = Dimensions.get("window");
const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY; // Make sure you have this in your .env

// ADDED INITIAL_POSITION DEFINITION HERE
const INITIAL_POSITION = {
  latitude: 31.5204,
  longitude: 74.3587,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const CAR_POSITION = {
  coordinate: {
    latitude: 31.5225, // Example Latitude - Replace with your car's actual latitude
    longitude: 74.3436, // Example Longitude - Replace with your car's actual longitude
  },
  title: "Your Car",
};

const PARKING_LOCATIONS = [
  // Keeping Parking Locations from NavigationScreen for Markers
  {
    id: "1",
    coordinate: {
      latitude: 31.5204,
      longitude: 74.3587,
    },
    title: "Liberty Parking",
  },
  {
    id: "2",
    coordinate: {
      latitude: 31.5225,
      longitude: 74.3436,
    },
    title: "Gulberg Parking",
  },
  {
    id: "3",
    coordinate: {
      latitude: 31.5161,
      longitude: 74.3289,
    },
    title: "Mall Road Parking",
  },
];

const haversine = (coord1, coord2) => {
  const R = 6371; // Earth radius in km
  const dLat = (coord2.latitude - coord1.latitude) * (Math.PI / 180);
  const dLon = (coord2.longitude - coord1.longitude) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coord1.latitude * (Math.PI / 180)) *
      Math.cos(coord2.latitude * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const ParkingScreen = () => {
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [distance, setDistance] = useState(0);
  const [region, setRegion] = useState<Region | null>(null);
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        setIsLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          Alert.alert(
            // Using Alert for permission denial message
            "Location Permission Required",
            "Please enable location services to use the navigation feature.",
            [{ text: "OK" }]
          );
          return;
        }

        // Start watching position updates
        subscriptionRef.current = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 5,
          },
          (newLocation) => {
            setLocation(newLocation);
            const newRegion = {
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            };
            setRegion(newRegion);

            // Calculate distance
            if (CAR_POSITION.coordinate) {
              const calculatedDistance = haversine(
                newLocation.coords,
                CAR_POSITION.coordinate
              );
              setDistance(calculatedDistance);
            }
          }
        );
      } catch (error) {
        console.error("Error getting location:", error);
        setErrorMsg("Error getting location");
      } finally {
        setIsLoading(false);
      }
    };

    requestLocationPermission();

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
      }
    };
  }, []);

  const parkingImages = [
    require("../../assets/images/parking1.png"),
    require("../../assets/images/parking2.png"),
    require("../../assets/images/parking3.png"),
    require("../../assets/images/parking3.png"),
  ];

  const handleGetParkingSpot = () => {
    router.push("/Details");
    // Implement booking logic here
  };

  const handleCallParking = () => {
    const phoneNumber = "+92 300 1234567";
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const centerOnUser = async () => {
    if (location && mapRef.current) {
      const userRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current.animateToRegion(userRegion, 1000);
    }
  };

  if (isLoading) {
    // Loading indicator from NavigationScreen
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#673AB7" />
      </View>
    );
  }

  if (errorMsg) {
    // Error message display from NavigationScreen
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Image
          source={require("../../assets/icons/arrowicon.png")} // Replace with your back icon path
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <View style={styles.mapContainer}>
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
          {PARKING_LOCATIONS.map((parking) => (
            <Marker
              key={parking.id}
              coordinate={parking.coordinate}
              title={parking.title}
            >
              <View style={styles.markerContainer}>
                <Image
                  source={require("../../assets/images/Path.png")}
                  style={styles.parkingMarker}
                />
              </View>
            </Marker>
          ))}

          {location && (
            <>
              <Marker coordinate={CAR_POSITION.coordinate} title="Your Car">
                <Image
                  source={require("../../assets/images/car.png")}
                  style={styles.carMarker}
                />
              </Marker>

              <MapViewDirections
                origin={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                destination={CAR_POSITION.coordinate}
                apikey={GOOGLE_MAPS_API_KEY!}
                strokeWidth={4}
                strokeColor="#673AB7"
                mode="DRIVING"
                precision="high"
                timePrecision="now"
                onReady={(result) => {
                  if (result.distance) {
                    setDistance(result.distance);
                  }
                }}
                onError={(error) => {
                  console.error("Directions Error:", error);
                }}
              />
            </>
          )}
        </MapView>

        <TouchableOpacity
          style={styles.myLocationButton}
          onPress={centerOnUser}
        >
          <Ionicons name="locate" size={24} color="#673AB7" />
        </TouchableOpacity>

        {/* Distance Display - Adapted to fit in ParkingScreen UI */}
        <View style={styles.distanceContainerParking}>
          <Text style={styles.distanceTextParking}>
            {distance > 1
              ? `${distance.toFixed(1)} km to car`
              : `${(distance * 1000).toFixed(0)} meters to car`}
          </Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerSection}>
          <Text style={styles.driveText}>Drive</Text>
          <View style={styles.line} />
          <Text style={styles.parkingTitle}>Cinema Parking</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Image
                source={require("../../assets/images/1.png")}
                style={styles.icon}
              />
              <Text style={styles.detailText}>{distance.toFixed(2)} Km</Text>
            </View>
            <View style={styles.detailItem}>
              <Image
                source={require("../../assets/icons/clockicon.png")}
                style={styles.icon}
              />
              <Text style={styles.detailText}>18 Minutes</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Image
                source={require("../../assets/images/1.png")}
                style={styles.icon}
              />
              <Text style={styles.detailText}>04 Spots Available</Text>
            </View>
            <TouchableOpacity
              style={styles.detailItem}
              onPress={handleCallParking}
            >
              <Image
                source={require("../../assets/images/phone_icon.png")}
                style={styles.icon}
              />
              <Text style={[styles.detailText, styles.phoneNumber]}>
                +92 300 1234567
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageCarousel}
        >
          {parkingImages.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={styles.parkingImage}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        <AppButton
          title="Get Parking Spot"
          onPress={handleGetParkingSpot}
          buttonColor={"#FFAE9B"}
          textColor={"#FFFFFF"}
          textClassName="text-[#ffffff] text-xl font-semibold"
          className="w-full bg-[#A9A9A9] py-4 rounded-full mb-4 mt-8 flex-row items-center justify-center"
          width="100%"
          style={styles.getParkingButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  mapContainer: {
    height: "45%", // Same map height as before
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  headerSection: {
    marginBottom: 20,
  },
  driveText: {
    padding: 5,
    marginTop: 4,
    color: "#7D5EB5",
    fontSize: 24,
    fontWeight: "bold",
  },
  parkingTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 4,
  },
  detailsContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#666666",
  },
  phoneNumber: {
    color: "#7D5EB5",
    fontWeight: "600",
  },
  imageCarousel: {
    marginBottom: 20,
  },
  parkingImage: {
    width: width * 0.25,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
  },
  getParkingButton: {
    marginBottom: 20,
  },
  loadingContainer: {
    // Loading container style from NavigationScreen
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    // Error container style from NavigationScreen
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    // Error text style from NavigationScreen
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  myLocationButton: {
    // My Location button style from NavigationScreen
    position: "absolute",
    bottom: 40,
    right: 20,
    backgroundColor: "white",
    borderRadius: 25,
    padding: 10,
    elevation: 3,
  },
  distanceContainerParking: {
    // Distance container style - adjusted position to be inside ParkingScreen map
    position: "absolute",
    top: 16, // Adjusted top position to be visible
    left: 16, // Adjusted left position
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  distanceTextParking: {
    // Distance text style - ParkingScreen specific style
    fontSize: 16,
    fontWeight: "600",
    color: "#673AB7",
  },
  markerContainer: {
    // Marker container style from NavigationScreen
    alignItems: "center",
    justifyContent: "center",
  },
  parkingMarker: {
    // Parking marker style from NavigationScreen
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  carMarker: {
    // Car marker style from NavigationScreen
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  line: {
    width: "100%",
    opacity: 0.2,
    height: 1,
    backgroundColor: "gray",
    marginVertical: 5,
  },
});

export default ParkingScreen;
