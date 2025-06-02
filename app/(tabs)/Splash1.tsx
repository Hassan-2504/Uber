import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/Button";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

const Splash1Screen = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    router.push("/(tabs)/Splash2");
    console.log("getstarted pressed");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.backgroundImage}
      >
        {/* Top Right Image */}
        <Image
          source={require("../../assets/images/topRightImage.png")}
          style={styles.topRightImage}
          resizeMode="contain"
        />

        {/* Center Content */}
        <View style={styles.contentContainer}>
          <Image
            source={require("../../assets/images/splashcar.png")}
            style={styles.carImage}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Welcome to E-Parking!</Text>
            <Text style={styles.subtitle}>
              Seamlessly find and reserve parking nearby.{"\n"}
              Fast, easy, and secure—park with confidence!
            </Text>
          </View>
        </View>

        {/* Bottom Button */}
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Get Started"
            onPress={handleGetStarted}
            buttonColor="white"
            textColor="#834DBF"
            className="w-full bg-white py-4 rounded-full mb-4 flex-row items-center justify-center"
            textClassName="text-[#834DBF] text-xl font-semibold"
            customIcon={null}
            width="100%"
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  topRightImage: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "40%",
    height: "35%",
    zIndex: 1,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10%",
  },
  carImage: {
    width: "95%",
    height: undefined,
    aspectRatio: 1,
    marginTop: "60%",
    marginBottom: "10%",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: "5%",
  },
  heading: {
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "2%",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    textAlign: "center",
    paddingHorizontal: "4%",
    color: "#834DBF",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
});

export default Splash1Screen;
