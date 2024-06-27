import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabNavigator} from './Tab';
import React from 'react';
import FirstTimeScreen from './screens/FirstTimeScreen';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import ForgotPassword from './screens/ForgotPassword';
import SplashScreen from './screens/SplashScreen';

const {Navigator, Screen} = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Navigator initialRouteName="SplashScreen">
      <Screen
        name="SplashScreen"
        options={{
          headerShown: false,
        }}
        component={SplashScreen}
      />
      <Screen
        name="HomeScreen"
        options={{
          headerShown: false,
        }}
        component={TabNavigator}
      />
      <Screen
        name="FirstTimeScreen"
        options={{
          headerShown: false,
        }}
        component={FirstTimeScreen}
      />
      <Screen
        name="LoginScreen"
        options={{
          headerShown: false,
        }}
        component={Login}
      />
      <Screen
        name="SignUpScreen"
        options={{
          headerShown: false,
        }}
        component={SignUp}
      />
      <Screen
        name="ForgotPasswordScreen"
        options={{
          headerShown: false,
        }}
        component={ForgotPassword}
      />
    </Navigator>
  );
};

export default StackNavigator;
