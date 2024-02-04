import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 813;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export {scale, verticalScale, moderateScale};

export const Colors = {
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  BACKGROUND_COLOR: '#FBFCFC',
  STATUS_COLOR: '#FBFCFC',
  TEXT_COLOR: '#E5E8E8 ',
  PRIMARY_COLOR: '#5DADE2',
  RED: '#FF0000',
  TEXT_COLOR: '#566573',
  GRAY_COLOR: 'gray',
};

export const Fonts = {
  Black: 'Roboto-Black',
  Bold: 'Roboto-Bold',
  LIGHT: 'Roboto-Light',
  MEDIUM: 'Roboto-Medium',
  Thin: 'Roboto-Thin',
  REGULAR: 'Roboto-Regular',
};

export const DEVICE_STYLES = {
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
};

export const DEVICE_STYLES_WITH_STATUSBAR = Dimensions.get('screen');
