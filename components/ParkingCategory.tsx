import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import {
  scaleWidth,
  scaleHeight,
  fontScale,
  commonStyles,
} from "../utils/responsive";

interface ParkingCategoryProps {
  title: string;
  icon: ImageSourcePropType;
  isSelected?: boolean;
  onPress: () => void;
}

const ParkingCategory: React.FC<ParkingCategoryProps> = ({
  title,
  icon,
  isSelected = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onPress}
    >
      <View style={styles.innerContainer}>
        <Image
          source={icon}
          style={[
            styles.icon,
            isSelected ? styles.selectedIcon : styles.unselectedIcon,
          ]}
          resizeMode="contain"
        />
        <Text
          style={[
            styles.title,
            isSelected ? styles.selectedTitle : styles.unselectedTitle,
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaleHeight(50),
    marginRight: scaleWidth(18),
    width: scaleWidth(120),
    backgroundColor: "white",
    borderRadius: scaleWidth(6),
    ...commonStyles.shadow,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedContainer: {
    backgroundColor: "#E8A3BD",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: scaleWidth(30),
    height: scaleHeight(30),
    marginRight: scaleWidth(8),
  },
  selectedIcon: {
    tintColor: "white",
  },
  unselectedIcon: {
    tintColor: "#E8A3BD",
  },
  title: {
    fontSize: fontScale(14),
    fontWeight: "500",
    maxWidth: "90%",
  },
  selectedTitle: {
    color: "white",
  },
  unselectedTitle: {
    color: "#E8A3BD",
  },
});

export default React.memo(ParkingCategory);
