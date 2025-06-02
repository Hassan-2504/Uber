import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const ThankYouScreen = () => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push('/(tabs)/Home')}
      activeOpacity={1}
    >
      <LinearGradient
        colors={['#A763FB', '#F6C8E0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Top Right Image */}
        <Image
          source={require('../../assets/images/thankyoutopright.png')}
          style={styles.topRightImage}
        />

        {/* Bottom Left Image */}
        <Image
          source={require('../../assets/images/thankyoubottomleft.png')}
          style={styles.bottomLeftImage}
        />

        {/* Center Content */}
        <View style={styles.centerContent}>
          {/* Triple Circle Container */}
          <View style={styles.outerCircle}>
            <View style={styles.middleCircle}>
              <View style={styles.innerCircle}>
                <Image
                  source={require('../../assets/images/thankyoucentercar.png')}
                  style={styles.carImage}
                />
              </View>
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.thankYouText}>Thank you!</Text>
            <Text style={styles.subText}>For using our e-parking service</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  topRightImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 70,
    height: 120,
  },
  bottomLeftImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 140,
    height: 140,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircle: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  carImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  textContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  thankYouText: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

export default ThankYouScreen; 