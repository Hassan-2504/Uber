import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

interface AppButtonProps {
  title: string;
  customIcon?: React.ReactNode;
  onPress: () => void;
  width?: string | number;
  height?: number;
  textColor?: string;
  buttonColor?: string;
  className?: string;
  textClassName?: string;
  style?: ViewStyle;
  disabled?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  customIcon,
  onPress,
  width,
  height = 55, // Default height
  textColor = "white", // Default text color
  buttonColor = "#60A5FA", // Default button color
  className = "",
  textClassName = "",
  style,
  disabled = false, // Add default value
}) => {
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress} // Prevent onPress if disabled
      style={[
        {
          width: width || "auto",
          height,
          backgroundColor: disabled ? "#D3D3D3" : buttonColor, // Change color if disabled
        },
        style,
      ]}
      className={`rounded-full ${className}`}
      disabled={disabled} // Disable TouchableOpacity
    >
      <View className="flex-row items-center justify-center px-4 py-2">
        {customIcon && (
          <>
            <View className="w-6 h-6">{customIcon}</View>
            <View className="w-2" />
          </>
        )}
        <Text
          className={`font-bold text-${
            disabled ? "#A9A9A9" : textColor
          } ${textClassName}`} // Change text color if disabled
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AppButton;
