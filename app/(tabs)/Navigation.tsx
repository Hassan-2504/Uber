import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import MapView, {
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
  Region,
  MapViewProps,
} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

const { width } = Dimensions.get("window");
const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

const INITIAL_POSITION = {
  latitude: 31.5204,
  longitude: 74.3587,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const PARKING_LOCATIONS = [
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

const CAR_POSITION = {
  coordinate: {
    latitude: 31.5225,
    longitude: 74.3436,
  },
  title: "Your Car",
};

// Haversine formula to calculate distance between two coordinates
const haversine = (coord1: any, coord2: any) => {
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

const existingStyles = StyleSheet.create({
  // Define your styles here
});

const NavigationScreen = () => {
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [region, setRegion] = useState<Region>(INITIAL_POSITION);
  const [distance, setDistance] = useState<number>(0);
  const subscriptionRef = useRef<Location.LocationSubscription>();

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setLocation(location);

        // Update map view
        if (mapRef.current && location) {
          mapRef.current.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }
      } catch (error) {
        console.error("Error getting location:", error);
        Alert.alert("Error", "Unable to get your location");
      }
    })();
  }, []);

  const centerOnUser = async () => {
    if (location) {
      const userRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current?.animateToRegion(userRegion, 1000);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#673AB7" />
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/(tabs)/Home")}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Map Navigation</Text>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={Platform.select({
            ios: PROVIDER_GOOGLE,
            android: PROVIDER_GOOGLE,
          })}
          style={styles.map}
          initialRegion={{
            latitude: location?.coords.latitude || 37.78825,
            longitude: location?.coords.longitude || -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          loadingEnabled={true}
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
                onReady={(result) => {
                  // Optional: Update distance with actual route distance
                  if (result.distance) {
                    setDistance(result.distance);
                  }
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

        {/* Distance Display */}
        <View style={styles.distanceContainer}>
          <Text style={styles.distanceText}>
            {distance > 1
              ? `${distance.toFixed(1)} km to car`
              : `${(distance * 1000).toFixed(0)} meters to car`}
          </Text>
        </View>
      </View>

      <View style={styles.bottomCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.parkingTitle}>A Cinema Parking</Text>
          <Text style={styles.parkingPrice}>$3.5/h</Text>
        </View>
        <Text style={styles.parkingAddress}>
          123 Main Street, Lahore Pakistan
        </Text>
        <View style={styles.imageContainer}>
          {["parking1", "parking2", "parking3"].map((image, index) => (
            <Image
              key={index}
              source={require(`../../assets/images/parking1.png`)}
              style={styles.parkingImage}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

// Add new styles
const styles = StyleSheet.create({
  ...existingStyles,
  distanceContainer: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  distanceText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#673AB7",
  },
});

export default NavigationScreen;
