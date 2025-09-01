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
import Profile from './screens/Profile';
import ProfileSetting from './screens/ProfileSetting';
import ApplicationDisclimar from './screens/ApplicationDisclimar';
import BmiCalculator from './screens/BmiCalculator';
import {NavigationProp} from '@react-navigation/native';
import BMIResult from './screens/BMIResult';
import WhrCalculator from './screens/WhrCalculator';
import WHRResult from './screens/WHRResult';
import FeedBackScreen from './screens/FeedBackScreen';
import MythsAndFacts from './screens/MythsAndFacts';
import DRFCalculator from './screens/DRFCalculator';
import DRFResults from './screens/DRFResults';
import MODYCalculator from './screens/MODYCalculator';
import ModyResults from './screens/ModyResults';
import DietaryGuide from './screens/DietaryGuide';
import Assesment from './screens/Assesment';
import AssesmentQuestions from './screens/AssesmentQuestions';
import MyLog from './screens/MyLog';
import NoInternetScreen from './screens/NoInternetScreen';
import WebViewComponent from './screens/WebView';
import ChooseYourCaloricValue from './screens/ChooseYourCaloricValue';
import CaloriesWiseList from './screens/CaloriesWiseList';
import YourCaloricMenu from './screens/YourCaloricMenu';
import YADRCalculator from './screens/YADRCalculator';
import YADRREsults from './screens/YADRResults';

export type ScreenNames = [
  'SplashScreen',
  'AppicationDisclimarScreen',
  'ProfileSettingScreen',
  'ProfileScreen',
  'HomeScreen',
  'FirstTimeScreen',
  'LoginScreen',
  'SignUpScreen',
  'DiabetesGuideScreen',
  'ModyScreen',
  'ExcerciseGuideScreen',
  'BmiCalculatorScreen',
  'BMIResultScreen',
  'WhrCalculatorScreen',
  'WHRResultScreen',
  'FeedBackScreen',
  'MythsAndFactsScreen',
  'DRFCalculatorScreen',
  'DRFResultsScreen',"YADRResultsScreen",
  'MODYCalculatorScreen',
  'ModyResultsScreen',
  'DietaryGuideScreen',
  'AssesmentScreen',
  'AssesmentQuestionsScreen',
  'MyLogScreen',
  'NoInternetScreen',
  'WebViewScreen',
  'CYCVScreen',
  'CaloriesWiseListScreen',
  'YourCaloricMenuScreen',
  'ForgotPasswordScreen',
]; // type these manually
export type RootStackParamList = Record<
  ScreenNames[number],
  {[key: string]: any} | undefined
>;
export type StackNavigation = NavigationProp<RootStackParamList>;

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
        name="AppicationDisclimarScreen"
        options={{
          headerShown: false,
        }}
        component={ApplicationDisclimar}
      />
      <Screen
        name="ProfileSettingScreen"
        options={{
          headerShown: false,
        }}
        component={ProfileSetting}
      />
      <Screen
        name="ProfileScreen"
        options={{
          headerShown: false,
        }}
        component={Profile}
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
      <Screen
        name="BmiCalculatorScreen"
        options={{
          headerShown: false,
        }}
        component={BmiCalculator}
      />
      <Screen
        name="BMIResultScreen"
        options={{
          headerShown: false,
        }}
        component={BMIResult}
      />
      <Screen
        name="CaloriesWiseListScreen"
        options={{
          headerShown: false,
        }}
        component={CaloriesWiseList}
      />
      <Screen
        name="WhrCalculatorScreen"
        options={{
          headerShown: false,
        }}
        component={WhrCalculator}
      />
      <Screen
        name="WHRResultScreen"
        options={{
          headerShown: false,
        }}
        component={WHRResult}
      />
      <Screen
        name="FeedBackScreen"
        options={{
          headerShown: false,
        }}
        component={FeedBackScreen}
      />
      <Screen
        name="MythsAndFactsScreen"
        options={{
          headerShown: false,
        }}
        component={MythsAndFacts}
      />
      <Screen
        name="DRFCalculatorScreen"
        options={{
          headerShown: false,
        }}
        component={YADRCalculator}
      />
      <Screen
        name="DRFResultsScreen"
        options={{
          headerShown: false,
        }}
        component={DRFResults}
      />
      <Screen
        name="YADRResultsScreen"
        options={{
          headerShown: false,
        }}
        component={YADRREsults}
      />
      
      <Screen
        name="MODYCalculatorScreen"
        options={{
          headerShown: false,
        }}
        component={MODYCalculator}
      />
      <Screen
        name="YourCaloricMenuScreen"
        options={{
          headerShown: false,
        }}
        component={YourCaloricMenu}
      />
      <Screen
        name="ModyResultsScreen"
        options={{
          headerShown: false,
        }}
        component={ModyResults}
      />
      <Screen
        name="DietaryGuideScreen"
        options={{
          headerShown: false,
        }}
        component={DietaryGuide}
      />
      <Screen
        name="AssesmentScreen"
        options={{
          headerShown: false,
        }}
        component={Assesment}
      />
      <Screen
        name="AssesmentQuestionsScreen"
        options={{
          headerShown: false,
        }}
        component={AssesmentQuestions}
      />
      <Screen
        name="MyLogScreen"
        options={{
          headerShown: false,
        }}
        component={MyLog}
      />
      <Screen
        name="NoInternetScreen"
        options={{
          headerShown: false,
        }}
        component={NoInternetScreen}
      />
      <Screen
        name="WebViewScreen"
        options={{
          headerShown: false,
        }}
        component={WebViewComponent}
      />
      <Screen
        name="CYCVScreen"
        options={{
          headerShown: false,
        }}
        component={ChooseYourCaloricValue}
      />
    </Navigator>
  );
};

export default StackNavigator;
