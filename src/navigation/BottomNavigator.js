import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CartScreen from '@screens/CartScreen';
import HomeScreen from '@screens/HomeScreen';
import {Colors, Fonts, moderateScale, scale} from '@utils/theme';
import {Cart, Home} from '@assets/icons';
import {View} from 'react-native';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: scale(14),
          bottom: moderateScale(8),
          fontFamily: Fonts.MEDIUM,
        },
        tabBarActiveTintColor: Colors.PRIMARY_COLOR,
        tabBarInactiveTintColor: Colors.BLACK,
        tabBarStyle: {
          height: moderateScale(60),
        },
      }}
      initialRouteName={'Home'}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  width: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 2,
                }}>
                {focused ? (
                  <Home style={{color: Colors.PRIMARY_COLOR}} />
                ) : (
                  <Home style={{color: Colors.BLACK}} />
                )}
              </View>
            );
          },
        })}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={() => ({
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  width: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {focused ? (
                  <Cart style={{color: Colors.PRIMARY_COLOR}} />
                ) : (
                  <Cart style={{color: Colors.BLACK}} />
                )}
              </View>
            );
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
