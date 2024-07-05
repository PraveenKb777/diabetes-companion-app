import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import BackButtonHeader from '../components/BackButtonHeader';
import {DGHeading} from './DiabetesGuide';
import CustomTextinput from '../components/CustomTextinput';
import CustomButton from '../components/CustomButton';
import auth from '../utils/auth';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../Stack';

export const MeasurementBox: FC<{unit: string}> = ({unit}) => {
  return (
    <View style={[styles.measurment]}>
      <Text style={styles.measurementText}>{unit}</Text>
    </View>
  );
};

const BmiCalculator = () => {
  const [load, setLoad] = useState(false);
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const navigation = useNavigation<StackNavigation>();
  const calculateBmi = async () => {
    setLoad(true);
    try {
      const res = await auth.post('/bmi', {name, height, weight});
      const {
        result: {id},
      } = await res.data;
      ToastAndroid.show('Bmi Calculated successfully', ToastAndroid.SHORT);
      navigation.navigate('BMIResultScreen', {id});
    } catch (error: any) {
      console.log(error.response);
      const msg =
        error?.response?.data?.message ||
        'Something went wrong try after some time';
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } finally {
      setLoad(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackButtonHeader heading="Body Mass Index (BMI)" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <DGHeading head="Name" />
        <CustomTextinput
          placeholder="Enter your name"
          value={name}
          onChangeText={e => setName(e)}
        />
        <DGHeading head="Height" />
        <View style={styles.measurmentInput}>
          <CustomTextinput
            placeholder="Enter your height"
            keyboardType="numeric"
            mainContStyle={{flex: 1}}
            value={height}
            maxLength={3}
            onChangeText={e => setHeight(e)}
          />
          <MeasurementBox unit="cm" />
        </View>

        <DGHeading head="Weight" />

        <View style={styles.measurmentInput}>
          <CustomTextinput
            placeholder="Enter your weight"
            keyboardType="numeric"
            mainContStyle={{flex: 1}}
            value={weight}
            maxLength={3}
            onChangeText={e => setWeight(e)}
          />
          <MeasurementBox unit="kg" />
        </View>
        <View style={{height: 30}} />
        <CustomButton label="CALCULATE" load={load} onPress={calculateBmi} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BmiCalculator;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
  },
  measurmentInput: {
    flexDirection: 'row',
    width: '100%',
  },
  measurment: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 11, 33, 0.50)',
    padding: 16,
    marginLeft: 16,
  },

  measurementText: {
    color: '#000',
    fontWeight: '700',
  },
});
