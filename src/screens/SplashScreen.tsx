/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ActivityIndicator, Image, SafeAreaView, StyleSheet} from 'react-native';
import img from '../assets/img/splash_img.jpeg';
import auth from '../utils/auth';

const SplashScreen = () => {
  const navigation = useNavigation();
  //   const [load, setLoad] = useState(true);
  useEffect(() => {
    setTimeout(validate, 2000);
  }, []);

  const validate = async () => {
    // setLoad(true);
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        console.log('entered');
        navigation.dispatch(StackActions.replace('FirstTimeScreen'));
        return;
      }
      await auth.get('/auth/verify-token');
      navigation.dispatch(StackActions.replace('HomeScreen'));
    } catch (error: any) {
      await AsyncStorage.removeItem('token');
      navigation.dispatch(StackActions.replace('LoginScreen'));
      console.log(error.response);
    } finally {
      //   setLoad(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image source={img} style={styles.logo} />
      <ActivityIndicator color={'#0075FF'} style={[styles.loader]} />
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    // flexDirection: 'row',
  },
  logo: {
    height: 200,
    width: 200,
  },
  loader: {
    // alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 30,
  },
});
