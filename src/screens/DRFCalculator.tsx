import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {FemaleSvg, MaleSvg} from '../assets/Svg';
import AudioPlayer from '../components/AudioPlayer';
import BackButtonHeader from '../components/BackButtonHeader';
import CustomButton from '../components/CustomButton';
import CustomTextinput from '../components/CustomTextinput';
import RadioButtons from '../components/RadioButtons';
import {StackNavigation} from '../Stack';
import auth from '../utils/auth';
import {
  Gender,
  validateAge,
  validateGender,
  validateName,
  validateWaist,
} from '../utils/validations';
import {MeasurementBox} from './BmiCalculator';
import {DGHeading} from './DiabetesGuide';
import {ErrorInputComp} from './Login';

const PHYSICAL_ACTIVITY = [
  'Vigorous exercise or strenuous work',
  'Moderate exercise (work/home)',
  'Mild exercise (work/home)',
  'No exercise & sedentary work/home',
];
const GENERATION = ['No family history', 'Either parent', 'Both parents'];

const DRFCalculator = () => {
  const [load, setLoad] = useState(false);
  const [name, setName] = useState('');
  const [waist, setWaist] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>();
  const [physical_activity, setPhysicalActivity] = useState<number>();
  const [family_history, setFamilyHistory] = useState<number>();
  const [errors, setErrors] = useState({
    nameError: '',
    waistError: '',
    ageError: '',
    genderError: '',
    familyHistoryError: '',
    physicaActivityError: '',
  });

  const isError = () => {
    const nameError = validateName(name);
    const waistError = validateWaist(Number(waist));
    const ageError = validateAge(Number(age));
    const genderError = validateGender(gender as Gender);
    const physicaActivityError =
      physical_activity === undefined ? 'Kindly select one option' : '';
    const familyHistoryError =
      family_history === undefined ? 'Kindly select one option' : '';

    setErrors({
      nameError,
      waistError,
      genderError,
      ageError,
      physicaActivityError,
      familyHistoryError,
    });

    if (
      nameError === '' &&
      waistError === '' &&
      ageError === '' &&
      genderError === '' &&
      physicaActivityError === '' &&
      familyHistoryError === ''
    ) {
      return false;
    }

    return true;
  };

  const navigation = useNavigation<StackNavigation>();

  const clearState = () => {
    setAge('');
    setFamilyHistory(undefined);
    setGender(undefined);
    setName('');
    setWaist('');
    setPhysicalActivity(undefined);
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
      const res = await auth.post('/drf', {
        name,
        age,
        physical_activity,
        family_history,
        waist,
        gender,
      });
      const {
        result: {id},
      } = await res.data;
      ToastAndroid.show('DRF Calculated successfully', ToastAndroid.SHORT);
      navigation.navigate('DRFResultsScreen', {id});
    } catch (error: any) {
      //console.log(error.response, error);
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
      <BackButtonHeader subHeading="Young Adult Diabetes Risk Finder(YADRF)" heading="Diabetes Risk Finder (DRF)" />
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.scrollContent}>
        <AudioPlayer url="https://pub-68f32a802c704337a2bc84aa92cc55a6.r2.dev/audio-files/calculatebuttonvoiceforisk%20finder.mp3" />
        <DGHeading head="Gender" />
        <View style={[styles.genderMain]}>
          <TouchableOpacity
            style={[
              styles.genderItemCont,
              gender !== 'male' ? {opacity: 0.5} : {},
            ]}
            onPress={() => setGender('male')}>
            <MaleSvg />
            <Text style={styles.genderText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderItemCont,
              gender !== 'female' ? {opacity: 0.5} : {},
            ]}
            onPress={() => setGender('female')}>
            <FemaleSvg />
            <Text style={styles.genderText}>Female</Text>
          </TouchableOpacity>
        </View>
        <ErrorInputComp label={errors.genderError} />
        <DGHeading head="Name" />
        <CustomTextinput
          placeholder="Enter your name"
          value={name}
          onChangeText={e => setName(e)}
        />
        <ErrorInputComp label={errors.nameError} />
        <DGHeading head="Age" />
        <CustomTextinput
          placeholder="Enter your age"
          keyboardType="numeric"
          mainContStyle={{flex: 1}}
          value={age}
          maxLength={3}
          onChangeText={e => setAge(e)}
        />
        <ErrorInputComp label={errors.ageError} />
        <DGHeading head="Waist" />
        <View style={styles.measurmentInput}>
          <CustomTextinput
            placeholder="Enter your waist size"
            keyboardType="numeric"
            mainContStyle={{flex: 1}}
            value={waist}
            maxLength={3}
            onChangeText={e => setWaist(e)}
          />
          <MeasurementBox unit="cm" />
        </View>
        <ErrorInputComp label={errors.waistError} />
        <DGHeading head="How would you describe your level of physical activity?" />
        <RadioButtons
          list={PHYSICAL_ACTIVITY}
          onChange={e => setPhysicalActivity(e)}
          value={physical_activity}
        />
        <ErrorInputComp label={errors.physicaActivityError} />
        <DGHeading head="Do either of your Parents have diabetes?" />
        <RadioButtons
          list={GENERATION}
          value={family_history}
          onChange={e => setFamilyHistory(e)}
        />
        <ErrorInputComp label={errors.familyHistoryError} />
        <View style={{height: 30}} />
        <CustomButton label="CALCULATE" load={load} onPress={calculateBmi} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DRFCalculator;

const styles = StyleSheet.create({
  genderMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderItemCont: {
    backgroundColor: '#EDDC46',
    borderRadius: 10,
    padding: 10,
    paddingVertical: 20,
    alignItems: 'center',
    width: '48%',
  },
  genderText: {
    color: '#fff',
    fontWeight: '700',
    marginTop: 30,
    fontSize: 16,
  },
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
