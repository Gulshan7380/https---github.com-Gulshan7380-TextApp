import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './RootNavigator';

export const AppNavigationContainer = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};
