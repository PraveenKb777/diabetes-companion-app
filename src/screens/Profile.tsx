import {R2_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {StackNavigation} from '../Stack';
import {
  FeedBackSvg,
  ImportantSvg,
  KeySvg,
  LogSvg,
  LogoutSvg,
  Settings,
} from '../assets/Svg';
import lock from '../assets/icons/lock.png';
import mail from '../assets/icons/mail.png';
import today from '../assets/icons/today.png';
import visibility from '../assets/icons/visibility.png';
import BackButtonHeader from '../components/BackButtonHeader';
import CustomButton from '../components/CustomButton';
import CustomTextinput from '../components/CustomTextinput';
import ProfileButton from '../components/ProfileButton';
import auth from '../utils/auth';
import {validateConfirmPassword, validatePassword} from '../utils/validations';
import {DGHeading} from './DiabetesGuide';
import {ErrorInputComp} from './Login';

export interface IUser {
  id: string;
  name: string;
  email: string;
  img?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
}

const Profile = () => {
  const [user, setUser] = useState<IUser>();
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassVis, setOldPassVis] = useState(true);
  const [passVis, setPassVis] = useState(true);
  const [conPassVis, setConPassVis] = useState(true);
  const [changePassVis, setChangePassVis] = useState(false);
  const [load, setLoad] = useState(false);

  const [errors, setErrors] = useState({
    currPasswordError: '',
    passwordError: '',
    confirmPasswordError: '',
  });
  const navigation = useNavigation<StackNavigation>();
  // useEffect(() => {
  //   getUser();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, []),
  );

  const isError = () => {
    const currPasswordError = validatePassword(oldPassword);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(
      password,
      confirmPassword,
    );

    setErrors({confirmPasswordError, currPasswordError, passwordError});

    if (
      currPasswordError === '' &&
      passwordError === '' &&
      confirmPasswordError === ''
    ) {
      return false;
    }
    return true;
  };

  const changePassword = async () => {
    setLoad(true);
    try {
      const error = isError();
      if (error) {
        return;
      }
      const res = await auth.post('/auth/change-password', {
        password,
        confirmPassword,
        oldPassword,
      });
      const data = await res.data;

      ToastAndroid.show(data.message, ToastAndroid.SHORT);
      setChangePassVis(false);
    } catch (error: any) {
      //console.log(error);
      const msg =
        error.response.data.message ||
        'Something went wrong try again after some time';
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } finally {
      setLoad(false);
    }
  };

  const getUser = async () => {
    const u = JSON.parse((await AsyncStorage.getItem('user')) || '');
    setUser(u);
  };

  const val = useSharedValue(90);

  const maxHeight = useAnimatedStyle(() => {
    return {
      height: withTiming(val.value),
    };
  });

  // useEffect(() => {

  //   if (!changePassVis) {
  //     clearPassState();
  //   }
  // }, [changePassVis, val]);
  const passwordBtnRef = useRef<TextInput>(null);

  React.useEffect(() => {
    val.value = withTiming(changePassVis ? 420 : 90, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });

    if (!changePassVis) {
      clearPassState();
      Keyboard.dismiss();
    } else {
      passwordBtnRef.current?.focus();
    }
  }, [changePassVis, val]);

  const clearPassState = () => {
    setPassVis(true);
    setOldPassVis(true);
    setConPassVis(true);
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
    setErrors({
      currPasswordError: '',
      passwordError: '',
      confirmPasswordError: '',
    });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <BackButtonHeader heading="Profile" />
      <ScrollView style={{padding: 16}} keyboardShouldPersistTaps="always">
        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.profileImg}
            src={user?.img || `${R2_URL}100.png`}
          />
          <View style={{width: 30}} />
          <DGHeading head={user?.name || ''} />
        </View>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.20)',
            height: 1,
            width: '100%',
            marginVertical: 16,
            alignSelf: 'center',
          }}
        />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={mail} />
          <View style={{width: 10}} />

          <Text>{user?.email}</Text>
        </View>
        <View style={{height: 16}} />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={today} />
          <View style={{width: 10}} />

          <Text>{user?.age} years old</Text>
        </View>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.20)',
            height: 1,
            width: '100%',
            marginVertical: 16,
            alignSelf: 'center',
          }}
        />
        <ProfileButton
          label="Profile Settings"
          Svg={Settings}
          onPress={() => navigation.navigate('ProfileSettingScreen' as never)}
        />
        <ProfileButton
          label="My Log"
          Svg={LogSvg}
          onPress={() => navigation.navigate('MyLogScreen')}
        />
        <ProfileButton
          label="Importance & Disclaimer"
          Svg={ImportantSvg}
          onPress={() =>
            navigation.navigate('AppicationDisclimarScreen' as never)
          }
        />
        <ProfileButton
          label="Give Feedback"
          Svg={FeedBackSvg}
          onPress={() => navigation.navigate('FeedBackScreen')}
        />
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.20)',
            height: 1,
            width: '100%',
            marginVertical: 16,
            alignSelf: 'center',
          }}
        />
        <Animated.View
          style={[
            {
              borderColor: 'rgba(0, 0, 0, 0.20)',
              borderWidth: 1,
              padding: 5,
              overflow: 'hidden',
            },
            maxHeight,
          ]}>
          <ProfileButton
            label="Change Password"
            Svg={KeySvg}
            active={changePassVis}
            onPress={() => {
              setChangePassVis(e => !e);
            }}
          />
          <View style={{height: 10}} />
          <CustomTextinput
            placeholder="Enter old password"
            prefixIcon={lock}
            ref={passwordBtnRef}
            suffixIcon={visibility}
            value={oldPassword}
            secureTextEntry={oldPassVis}
            suffixIconTap={() => setOldPassVis(e => !e)}
            onChangeText={e => setOldPassword(e)}
          />
          <ErrorInputComp label={errors.currPasswordError} />
          <Text style={{marginVertical: 16}}>
            Please enter and confirm your new password.
          </Text>
          <CustomTextinput
            placeholder="Enter new password"
            prefixIcon={lock}
            suffixIcon={visibility}
            value={password}
            secureTextEntry={passVis}
            onChangeText={e => setPassword(e)}
            suffixIconTap={() => setPassVis(e => !e)}
          />
          <ErrorInputComp label={errors.passwordError} />
          <View style={{height: 20}} />
          <CustomTextinput
            placeholder="Re-enter new password"
            prefixIcon={lock}
            suffixIcon={visibility}
            value={confirmPassword}
            secureTextEntry={conPassVis}
            suffixIconTap={() => setConPassVis(e => !e)}
            onChangeText={e => setConfirmPassword(e)}
          />
          <ErrorInputComp label={errors.confirmPasswordError} />
          <View style={{height: 20, flex: 1}} />

          <CustomButton
            label="Change password"
            onPress={changePassword}
            load={load}
          />
          <View style={{height: 10}} />
        </Animated.View>
        <View style={{height: 10}} />

        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.20)',
            height: 1,
            width: '100%',
            marginVertical: 16,
            alignSelf: 'center',
          }}
        />
        <ProfileButton
          Svg={LogoutSvg}
          label="Log Out"
          btnStyle="danger"
          onPress={async () => {
            await AsyncStorage.clear();
            navigation.reset({routes: [{name: 'SplashScreen'}]});
          }}
        />
        <View style={{height: 30}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  profileImg: {
    width: (width * 30) / 100,
    aspectRatio: 1,
  },
});
