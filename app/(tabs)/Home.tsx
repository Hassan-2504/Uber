import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import ParkingCategory from "../../components/ParkingCategory";
import ParkingCardWidget from "../../components/ParkingCard";
import { router } from "expo-router";
import BottomNavigation from "../../components/BottomNavigation";
import {
  scaleWidth,
  scaleHeight,
  fontScale,
  dimensions,
  commonStyles,
} from "../../utils/responsive";

// Hardcoded data for parking categories and spaces
const PARKING_CATEGORIES = [
  {
    id: "bicycle",
    title: "Bicycle",
    icon: require("../../assets/images/bicycle.png"),
  },
  {
    id: "bike",
    title: "Bike",
    icon: require("../../assets/images/bike.png"),
  },
  {
    id: "car",
    title: "Car",
    icon: require("../../assets/images/car.png"),
  },
  {
    id: "bus",
    title: "Bus",
    icon: require("../../assets/images/trailer.png"),
  },
];

const PARKING_SPACES = [
  {
    id: "1",
    imagePath: require("../../assets/images/parking1.png"),
    title: "A Cinema Parking",
    distance: "1.2 Km from you",
    price: "$3.5/h",
    category: "car",
  },
  {
    id: "2",
    imagePath: require("../../assets/images/parking2.png"),
    title: "Mall Parking",
    distance: "1.8 Km from you",
    price: "$2.5/h",
    category: "car",
  },
  {
    id: "3",
    imagePath: require("../../assets/images/parking3.png"),
    title: "Airport Parking",
    distance: "2.5 Km from you",
    price: "$4.0/h",
    category: "bus",
  },
];

interface RootState {
  navigation: {
    index: number;
  };
}

const HomeScreen = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  const navigation = useNavigation();
  const selectedIndex = useSelector(
    (state: RootState) => state.navigation.index
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
  }, []);

  const handleSearchPress = () => {
    router.push("/(tabs)/Search");
  };

  const filteredParkingSpaces = PARKING_SPACES.filter((space) => {
    const matchesCategory =
      !selectedCategory || space.category === selectedCategory;
    const matchesSearch = space.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#CA81FC", "#E8A", "#FFAE9B"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/Profile")}
            style={styles.buttonbg}
          >
            <Image
              source={require("../../assets/images/homeprofile.png")}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Find your{"\n"}Parking Space</Text>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/Notification")}
            style={styles.buttonbg}
          >
            <Image
              source={require("../../assets/icons/notification.png")}
              style={styles.notificationIcon}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <TouchableOpacity
            onPress={handleSearchPress}
            style={styles.searchBar}
          >
            <Icon
              name="search"
              size={scaleWidth(24)}
              color="#666"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Space"
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
              editable={false}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {PARKING_CATEGORIES.map((category) => (
            <ParkingCategory
              key={category.id}
              title={category.title}
              icon={category.icon}
              isSelected={selectedCategory === category.id}
              onPress={() => handleCategorySelect(category.id)}
            />
          ))}
        </ScrollView>
        <View style={styles.parkingSpacesContainer}>
          <View style={styles.sectionTitleWrapper}>
            <Text style={styles.sectionTitle}>
              {selectedCategory
                ? `${selectedCategory.toUpperCase()} Parking Spaces`
                : "Nearby Parking Spaces"}
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredParkingSpaces.map((space) => (
              <ParkingCardWidget
                key={space.id}
                imagePath={space.imagePath}
                title={space.title}
                distance={space.distance}
                price={space.price}
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/ParkingScreen",
                    params: { spaceId: space.id },
                  })
                }
              />
            ))}
          </ScrollView>
        </View>
      </View>
      <BottomNavigation selectedTab={0} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF6FF",
  },
  gradientBackground: {
    height: dimensions.height * 0.36,
    paddingHorizontal: scaleWidth(16),
    paddingTop: Platform.OS === "ios" ? scaleHeight(50) : scaleHeight(30),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scaleHeight(20),
  },
  buttonbg: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: scaleWidth(8),
    borderRadius: scaleWidth(12),
  },
  profileImage: {
    width: scaleWidth(40),
    height: scaleWidth(40),
  },
  notificationIcon: {
    width: scaleWidth(24),
    height: scaleWidth(24),
  },
  headerTitle: {
    fontSize: fontScale(24),
    color: "#FFFFFF",
    fontFamily: "Poppins-SemiBold",
    textAlign: "left",
    maxWidth: dimensions.width * 0.6,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#FAF6FF",
    borderTopLeftRadius: scaleWidth(40),
    borderTopRightRadius: scaleWidth(40),
    marginTop: -scaleHeight(100),
    padding: scaleWidth(16),
  },
  searchContainer: {
    padding: scaleWidth(16),
    paddingBottom: scaleHeight(8),
    backgroundColor: "transparent",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FBF6FF",
    borderRadius: scaleWidth(35),
    paddingHorizontal: scaleWidth(16),
    height: scaleHeight(56),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchIcon: {
    marginRight: scaleWidth(10),
  },
  searchInput: {
    flex: 1,
    fontSize: fontScale(16),
    fontFamily: "Poppins-Regular",
    color: "#333",
  },
  categoriesContainer: {
    paddingHorizontal: scaleWidth(16),
    paddingTop: scaleHeight(20),
  },
  parkingSpacesContainer: {
    flex: 1,
    paddingHorizontal: scaleWidth(16),
    marginTop: scaleHeight(-320),
    marginBottom: scaleHeight(80),
  },
  sectionTitleWrapper: {
    marginHorizontal: scaleWidth(10),
    marginBottom: scaleHeight(10),
  },
  sectionTitle: {
    fontSize: fontScale(18),
    fontFamily: "Poppins-SemiBold",
    color: "#E8A3BD",
  },
});

export default HomeScreen;
