import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import * as Location from "expo-location";
import BottomNavigation from "../../components/BottomNavigation";
import {
  scaleWidth,
  scaleHeight,
  fontScale,
  dimensions,
  commonStyles,
} from "../../utils/responsive";

const MapScreen = () => {
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [region, setRegion] = useState<Region>({
    latitude: 31.5204,
    longitude: 74.3587,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          setIsLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        console.error("Error getting location:", error);
        setErrorMsg("Failed to get location. Please try again.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const centerOnUser = () => {
    if (location) {
      mapRef.current?.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } else {
      Alert.alert(
        "Location not available",
        "Please wait for your location to be determined or check your location permissions."
      );
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#CA81FC" />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={scaleWidth(50)} color="#CA81FC" />
        <Text style={styles.errorText}>{errorMsg}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => router.replace("/(tabs)/MapScreen")}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={Platform.select({
          ios: PROVIDER_GOOGLE,
          android: PROVIDER_GOOGLE,
        })}
        style={styles.map}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={false}
      >
        {/* Example markers for parking spots */}
        <Marker
          coordinate={{
            latitude: region.latitude + 0.01,
            longitude: region.longitude + 0.01,
          }}
          title="Cinema Parking"
          description="$3.5/h"
        />
        <Marker
          coordinate={{
            latitude: region.latitude - 0.01,
            longitude: region.longitude - 0.01,
          }}
          title="Mall Parking"
          description="$2.5/h"
        />
        <Marker
          coordinate={{
            latitude: region.latitude + 0.02,
            longitude: region.longitude - 0.02,
          }}
          title="Airport Parking"
          description="$4.0/h"
        />
      </MapView>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={scaleWidth(24)} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.myLocationButton} onPress={centerOnUser}>
        <Ionicons name="locate" size={scaleWidth(24)} color="#673AB7" />
      </TouchableOpacity>

      <BottomNavigation selectedTab={1} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? scaleHeight(50) : scaleHeight(30),
    left: scaleWidth(20),
    backgroundColor: "white",
    padding: scaleWidth(8),
    borderRadius: scaleWidth(20),
    ...commonStyles.shadow,
  },
  myLocationButton: {
    position: "absolute",
    bottom: scaleHeight(100),
    right: scaleWidth(20),
    backgroundColor: "white",
    padding: scaleWidth(10),
    borderRadius: scaleWidth(25),
    ...commonStyles.shadow,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF6FF",
  },
  loadingText: {
    marginTop: scaleHeight(10),
    fontSize: fontScale(16),
    color: "#333",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF6FF",
    padding: scaleWidth(20),
  },
  errorText: {
    marginTop: scaleHeight(10),
    fontSize: fontScale(16),
    color: "#333",
    textAlign: "center",
  },
  retryButton: {
    marginTop: scaleHeight(20),
    backgroundColor: "#CA81FC",
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleHeight(10),
    borderRadius: scaleWidth(8),
  },
  retryButtonText: {
    color: "white",
    fontSize: fontScale(16),
  },
});

export default MapScreen;
