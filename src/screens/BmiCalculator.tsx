import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {FC, useCallback, useState} from 'react';
import BackButtonHeader from '../components/BackButtonHeader';
import {DGHeading} from './DiabetesGuide';
import CustomTextinput from '../components/CustomTextinput';
import CustomButton from '../components/CustomButton';
import auth from '../utils/auth';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../Stack';
import AudioPlayer from '../components/AudioPlayer';
import {R2_AUDIO_URL} from '@env';
import {
  validateHeight,
  validateName,
  validateWeight,
} from '../utils/validations';
import {ErrorInputComp} from './Login';
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
  const [errors, setErrors] = useState({
    nameError: '',
    weightError: '',
    heightError: '',
  });

  const navigation = useNavigation<StackNavigation>();

  const clearState = () => {
    setWeight('');
    setName('');
    setHeight('');
  };

  const isError = () => {
    const nameError = validateName(name);
    const weightError = validateWeight(Number(weight));
    const heightError = validateHeight(Number(height));

    setErrors({
      heightError,
      nameError,
      weightError,
    });

    if (nameError === '' && weightError === '' && heightError === '') {
      return false;
    }

    return true;
  };
  useFocusEffect(
    useCallback(() => {
      return () => clearState();
    }, []),
  );
  const calculateBmi = async () => {
    setLoad(true);
    try {
      const error = isError();

      if (error) {
        return;
      }
      const res = await auth.post('/bmi', {name, height, weight});
      const {
        result: {id},
      } = await res.data;
      ToastAndroid.show('Bmi Calculated successfully', ToastAndroid.SHORT);
      navigation.navigate('BMIResultScreen', {id});
    } catch (error: any) {
      //console.log(error.response);
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
        <AudioPlayer url={`${R2_AUDIO_URL}calculatebuttonvoiceforbmi.mp3`} />

        <DGHeading head="Name" />
        <CustomTextinput
          placeholder="Enter your name"
          value={name}
          onChangeText={e => setName(e)}
        />
        <ErrorInputComp label={errors.nameError} />
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
        <ErrorInputComp label={errors.heightError} />
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
        <ErrorInputComp label={errors.weightError} />
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
