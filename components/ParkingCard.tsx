import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import {
  scaleWidth,
  scaleHeight,
  fontScale,
  commonStyles,
} from "../utils/responsive";

const { width } = Dimensions.get("window"); // Get the width of the window

interface ParkingCardWidgetProps {
  imagePath: any;
  title: string;
  address?: string;
  distance: string;
  price: string;
  onPress: () => void;
}

const ParkingCardWidget: React.FC<ParkingCardWidgetProps> = ({
  imagePath,
  title,
  address,
  distance,
  price,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Image
          source={imagePath}
          style={styles.parkingImage}
          resizeMode="cover"
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          {address && (
            <Text style={styles.address} numberOfLines={2}>
              {address}
            </Text>
          )}
          <View style={styles.priceDistanceContainer}>
            <View style={styles.distanceContainer}>
              <Image
                source={require("../assets/images/1.png")}
                style={styles.icon}
                tintColor="#ffff"
              />
              <Text style={styles.distance}>{distance}</Text>
            </View>
            <View style={styles.distanceContainer}>
              <Image
                source={require("../assets/images/Union.png")}
                style={styles.icon}
                tintColor="#ffff"
              />
              <Text style={styles.price}>{price}</Text>
            </View>
          </View>
        </View>

        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={styles.arrowButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={onPress}
          >
            <Image
              source={require("../assets/images/Arrow 1.png")}
              style={styles.arrowIcon}
              tintColor="#ffff"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ParkingCardScreen: React.FC = () => {
  const [parkingData, setParkingData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParkingData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://list-parking-plot.vercel.app/parking-plots/?lat=31.485506&lon=74.342606"
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorText}`
          );
        }
        const data = await response.json();

        setParkingData(
          data.map((parking) => ({
            ...parking,
            imagePath: parking.pic
              ? { uri: parking.pic }
              : require("../assets/images/placeholder.png"), // Placeholder image
            name: parking.name ?? "",
            address: parking.address ?? "",
            distance: parking.distance?.toString() ?? "",
            price: parking.price?.toString() ?? "",
          }))
        );
      } catch (err) {
        console.error("Error fetching parking data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParkingData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Parking Spots...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View>
      {parkingData.length > 0 ? (
        parkingData.map((parking) => (
          <ParkingCardWidget
            key={parking._id}
            imagePath={parking.imagePath} // Pass the imagePath prop
            title={parking.name}
            address={parking.address}
            distance={`${parking.distance}km`}
            price={`${parking.price}€`}
            onPress={() =>
              router.push(`/(tabs)/ParkingScreen?id=${parking._id}`)
            }
          />
        ))
      ) : (
        <Text style={styles.noDataText}>No parking data available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: scaleHeight(10),
    marginHorizontal: scaleWidth(5),
    backgroundColor: "white",
    borderRadius: scaleWidth(8),
    ...commonStyles.shadow,
  },
  content: {
    flexDirection: "row",
    padding: scaleWidth(10),
  },
  parkingImage: {
    width: scaleWidth(110),
    height: scaleHeight(120),
    borderRadius: scaleWidth(8),
  },
  detailsContainer: {
    flex: 1,
    marginLeft: scaleWidth(10),
    padding: scaleWidth(10),
    justifyContent: "flex-start",
  },
  title: {
    fontSize: fontScale(16),
    fontWeight: "bold",
    color: "#333",
  },
  address: {
    fontSize: fontScale(14),
    color: "#9E9E9E",
    marginTop: scaleHeight(6),
  },
  priceDistanceContainer: {
    paddingTop: scaleHeight(20),
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleHeight(8),
  },
  distance: {
    fontSize: fontScale(13),
    fontWeight: "bold",
    color: "#ffffff",
  },
  price: {
    fontSize: fontScale(13),
    fontWeight: "bold",
    color: "#ffffff",
  },
  distanceContainer: {
    backgroundColor: "#FB6F50",
    height: scaleHeight(40),
    width: scaleWidth(80),
    padding: scaleWidth(5),
    justifyContent: "center",
    marginRight: scaleWidth(5),
    borderRadius: scaleWidth(5),
    flexDirection: "row",
    alignItems: "center",
  },
  rightContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  arrowButton: {
    height: scaleWidth(40),
    width: scaleWidth(40),
    backgroundColor: "#E5A8D4",
    borderRadius: scaleWidth(20),
    justifyContent: "center",
    alignItems: "center",
  },
  arrowIcon: {
    height: scaleHeight(15),
    width: scaleWidth(15),
  },
  noDataText: {
    textAlign: "center",
    marginTop: scaleHeight(20),
    fontSize: fontScale(16),
    color: "#9E9E9E",
  },
  icon: {
    width: scaleWidth(16),
    height: scaleHeight(16),
    marginRight: scaleWidth(5),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: fontScale(16),
    textAlign: "center",
  },
});

export default React.memo(ParkingCardScreen);
