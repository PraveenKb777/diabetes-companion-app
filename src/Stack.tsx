import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabNavigator} from './Tab';
import React from 'react';
import FirstTimeScreen from './screens/FirstTimeScreen';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import ForgotPassword from './screens/ForgotPassword';
import SplashScreen from './screens/SplashScreen';
import DiabetesGuide from './screens/DiabetesGuide';
import Mody from './screens/Mody';
import ExcerciseGudie from './screens/ExcerciseGudie';

const {Navigator, Screen} = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Navigator initialRouteName="HomeScreen">
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
      <Screen
        name="DiabetesGuideScreen"
        options={{
          headerShown: false,
        }}
        component={DiabetesGuide}
      />
      <Screen
        name="ModyScreen"
        options={{
          headerShown: false,
        }}
        component={Mody}
      />
      <Screen
        name="ExcerciseGuideScreen"
        options={{
          headerShown: false,
        }}
        component={ExcerciseGudie}
      />
    </Navigator>
  );
};

export default StackNavigator;
