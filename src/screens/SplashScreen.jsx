import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {STACK_NAVIGATION_KEYS} from '../navigation/NavigationKeys';
import BaseLayout from '@components/BaseLayout';
import {Colors, Fonts, moderateScale, scale} from '@utils/theme';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace(STACK_NAVIGATION_KEYS.LOGIN_SCREEN);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <BaseLayout backgroundColor={Colors.PRIMARY_COLOR}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/images/SplashImage.png')}
        />
      </View>
    </BaseLayout>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'red',
  },
  text: {
    color: Colors.BLACK,
    fontSize: scale(30),
    fontFamily: Fonts.MEDIUM,
  },
  image: {
    width: moderateScale(200),
    height: moderateScale(200),
  },
});
