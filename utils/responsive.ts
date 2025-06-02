import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (based on standard iPhone 11)
const baseWidth = 375;
const baseHeight = 812;

// Scaling factors
export const scaleWidth = (size: number) => {
  const scaledSize = (SCREEN_WIDTH / baseWidth) * size;
  return Math.round(scaledSize);
};

export const scaleHeight = (size: number) => {
  const scaledSize = (SCREEN_HEIGHT / baseHeight) * size;
  return Math.round(scaledSize);
};

export const moderateScale = (size: number, factor = 0.5) => {
  return size + (scaleWidth(size) - size) * factor;
};

// Responsive font sizing
export const fontScale = (size: number) => {
  const newSize = size * (SCREEN_WIDTH / baseWidth);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

// Common styles
export const commonStyles = {
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
};

// Export dimensions for direct use
export const dimensions = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
}; 