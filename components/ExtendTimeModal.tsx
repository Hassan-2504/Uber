import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/MaterialIcons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

interface ExtendTimeModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DottedLine = () => {
  return (
    <View style={styles.dottedLine}>
      {[...Array(50)].map((_, i) => (
        <View key={i} style={styles.dot} />
      ))}
    </View>
  );
};

const ExtendTimeModal = ({
  visible,
  onClose,
  onConfirm,
}: ExtendTimeModalProps) => {
  const [selectedUnit, setSelectedUnit] = useState("Hours");
  const [sliderValue, setSliderValue] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const timeUnits = ["Days", "Minutes", "Hours"];

  const getSliderConfig = () => {
    switch (selectedUnit) {
      case "Minutes":
        return { min: 15, max: 45, step: 15 };
      case "Hours":
        return { min: 1, max: 9, step: 1 };
      case "Days":
        return { min: 1, max: 7, step: 1 };
      default:
        return { min: 1, max: 9, step: 1 };
    }
  };

  const formatValue = () => {
    return `${Math.floor(sliderValue)} ${selectedUnit}`;
  };

  const handleConfirm = async () => {
    try {
      // Navigate first
      router.push("/(tabs)/TransactionDetails");
      // Then close modal and cleanup
      onConfirm();
      onClose();
    } catch (error) {
      console.error("Navigation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="#666" />
          </TouchableOpacity>

          <View style={styles.content}>
            <View style={styles.iconOuterContainer}>
              <View style={styles.iconContainer}>
                <Icon name="access-time" size={40} color="white" />
              </View>
            </View>

            <Text style={styles.title}>Extend Parking Time</Text>
            <Text style={styles.subtitle}>
              Select the additional time you need
            </Text>

            <View style={styles.segmentContainer}>
              {timeUnits.map((unit) => (
                <TouchableOpacity
                  key={unit}
                  style={[
                    styles.segmentButton,
                    selectedUnit === unit && styles.selectedSegment,
                  ]}
                  onPress={() => setSelectedUnit(unit)}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      selectedUnit === unit && styles.selectedSegmentText,
                    ]}
                  >
                    {unit}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={getSliderConfig().min}
                maximumValue={getSliderConfig().max}
                step={getSliderConfig().step}
                value={sliderValue}
                onValueChange={setSliderValue}
                minimumTrackTintColor="#673AB7"
                maximumTrackTintColor="#E0E0E0"
                thumbTintColor="#673AB7"
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>{`${
                  getSliderConfig().min
                } ${selectedUnit}`}</Text>
                <Text style={styles.sliderLabel}>
                  {`${
                    (getSliderConfig().max + getSliderConfig().min) / 2
                  } ${selectedUnit}`}
                </Text>
                <Text style={styles.sliderLabel}>{`${
                  getSliderConfig().max
                } ${selectedUnit}`}</Text>
              </View>
            </View>

            <View style={styles.detailsContainer}>
              <DetailRow title="Extended Time" value={formatValue()} />
              <DetailRow title="Exit Before" value="02:00 PM" />
              <DetailRow title="Duration" value={formatValue()} />
            </View>

            <DottedLine />

            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalAmount}>$7.00</Text>
            </View>

            <TouchableOpacity
              style={[styles.confirmButton, isLoading && styles.disabledButton]}
              onPress={handleConfirm}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.confirmButtonText}>Confirm Extension</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const DetailRow = ({ title, value }: { title: string; value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailTitle}>{title}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.9,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  content: {
    alignItems: "center",
  },
  iconOuterContainer: {
    position: "relative",
    height: 25,
    marginBottom: 20,
  },
  iconContainer: {
    position: "absolute",
    top: -55,
    marginLeft: -30,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FE8A71",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#666",
    marginBottom: 20,
  },
  segmentContainer: {
    flexDirection: "row",
    backgroundColor: "#F75D3A",
    borderRadius: 26,
    padding: 8,
    marginBottom: 20,
  },
  segmentButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  selectedSegment: {
    backgroundColor: "white",
  },
  segmentText: {
    color: "white",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  selectedSegmentText: {
    color: "#F75D3A",
  },
  sliderContainer: {
    width: "100%",
    marginBottom: 20,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  sliderLabel: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#000",
  },
  detailsContainer: {
    width: "100%",
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderStyle: "dotted",
    borderColor: "#E0E0E0",
  },
  detailTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: "#666",
  },
  detailValue: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#000",
  },
  totalContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  totalText: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
  },
  totalAmount: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#000",
  },
  confirmButton: {
    width: "100%",
    backgroundColor: "#673AB7",
    padding: 16,
    borderRadius: 50,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 17,
    fontFamily: "Poppins-SemiBold",
  },
  closeButton: {
    position: "absolute",
    right: 15,
    top: 15,
    zIndex: 1,
    padding: 5,
  },
  dottedLine: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginVertical: 15,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E0E0E0",
  },
  disabledButton: {
    opacity: 0.7,
  },
});

export default ExtendTimeModal;
