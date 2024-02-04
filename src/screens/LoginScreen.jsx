
import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import BaseLayout from '@components/BaseLayout';
import BaseTextInput from '@components/BaseTextInput';
import {Colors, Fonts, moderateScale, scale} from '@utils/theme';
import {useNavigation} from '@react-navigation/native';
import {STACK_NAVIGATION_KEYS} from '../navigation/NavigationKeys';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {Lock, Profile} from '@assets/icons';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    username: '',
    password: '',
  });

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!userData.username.trim()) {
      errors.username = 'Please enter your username';
      valid = false;
    }
    if (!userData.password.trim()) {
      errors.password = 'Please enter password';
      valid = false;
    }

    setErrorMessages(errors);
    return valid;
  };

  const password = useRef(null);
  const URL = 'https://dummyjson.com/';
  const EndPoint = 'users';

  const handleLogin = async () => {
    const isValid = validateForm();

    if (isValid) {
      setLoading(true);

      try {
        const response = await fetch(`${URL}${EndPoint}`);
        const data = await response.json();
        const user = data.users.find(
          user =>
            user.username === userData.username &&
            user.password === userData.password,
        );

        if (user) {
          showMessage({
            message: 'Login',
            description: 'Login successfully',
            type: 'success',
            // duration: 3000,
          });

          navigation.replace(STACK_NAVIGATION_KEYS.BOTTOM_NAVIGATOR);
        } else {
          showMessage({
            message: 'Login Failed',
            description: 'Invalid username or password.',
            type: 'danger',
            duration: 3000,
          });
        }
      } catch (error) {
        console.error('Error during login:', error);
        Alert.alert(
          'Error',
          'An error occurred during login. Please try again.',
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <BaseLayout>
      <FlashMessage position="top" />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{}}>
          <Image
            style={styles.image}
            resizeMode="stretch"
            source={require('../assets/images/LoginImage.png')}
          />
        </View>

        <View style={{paddingHorizontal: moderateScale(20)}}>
          <Text style={styles.text}>Welcome Back!</Text>
          <Text style={styles.text1}>Sign in to continue</Text>
          <View style={{marginVertical: moderateScale(20)}}>
            <BaseTextInput
              icon={<Profile />}
              onSubmit={() => password.current.focus()}
              placeholder={'Username'}
              value={userData.username}
              onChange={text => {
                setUserData({...userData, username: text});
                setErrorMessages({...errorMessages, username: ''});
              }}
            />
            {errorMessages.username && (
              <Text style={styles.errorText}>{errorMessages.username}</Text>
            )}
            <View style={{marginVertical: moderateScale(10)}}>
              <BaseTextInput
                icon={<Lock />}
                inputRef={password}
                placeholder={'Password'}
                value={userData.agency}
                isSecured={true}
                onChange={text => {
                  setUserData({...userData, password: text});
                  setErrorMessages({...errorMessages, password: ''});
                }}
              />
              {errorMessages.password && (
                <Text style={styles.errorText}>{errorMessages.password}</Text>
              )}
            </View>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: moderateScale(20),
            marginVertical: moderateScale(50),
          }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleLogin}
            style={styles.buttonContainer}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator size={'large'} color={'#fff'} />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </BaseLayout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  text: {
    color: Colors.BLACK,
    fontSize: scale(25),
    fontFamily: Fonts.MEDIUM,
    marginTop: moderateScale(30),
  },
  text1: {
    color: Colors.BLACK,
    fontSize: scale(18),
    fontFamily: Fonts.MEDIUM,
    marginVertical: moderateScale(10),
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY_COLOR,
    borderRadius: moderateScale(12),
    height: moderateScale(50),
  },
  buttonText: {
    fontSize: scale(18),
    fontFamily: Fonts.MEDIUM,
    color: Colors.WHITE,
    includeFontPadding: false,
  },
  image: {
    width: '100%',
  },
  errorText: {
    color: Colors.RED,
    fontSize: scale(13),
    fontFamily: Fonts.REGULAR,
    includeFontPadding: false,
    marginBottom: 8,
  },
});
