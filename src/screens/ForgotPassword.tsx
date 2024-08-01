import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import lock from '../assets/icons/lock.png';
import mail from '../assets/icons/mail.png';
import visibility from '../assets/icons/visibility.png';
import CustomButton from '../components/CustomButton';
import CustomTextinput from '../components/CustomTextinput';
import auth from '../utils/auth';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passVis, setPassVis] = useState(true);
  const [load, setLoad] = useState(false);
  const [otp, setOtp] = useState('');
  const [stage, setStage] = useState(0);
  const [conPassVis, setConPassVis] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    clearStorage();
  }, []);

  const clearStorage = async () => {
    await AsyncStorage.removeItem('token');
  };

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  //   /reset-pass
  const onPressSubmit = async () => {
    setLoad(true);
    try {
      if (!stage) {
        const res = await auth.post('/auth/reset-pass', {email});
        await res.data;
        ToastAndroid.show(
          'OTP sent to the registered email id',
          ToastAndroid.SHORT,
        );
        setStage(1);
      } else {
        const res = await auth.post('/auth/verify-otp', {
          email,
          otp,
          password,
          confirmPassword,
        });
        await res.data;
        ToastAndroid.show(
          'Password changed successfully kindly login with new password',
          ToastAndroid.SHORT,
        );
        navigation.dispatch(StackActions.replace('LoginScreen'));
      }
    } catch (error: any) {
      //console.log(error.response);
      const {message} = error.response.data;
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } finally {
      setLoad(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <ScrollView>
        <Text style={[styles.welcome]}>
          {stage
            ? 'Verification Code Entry and Create New Password'
            : 'Forgot Your Password?'}
        </Text>
        <Text style={[styles.subHead]}>
          {stage
            ? 'Enter the OTP sent to your email along with new pasword'
            : 'Enter your account email address to receive the code to reset your password.'}
        </Text>
        {!stage ? (
          <CustomTextinput
            prefixIcon={mail}
            placeholder="Enter E-mail address"
            mainContStyle={[styles.inputStyle]}
            value={email}
            onChangeText={e => setEmail(e)}
          />
        ) : (
          <>
            <CustomTextinput
              style={[
                {
                  height: 62,
                  fontSize: 30,
                  letterSpacing: 30,
                  flex: 1,
                },
              ]}
              maxLength={4}
              onChangeText={e => setOtp(e)}
              keyboardType="numeric"
            />
            <Text
              style={[styles.tcHighlight]}
              onPress={async () => {
                try {
                  const res = await auth.post('/auth/reset-pass', {email});
                  await res.data;
                  ToastAndroid.show(
                    'OTP sent to the registered email id',
                    ToastAndroid.SHORT,
                  );
                } catch (error) {
                  //console.log(error);
                }
              }}>
              Send Again
            </Text>
            <View
              style={[
                {
                  backgroundColor: 'rgba(0, 11, 33, 0.20)',
                  height: 1,
                  flex: 1,
                  margin: 40,
                },
              ]}
            />
            <Text style={[styles.inputStyle]}>
              Please enter and confirm your new password.
            </Text>
            <CustomTextinput
              prefixIcon={lock}
              mainContStyle={[styles.inputStyle]}
              suffixIcon={visibility}
              placeholder="Enter password"
              value={password}
              secureTextEntry={passVis}
              onChangeText={e => setPassword(e)}
              suffixIconTap={() => setPassVis(e => !e)}
            />
            <CustomTextinput
              prefixIcon={lock}
              mainContStyle={[styles.inputStyle]}
              suffixIcon={visibility}
              placeholder="Re-enter password"
              value={confirmPassword}
              secureTextEntry={conPassVis}
              suffixIconTap={() => setConPassVis(e => !e)}
              onChangeText={e => setConfirmPassword(e)}
            />
          </>
        )}

        <View style={[{height: 36}]} />
        <CustomButton
          onPress={onPressSubmit}
          label={stage ? 'SEND CODE' : 'SUBMIT'}
          load={load}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: {flex: 1, padding: 10, paddingTop: 46, backgroundColor: 'white'},
  subHead: {fontSize: 16, marginBottom: 30, color: 'rgba(0, 11, 33, .3)'},
  welcome: {
    fontWeight: 800,
    fontSize: 30,
    color: '#000B21',
  },
  inputStyle: {
    marginVertical: 5,
  },
  tcHighlight: {
    color: '#0075FF',
    fontWeight: 'bold',
    marginTop: 20,
  },
});
