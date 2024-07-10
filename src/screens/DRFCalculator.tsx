import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import BackButtonHeader from '../components/BackButtonHeader';
import {DGHeading} from './DiabetesGuide';
import CustomTextinput from '../components/CustomTextinput';
import {MeasurementBox} from './BmiCalculator';
import CustomButton from '../components/CustomButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../Stack';
import auth from '../utils/auth';
import {FemaleSvg, MaleSvg} from '../assets/Svg';
import AudioPlayer from '../components/AudioPlayer';
import {R2_AUDIO_URL} from '@env';
import RadioButtons from '../components/RadioButtons';

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
      console.log(error.response, error);
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
      <BackButtonHeader heading="Diabetes Risk Finder (DRF)" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
        <DGHeading head="Name" />
        <CustomTextinput
          placeholder="Enter your name"
          value={name}
          onChangeText={e => setName(e)}
        />
        <DGHeading head="Age" />
        <CustomTextinput
          placeholder="Enter your age"
          keyboardType="numeric"
          mainContStyle={{flex: 1}}
          value={age}
          maxLength={3}
          onChangeText={e => setAge(e)}
        />
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
        <DGHeading head="How would you describe your level of physical activity?" />
        <RadioButtons
          list={PHYSICAL_ACTIVITY}
          onChange={e => setPhysicalActivity(e)}
          value={physical_activity}
        />
        <DGHeading head="Generations with diabetes?" />
        <RadioButtons
          list={GENERATION}
          value={family_history}
          onChange={e => setFamilyHistory(e)}
        />

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
