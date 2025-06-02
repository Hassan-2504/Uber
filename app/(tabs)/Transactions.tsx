import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import { router } from "expo-router";
import BottomNavigation from "../../components/BottomNavigation";
import { useFonts } from "expo-font";

// Mock data for transactions
const TRANSACTIONS = [
  {
    id: "1",
    title: "A Cinema Parking",
    price: "$7.00",
    bookingDate: "Sep 23, 2024",
    number: "#310",
    arriveAfter: "22 Apr, Mon\n10:00 AM",
    exitBefore: "24 Apr, Mon\n12:00 AM",
    duration: "2 days, 2 Hours",
    paymentMethod: "VISA",
    location: "2nd Floor / A Sector",
    time: "03:30 PM",
    spotNumber: "A-10",
  },
  {
    id: "2",
    title: "B Cinema Parking",
    price: "$7.00",
    bookingDate: "Sep 23, 2024",
    location: "2nd Floor / A Sector",
    time: "03:30 PM",
    spotNumber: "B-15",
    paymentMethod: "CASH",
  },
  // Add more transaction items as needed
];

interface Transaction {
  id: string;
  title: string;
  price: string;
  bookingDate: string;
  number?: string;
  arriveAfter?: string;
  exitBefore?: string;
  duration?: string;
  paymentMethod: string;
  location: string;
  time: string;
  spotNumber: string;
}

interface DetailRowProps {
  title: string;
  value: string;
  subValue?: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  isExpanded: boolean;
  onPress: () => void;
}

const DetailRow = ({ title, value, subValue }: DetailRowProps) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailTitle}>{title}</Text>
    <View style={styles.detailValueContainer}>
      <Text style={styles.detailValue}>{value}</Text>
      {subValue && <Text style={styles.timeText}>{subValue}</Text>}
    </View>
  </View>
);

const TransactionItem = ({
  transaction,
  isExpanded,
  onPress,
}: TransactionItemProps) => {
  return (
    <TouchableOpacity
      style={[styles.bookingCard, !isExpanded && styles.collapsedCard]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {isExpanded ? (
        <>
          <View style={styles.expandedHeader}>
            <View style={styles.spotNumberContainer}>
              <Text style={styles.spotNumber}>{transaction.spotNumber}</Text>
            </View>
            <View style={styles.bookingInfo}>
              <Text style={styles.bookingTitle}>{transaction.title}</Text>
              <Text style={styles.bookingSubtitle}>{transaction.location}</Text>
            </View>
          </View>

          <View style={styles.expandedContent}>
            <View style={styles.sectionDivider} />

            {/* Section 2: Booking Details */}
            <View style={styles.section}>
              <DetailRow title="Booking Date" value={transaction.bookingDate} />
              <DetailRow
                title="No. of Parking"
                value={transaction.number || "-"}
              />
            </View>

            <View style={styles.sectionDivider} />

            {/* Section 3: Time Details */}
            <View style={styles.section}>
              <DetailRow
                title="Arrive After"
                value="22 Apr, Mon"
                subValue="03:00 AM"
              />
              <DetailRow
                title="Exit Before"
                value="24 Apr, Mon"
                subValue="12:00 AM"
              />
              <DetailRow title="Duration" value="2 days, 2 hours" />
            </View>
            <View style={styles.sectionDivider} />
            {/* Section 1: Payment Details */}
            <View style={styles.section}>
              <View style={styles.paymentMethodRow}>
                <Text style={styles.paymentTitle}>Payment Method</Text>
                <Image
                  source={require("../../assets/icons/Visa.png")}
                  style={styles.visaIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.billedContainer}>
                <Text style={styles.billedText}>Billed</Text>
                <Text style={styles.paymentPrice}>{transaction.price}</Text>
              </View>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.collapsedContent}>
          <View style={styles.spotNumberContainer}>
            <Text style={styles.spotNumber}>{transaction.spotNumber}</Text>
          </View>
          <View style={styles.collapsedInfo}>
            <View>
              <Text style={styles.bookingTitle}>{transaction.title}</Text>
              <Text style={styles.bookingSubtitle}>{transaction.location}</Text>
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>
                  {transaction.bookingDate} | {transaction.time}
                </Text>
                <Text style={styles.bookingPrice}>{transaction.price}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const Transactions = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Icon name="arrow-back-ios" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bookings History</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {TRANSACTIONS.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            isExpanded={expandedId === transaction.id}
            onPress={() =>
              setExpandedId(
                expandedId === transaction.id ? null : transaction.id
              )
            }
          />
        ))}
      </ScrollView>
      <BottomNavigation selectedTab={2} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF6FF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#000",
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
  bookingCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  expandedHeader: {
    flexDirection: "row",
    padding: 16,
    gap: 16,
  },
  collapsedContent: {
    flexDirection: "row",
    padding: 10,
    gap: 16,
  },
  spotNumberContainer: {
    width: 100,
    height: 100,
    backgroundColor: "#FF5E3A",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  spotNumber: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
  },
  bookingInfo: {
    flex: 1,
    gap: 4,
  },
  collapsedInfo: {
    flex: 1,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  dateText: {
    fontSize: 15,
    fontFamily: "Poppins-SemiBold",
    color: "#000",
  },
  bookingPrice: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#FF5E3A",
  },
  bookingTitle: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#000",
    marginBottom: 6,
    marginTop: 10,
  },
  bookingSubtitle: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    color: "#666",
    marginBottom: 4,
  },
  expandedContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  section: {
    paddingVertical: 12,
    gap: 10,
  },
  sectionDivider: {
    height: 2,
    borderStyle: "dotted",
    borderWidth: 2,
    borderColor: "#E5E5EA",
    opacity: 0.8,
  },
  paymentMethodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  paymentTitle: {
    fontSize: 15,
    fontFamily: "Poppins-SemiBold",
    color: "#000",
  },
  billedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  detailTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#888",
    flex: 1,
  },
  detailValueContainer: {
    width: "40%",
    alignItems: "flex-end",
  },
  detailValue: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#000",
    textAlign: "right",
  },
  timeText: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#666",
    marginTop: 2,
  },
  paymentPrice: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#FF5E3A",
  },
  collapsedCard: {
    paddingVertical: 8,
  },
  visaIcon: {
    height: 24,
    width: 48,
  },
  billedText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#000",
  },
});

export default Transactions;
