import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import BottomNavigator from '../navigation/BottomNavigator';
import SplashScreen from '../screens/SplashScreen';
import CartScreen from '../screens/CartScreen';
import ProductScreen from '../screens/ProductScreen';

//STACK NAVIGATION ROUTES

export const STACK_NAVIGATION_ROUTES = {
  LoginScreen,
  SplashScreen,
  ProductScreen,
  BottomNavigator,
};

//BOTTOM NAVIGATION ROUTES
export const BOTTOM_NAVIGATION_ROUTES = {
  HomeScreen,
  CartScreen,
};
