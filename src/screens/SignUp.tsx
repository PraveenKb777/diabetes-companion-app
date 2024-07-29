import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import CustomTextinput from '../components/CustomTextinput';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions, useNavigation} from '@react-navigation/native';
import lock from '../assets/icons/lock.png';
import mail from '../assets/icons/mail.png';
import person from '../assets/icons/person.png';
import today from '../assets/icons/today.png';
import visibility from '../assets/icons/visibility.png';
import CustomButton from '../components/CustomButton';
import DropdownComponent from '../components/CustomDropDown';
import auth from '../utils/auth';
import {
  Gender,
  validateAge,
  validateConfirmPassword,
  validateEmail,
  validateGender,
  validateName,
  validatePassword,
} from '../utils/validations';
import {ErrorInputComp} from './Login';

const data = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Others', value: 'other'},
];
export type TGender = 'male' | 'female' | 'other';
const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<TGender>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passVis, setPassVis] = useState(true);
  const [conPassVis, setConPassVis] = useState(true);
  const [errors, setErrors] = useState({
    nameError: '',
    emailError: '',
    passError: '',
    confirmPassError: '',
    ageError: '',
    genderError: '',
  });
  // const [check, setCheck] = useState(false);
  const isErrors = () => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passError = validatePassword(password);
    const confirmPassError = validateConfirmPassword(password, confirmPassword);
    const ageError = validateAge(Number(age));
    const genderError = validateGender(gender as Gender);
    setErrors({
      ageError,
      confirmPassError,
      emailError,
      genderError,
      nameError,
      passError,
    });
    if (
      nameError === '' &&
      emailError === '' &&
      passError === '' &&
      ageError === '' &&
      confirmPassError === '' &&
      genderError === ''
    ) {
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

  const [load, setLoad] = useState(false);

  const navigation = useNavigation();

  const onPressSignUp = async () => {
    setLoad(true);
    try {
      const error = isErrors();
      if (error) {
        return;
      }
      const datas = {
        email: email,
        name: name,
        age: age,
        gender: gender,
        password: password,
        confirmPassword: confirmPassword,
        secret: 'yyy',
      };
      // const datas = {email, name, password, confirmPassword, age, gender};
      // console.log({email, name, password, confirmPassword, age, gender});
      const res = await auth.post('/auth/sign-up', datas);
      // { token, message: "user created successfully", success: true },
      const {message, token, user} = await res.data;
      ToastAndroid.show(message, ToastAndroid.SHORT);
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      navigation.dispatch(StackActions.replace('HomeScreen'));
    } catch (error: any) {
      console.log('error', error);
      const message =
        error.response.data.message ||
        'Something went wrong kindly try after some time';
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } finally {
      setLoad(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <ScrollView>
        <Text style={[styles.welcome]}>Welcome!</Text>
        <Text style={[styles.subHead]}>
          Register and start exploring your diabetes companion application.
        </Text>
        <CustomTextinput
          prefixIcon={person}
          placeholder="Enter User name"
          mainContStyle={[styles.inputStyle]}
          value={name}
          onChangeText={e => setName(e)}
        />
        <ErrorInputComp label={errors.nameError} />
        <CustomTextinput
          prefixIcon={mail}
          placeholder="Enter E-mail address"
          mainContStyle={[styles.inputStyle]}
          value={email}
          onChangeText={e => setEmail(e)}
        />
        <ErrorInputComp label={errors.emailError} />
        <CustomTextinput
          prefixIcon={today}
          placeholder="Enter Age"
          mainContStyle={[styles.inputStyle]}
          value={age + '' || ''}
          onChangeText={e => setAge(e)}
          maxLength={2}
        />
        <ErrorInputComp label={errors.ageError} />
        <DropdownComponent
          data={data}
          labelField={'label' as never}
          onChange={(e: {label: string; value: TGender}) => setGender(e.value)}
          valueField={'value' as never}
          additionalDropDownStyle={[styles.inputStyle]}
          value={gender}
        />
        <ErrorInputComp label={errors.genderError} />
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
        <ErrorInputComp label={errors.confirmPassError} />
        {/* <View style={[styles.tcMain]}>
          <TouchableOpacity onPress={() => setCheck(e => !e)}>
            {check ? (
              <CheckBoxChecked style={[styles.checkBoxStyles]} />
            ) : (
              <CheckBoxUnChecked style={[styles.checkBoxStyles]} />
            )}
          </TouchableOpacity>
          <Text style={[styles.tcStyle]}>
            I have read and agree to the{' '}
            <Text style={[styles.tcHighlight]}>Terms and conditions</Text> and{' '}
            <Text style={[styles.tcHighlight]}>Privacy policy.</Text>
          </Text>
        </View> */}
        <View style={styles.tcMain} />
        <CustomButton onPress={onPressSignUp} label="SIGNUP" load={load} />
        <Text style={[styles.tcMain]}>
          Do you already have an account?{' '}
          <Text
            style={[styles.tcHighlight]}
            onPress={() =>
              navigation.dispatch(StackActions.replace('LoginScreen'))
            }>
            Log in
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  safeArea: {flex: 1, padding: 10, paddingTop: 46, backgroundColor: 'white'},
  subHead: {fontSize: 16, marginBottom: 30, color: 'rgba(0, 11, 33, .3)'},
  inputStyle: {
    marginVertical: 5,
  },
  welcome: {
    fontWeight: 800,
    fontSize: 30,
    color: '#000B21',
  },
  checkBoxStyles: {
    marginRight: 8,
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
