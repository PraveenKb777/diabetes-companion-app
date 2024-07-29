import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions, useNavigation} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
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
import {validateEmail, validatePassword} from '../utils/validations';

export const ErrorInputComp: FC<{label: string}> = ({label}) => {
  if (!label) {
    return null;
  }
  return <Text style={{color: '#FF6666', fontSize: 10}}>{label}</Text>;
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passVis, setPassVis] = useState(true);
  const [load, setLoad] = useState(false);

  const [errors, setErrors] = useState({
    emailError: '',
    passError: '',
  });

  const isErrors = () => {
    const emailError = validateEmail(email);
    const passError = validatePassword(password);
    setErrors({emailError, passError});

    if (emailError === '' && passError === '') {
      return false;
    }

    return true;
  };

  useEffect(() => {
    clearStorage();
  }, []);

  const clearStorage = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  };

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const onPressLogin = async () => {
    setLoad(true);
    try {
      const error = isErrors();

      if (error) {
        return;
      }
      const res = await auth.post('/auth/login', {email, password});
      const {message, token, user} = await res.data;
      console.log(user);
      ToastAndroid.show(message, ToastAndroid.SHORT);
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      console.log(user, '>>user');
      navigation.dispatch(StackActions.replace('HomeScreen'));
    } catch (error: any) {
      const data = await error.response.data;
      console.log('>>>', data);
      const msg =
        error.response.data.message || 'Something went wrong try again';
      ToastAndroid.show(msg, ToastAndroid.SHORT);

      console.log(error.response);
    } finally {
      setLoad(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Text style={[styles.welcome]}>Hello Again!</Text>
        <Text style={[styles.subHead]}>
          It’s great to have you back! Please log in to access your diabetes
          companion application.
        </Text>
        <CustomTextinput
          prefixIcon={mail}
          placeholder="Enter E-mail address"
          mainContStyle={[styles.inputStyle]}
          value={email}
          onChangeText={e => setEmail(e)}
        />
        <ErrorInputComp label={errors.emailError} />
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
        <ErrorInputComp label={errors.passError} />
        <Text
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
          style={[{alignSelf: 'flex-end'}, styles.inputStyle]}>
          Forgot Password ?
        </Text>
        <View style={[{height: 36}]} />
        <CustomButton onPress={onPressLogin} label="LOGIN" load={load} />

        <Text style={[styles.tcMain]}>
          New to the application?{' '}
          <Text
            style={[styles.tcHighlight]}
            onPress={() =>
              navigation.dispatch(StackActions.replace('SignUpScreen'))
            }>
            Sign Up
          </Text>
        </Text>
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
  tcMain: {
    marginVertical: 40,
    alignItems: 'center',
    flexDirection: 'row',
  },
  tcStyle: {
    color: '#9D9D9D',
    fontSize: 14,
    fontWeight: 400,
  },
  tcHighlight: {
    color: '#0075FF',
    textDecorationLine: 'underline',
  },
});
