import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [selectedNotificationIndex, setSelectedNotificationIndex] =
    useState(null);

  const notifications = [
    {
      id: 0,
      bgColor: "#FA9F3F",
      imagePath: require("../../assets/icons/parkedvehicle.png"),
      title: "Your vehicle is parked",
      message: "The time will be counted down",
      dateTime: "Nov 18, 2024   11.26pm",
    },
    {
      id: 1,
      bgColor: "#18AFFF",
      imagePath: require("../../assets/icons/arrived.png"),
      title: "You have arrived",
      message: "Please scan the code on the parking...",
      dateTime: "Nov 18, 2024   9.16pm",
    },
    {
      id: 2,
      bgColor: "#1AE879",
      imagePath: require("../../assets/icons/headsup.png"),
      title: "Heads Up!",
      message: "You're about to arrive at your parking spot!",
      dateTime: "Nov 18, 2024   9.16pm",
    },
    {
      id: 3,
      bgColor: "#FFA618",
      imagePath: require("../../assets/icons/payment.png"),
      title: "Payment Successful!",
      message: "Your payment of $12 has been...",
      dateTime: "Nov 18, 2024   9.16pm",
    },
    {
      id: 4,
      bgColor: "#FF5618",
      imagePath: require("../../assets/icons/timeexpired.png"),
      title: "Time Expired",
      message: "Your parking session has ended.",
      dateTime: "Nov 18, 2024   9.16pm",
    },
  ];

  const NotificationItem = ({ item, index }) => {
    const isSelected = selectedNotificationIndex === index;

    return (
      <TouchableOpacity
        onPress={() => setSelectedNotificationIndex(index)}
        style={[
          styles.notificationItem,
          isSelected && styles.selectedNotificationItem,
        ]}
      >
        {isSelected && <View style={styles.selectedBar} />}
        <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
          <Image source={item.imagePath} style={styles.notificationIcon} />
        </View>

        <View style={styles.contentContainer}>
          <Text style={[styles.title, isSelected && styles.selectedTitle]}>
            {item.title}
          </Text>

          <Text style={styles.message}>{item.message}</Text>
          <Text style={styles.dateTime}>{item.dateTime}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#673AB7" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notifications</Text>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Icon name="home" size={24} color="#673AB7" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {notifications.map((notification, index) => (
          <NotificationItem
            key={notification.id}
            item={notification}
            index={index}
          />
        ))}
      </ScrollView>
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FAF6FF",
  },
  headerButton: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  selectedBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
    backgroundColor: "#673AB7",
  },
  selectedNotificationItem: {
    backgroundColor: "#F5EEFF",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  notificationIcon: {
    width: 34,
    height: 34,
    resizeMode: "contain",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 4,
  },
  selectedTitle: {
    fontWeight: "bold",
    color: "#673AB7",
  },
  message: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  dateTime: {
    fontSize: 12,
    color: "#999",
  },
});

export default NotificationScreen;
