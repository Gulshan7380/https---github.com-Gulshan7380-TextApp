import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {STACK_NAVIGATION_KEYS} from './NavigationKeys';
import {STACK_NAVIGATION_ROUTES} from './Routes';
import {Colors} from '@utils/theme';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarStyle: 'dark',
        animation: 'slide_from_right',
        headerShown: false,
        statusBarTranslucent: false,
        gestureEnabled: false,
        statusBarColor: Colors.STATUS_COLOR,
      }}
      initialRouteName={STACK_NAVIGATION_KEYS.SPLASH_SCREEN}>
      <Stack.Screen
        name={STACK_NAVIGATION_KEYS.SPLASH_SCREEN}
        component={STACK_NAVIGATION_ROUTES.SplashScreen}
        options={{statusBarColor: Colors.PRIMARY_COLOR, statusBarStyle: 'dark'}}
      />
      <Stack.Screen
        name={STACK_NAVIGATION_KEYS.LOGIN_SCREEN}
        component={STACK_NAVIGATION_ROUTES.LoginScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATION_KEYS.BOTTOM_NAVIGATOR}
        component={STACK_NAVIGATION_ROUTES.BottomNavigator}
      />
      <Stack.Screen
        name={STACK_NAVIGATION_KEYS.PRODUCT_SCREEN}
        component={STACK_NAVIGATION_ROUTES.ProductScreen}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
