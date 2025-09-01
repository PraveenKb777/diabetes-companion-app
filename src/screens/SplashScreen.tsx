/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import img from '../assets/img/splash_img.png';
import auth from '../utils/auth';
import {StackNavigation} from '../Stack';

import {VERSION} from '@env';

const SplashScreen = () => {
  const navigation = useNavigation<StackNavigation>();
  useEffect(() => {
    setTimeout(validate, 2000);
  }, []);

  const validate = async () => {
   const res = await  auth.get("/")
   console.log(( res).data);
   
    // setLoad(true);
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        //console.log('entered');
        navigation.dispatch(StackActions.replace('FirstTimeScreen'));
        return;
      }
      await auth.get('/auth/verify-token');
      navigation.dispatch(StackActions.replace('HomeScreen'));
    } catch (error: any) {
      await AsyncStorage.removeItem('token');
      navigation.dispatch(StackActions.replace('LoginScreen'));
      //console.log(error.response);
    } finally {
      //   setLoad(false);
    }
  };
  const url =
    'https://visiting-card-worker.praveen-cendrol.workers.dev/' as any;
  return (
    <SafeAreaView style={styles.safeArea}>
      <Image source={img} style={styles.logo} />
      <ActivityIndicator color={'#0075FF'} style={[styles.loader]} />
        
      <TouchableOpacity
        onPress={() => Linking.openURL(url)}
        style={[styles.loader, {bottom: 30}]}>
          <Text style={{textAlign: 'center'}}>
          App is for educational purpose only. {"\n"}For tests and treatment, follow your doctor’s advice.{' '}
        </Text>
        <Text style={{textAlign: 'center'}}>
          Crafted and Created by MGTECH{' '}
        </Text>
      </TouchableOpacity>
      <Text style={[styles.loader, {bottom: 10}, {textAlign: 'center'}]}>
        {VERSION}
      </Text>
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
    height: 300,
    width: 300,
  },
  loader: {
    // alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 100,
  },
});
