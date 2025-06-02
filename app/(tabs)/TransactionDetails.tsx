import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  TextInput,
  Modal,
  Alert,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

interface PaymentMethodProps {
  index: number;
  assetPath: any;
  isSelected: boolean;
  onSelect: (index: number) => void;
}

const PaymentMethod = ({
  index,
  assetPath,
  isSelected,
  onSelect,
}: PaymentMethodProps) => (
  <TouchableOpacity
    onPress={() => onSelect(index)}
    style={[styles.paymentMethod, isSelected && styles.selectedPaymentMethod]}
  >
    <Image source={assetPath} style={styles.paymentIcon} resizeMode="contain" />
  </TouchableOpacity>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>

    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const DottedLine = () => (
  <View style={styles.dottedLine}>
    {[...Array(30)].map((_, i) => (
      <View key={i} style={styles.dot} />
    ))}
  </View>
);

const TransactionDetails = () => {
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState<
    number | null
  >(null);
  const [isVoucherAdded, setIsVoucherAdded] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const animateBackground = (toValue: number) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#F8F6FF", "#E8F5E9"],
  });

  const handleVoucherApply = () => {
    if (voucherCode.trim() === "ok") {
      setIsVoucherAdded(true);
      animateBackground(1);
      Alert.alert("Success", "Voucher Applied Successfully!");
    } else {
      Alert.alert("Error", "Invalid Voucher Code");
    }
    setShowVoucherModal(false);
    setVoucherCode("");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/(tabs)/Booking")}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction Details</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          {/* Header Row */}
          <View style={styles.parkingHeader}>
            <View style={styles.spotBadge}>
              <Text style={styles.spotNumber}>A-10</Text>
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.locationTitle}>A Cinema Parking</Text>
              <Text style={styles.locationSubtitle}>2nd Floor / A Sector</Text>
            </View>
          </View>

          <View>
            <DottedLine />
          </View>

          {/* Booking Details */}
          <DetailRow label="Booking Date" value="Sep 23, 2024" />
          <DetailRow label="No. of Parking" value="#310" />

          <View>
            <DottedLine />
          </View>

          {/* Time Details */}
          <DetailRow label="Arrive After" value="22 Apr, Mon 10:00 AM" />
          <DetailRow label="Exit Before" value="24 Apr, Mon 12:00 AM" />
          <DetailRow label="Duration" value="2 Days, 2 Hours" />

          <View>
            <DottedLine />
          </View>
          <DetailRow label="Subtotal" value="$27.00" />

          {/* Voucher Section */}
          <TouchableOpacity onPress={() => setShowVoucherModal(true)}>
            <Animated.View
              style={[styles.voucherContainer, { backgroundColor }]}
            >
              <Icon
                name={isVoucherAdded ? "check-circle" : "card-giftcard"}
                size={24}
                color={isVoucherAdded ? "#4CAF50" : "#000"}
              />
              <Text style={styles.voucherText}>
                {isVoucherAdded ? "Voucher Applied!" : "Tap to Add Voucher"}
              </Text>
            </Animated.View>
          </TouchableOpacity>

          <View>
            <DottedLine />
          </View>
          {/* Payment Methods */}
          <Text style={styles.sectionTitle}>Select a Payment Method</Text>
          <View style={styles.paymentMethods}>
            <PaymentMethod
              index={0}
              assetPath={require("../../assets/icons/Mastercard.png")}
              isSelected={selectedPaymentIndex === 0}
              onSelect={setSelectedPaymentIndex}
            />
            <PaymentMethod
              index={1}
              assetPath={require("../../assets/icons/Paypal.png")}
              isSelected={selectedPaymentIndex === 1}
              onSelect={setSelectedPaymentIndex}
            />
            <PaymentMethod
              index={2}
              assetPath={require("../../assets/icons/Visa.png")}
              isSelected={selectedPaymentIndex === 2}
              onSelect={setSelectedPaymentIndex}
            />
            <PaymentMethod
              index={3}
              assetPath={require("../../assets/icons/GooglePay.png")}
              isSelected={selectedPaymentIndex === 3}
              onSelect={setSelectedPaymentIndex}
            />
          </View>

          {/* Total and Book Now */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>$7.00</Text>
          </View>

          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => router.push("/(tabs)/BookingSuccess")}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Voucher Modal */}
      <Modal visible={showVoucherModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Voucher Code</Text>
            <TextInput
              style={styles.voucherInput}
              value={voucherCode}
              onChangeText={setVoucherCode}
              placeholder="Voucher Code"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setShowVoucherModal(false)}
                style={[styles.modalButton, styles.cancelButton]}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleVoucherApply}
                style={[styles.modalButton, styles.applyButton]}
              >
                <Text style={styles.modalButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF6FF",
    paddingTop: 35,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 4,
    backgroundColor: "transparent",
  },
  backButton: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 12,
    marginLeft: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#000",
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  parkingHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  spotBadge: {
    backgroundColor: "#FF5722",
    padding: 12,
    height: 60,
    width: 60,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  spotNumber: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  locationInfo: {
    marginLeft: 12,
  },
  locationTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#000",
  },
  locationSubtitle: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#666",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#888",
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#000",
    textAlign: "right",
  },
  dottedLine: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
  dot: {
    width: width * 0.01,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 3,
  },
  voucherContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginVertical: 10,
  },
  voucherText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#000",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#000",
    marginBottom: 16,
  },
  paymentMethods: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  paymentMethod: {
    width: width * 0.18,
    height: width * 0.12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedPaymentMethod: {
    borderColor: "#673AB7",
    borderWidth: 2,
  },
  paymentIcon: {
    width: "100%",
    height: "100%",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#000",
  },
  totalAmount: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#FF5722",
  },
  bookButton: {
    backgroundColor: "#673AB7",
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: "center",
  },
  bookButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 24,
    width: width * 0.8,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 16,
  },
  voucherInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontFamily: "Poppins-Regular",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: "#E0E0E0",
  },
  applyButton: {
    backgroundColor: "#673AB7",
  },
  modalButtonText: {
    color: "white",
    fontFamily: "Poppins-Medium",
  },
});

export default TransactionDetails;
