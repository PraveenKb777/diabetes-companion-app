import {R2_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomButton from '../components/CustomButton';
import {StackNavigation} from '../Stack';
import AudioPlayer from '../components/AudioPlayer';

const RiskFinder = () => {
  const navigation = useNavigation<StackNavigation>();
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
          label="Diabetes risk finder"
          onPress={() => navigation.navigate('DRFCalculatorScreen')}
        />
        <View style={{height: 16}} />
        <CustomButton
          label="MODY FINDER"
          onPress={() => navigation.navigate('MODYCalculatorScreen')}
        />
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
