import {R2_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Dimensions, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomButton from '../components/CustomButton';
import {StackNavigation} from '../Stack';
import AudioPlayer from '../components/AudioPlayer';
import {User} from '../types/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppSelector} from '../redux/hooks/hooks';

const RiskFinder = () => {
  const navigation = useNavigation<StackNavigation>();
  const {user} = useAppSelector(e => e.userReducer);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={[styles.scrollContent]}>
        <Image src={`${R2_URL}riskfindermain.png`} style={[styles.mainImg]} />
        <View style={{height: 40}} />
        <CustomButton
          label="Body Mass Index (BMI)"
          onPress={() => navigation.navigate('BmiCalculatorScreen')}
        />
        <View style={{height: 16}} />

        <CustomButton
          label="Waist to hip ratio (WHR)"
          onPress={() => navigation.navigate('WhrCalculatorScreen')}
        />
        <View style={{height: 16}} />
        <CustomButton
          label="Diabetes risk finder(DRF)"
          subLable="Young Adult Diabetes Risk Finder(YADRF)"
          onPress={() => navigation.navigate('DRFCalculatorScreen')}
        />
        {user && user.userType === 'doctor' ? (
          <>
            <View style={{height: 16}} />

            <CustomButton
              label={'Maturity Onset Diabetes\nof the Young (MODY) Risk finder'}
              onPress={() => navigation.navigate('MODYCalculatorScreen')}
            />
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RiskFinder;

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#fff'},
  mainImg: {
    width: '100%',
    aspectRatio: 1,
  },
  scrollContent: {
    padding: 16,
    height: Dimensions.get('window').height - 50,
    justifyContent: 'center',
  },
});
