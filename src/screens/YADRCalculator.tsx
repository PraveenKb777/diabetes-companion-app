import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { FemaleSvg, MaleSvg } from '../assets/Svg';
import AudioPlayer from '../components/AudioPlayer';
import BackButtonHeader from '../components/BackButtonHeader';
import CustomButton from '../components/CustomButton';
import CustomTextinput from '../components/CustomTextinput';
import RadioButtons from '../components/RadioButtons';
import { StackNavigation } from '../Stack';
import auth from '../utils/auth';
import { Gender, validateAge, validateGender, validateName } from '../utils/validations';
import { MeasurementBox } from './BmiCalculator';
import { DGHeading } from './DiabetesGuide';
import { ErrorInputComp } from './Login';

// Choices
const PHYSICAL_ACTIVITY = ['Regular Exercise', 'Sedentary Lifestyle / inactive'];

const GENERATION_WITH_DIABETES = [
  '0 or 1 generations with diabetes',
  '2 or 3 non-consecutive generations with diabetes',
  '2 or 3 consecutive generations with diabetes',
];

const PARENTS_WITH_DIABETES = [
  'No parent with diabetes',
  'One parent with diabetes',
  'Both parents with diabetes',
];

const YADRCalculator = () => {
  const [load, setLoad] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [generationDiabetes, setGenerationDiabetes] = useState<number>();
  const [parentDiabetes, setParentDiabetes] = useState<number>();
  const [randomBloodGlucose, setRandomBloodGlucose] = useState('');
  const [bpSys, setBpSys] = useState('');
  const [bpDia, setBpDia] = useState('');
  const [physicalActivity, setPhysicalActivity] = useState<number>();

  const [errors, setErrors] = useState({
    nameError: '',
    ageError: '',
    genderError: '',
  });

  const navigation = useNavigation<StackNavigation>();

  const isError = () => {
    const nameError = validateName(name);
    const ageError = validateAge(Number(age));
    const genderError = validateGender(gender as Gender);

    setErrors({
      nameError,
      ageError,
      genderError,
    });

    if (nameError === '' && ageError === '' && genderError === '') {
      return false;
    }
    return true;
  };

  const clearState = () => {
    setName('');
    setAge('');
    setGender(undefined);
    setHeight('');
    setWeight('');
    setWaist('');
    setHip('');
    setGenerationDiabetes(undefined);
    setParentDiabetes(undefined);
    setRandomBloodGlucose('');
    setBpSys('');
    setBpDia('');
    setPhysicalActivity(undefined);
  };

  useFocusEffect(
    useCallback(() => {
      return () => clearState();
    }, []),
  );

  const calculateYADR = async () => {
    setLoad(true);
    try {
      const error = isError();
      if (error) return;

      const res = await auth.post('/yadr', {
        name,
        age: Number(age),
        gender,
        height: Number(height),
        weight: Number(weight),
        waist: Number(waist),
        hip: Number(hip),
        generation_diabetes: generationDiabetes,
        parent_diabetes: parentDiabetes,
        random_blood_glucose: Number(randomBloodGlucose),
        bp_sys: Number(bpSys),
        bp_dia: Number(bpDia),
        physical_activity: physicalActivity,
      });

      const {
        result: { id, yadrScore },
      } = res.data;

      ToastAndroid.show('YADR Calculated successfully', ToastAndroid.SHORT);
      navigation.navigate('YADRResultsScreen', { id, yadrScore });
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || 'Something went wrong, try again later';
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } finally {
      setLoad(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackButtonHeader
        subHeading="Young Adult Diabetes Risk Finder (YADR)"
        heading="Diabetes Risk Finder (DRF)"
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AudioPlayer url="https://pub-68f32a802c704337a2bc84aa92cc55a6.r2.dev/audio-files/CalculatebuttonvoiceforDiabetesriskfinder-YADR.mp3" />

        {/* Gender */}
        <DGHeading head="Gender" />
        <View style={styles.genderMain}>
          <TouchableOpacity
            style={[styles.genderItemCont, gender !== 'male' ? { opacity: 0.5 } : {}]}
            onPress={() => setGender('male')}>
            <MaleSvg />
            <Text style={styles.genderText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.genderItemCont, gender !== 'female' ? { opacity: 0.5 } : {}]}
            onPress={() => setGender('female')}>
            <FemaleSvg />
            <Text style={styles.genderText}>Female</Text>
          </TouchableOpacity>
        </View>
        <ErrorInputComp label={errors.genderError} />

        {/* Name */}
        <DGHeading head="Name" />
        <CustomTextinput placeholder="Enter your name" value={name} onChangeText={setName} />
        <ErrorInputComp label={errors.nameError} />

        {/* Age */}
        <DGHeading head="Age" />
        <CustomTextinput
          placeholder="Enter your age"
          keyboardType="numeric"
          value={age}
          maxLength={3}
          onChangeText={setAge}
        />
        <ErrorInputComp label={errors.ageError} />

        {/* Height & Weight */}
        <DGHeading head="Height & Weight" />
        <View style={styles.measurmentInput}>
          <CustomTextinput
            placeholder="Height"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
            mainContStyle={{ flex: 1 }}
          />
          <MeasurementBox unit="cm" />
          <CustomTextinput
            placeholder="Weight"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            mainContStyle={{ flex: 1, marginLeft: 10 }}
          />
          <MeasurementBox unit="kg" />
        </View>

        {/* Waist & Hip */}
        <DGHeading head="Waist & Hip" />
        <View style={styles.measurmentInput}>
          <CustomTextinput
            placeholder="Waist"
            keyboardType="numeric"
            value={waist}
            onChangeText={setWaist}
            mainContStyle={{ flex: 1 }}
          />
          <MeasurementBox unit="cm" />
          <CustomTextinput
            placeholder="Hip"
            keyboardType="numeric"
            value={hip}
            onChangeText={setHip}
            mainContStyle={{ flex: 1, marginLeft: 10 }}
          />
          <MeasurementBox unit="cm" />
        </View>

        {/* Generations with Diabetes */}
        <DGHeading head="Generations with diabetes" />
        <RadioButtons list={GENERATION_WITH_DIABETES} onChange={setGenerationDiabetes} value={generationDiabetes} />

        {/* Parents with Diabetes */}
        <DGHeading head="Parents with diabetes" />
        <RadioButtons list={PARENTS_WITH_DIABETES} onChange={setParentDiabetes} value={parentDiabetes} />

        {/* Random Blood Glucose */}
        <DGHeading head="Random Blood Glucose" />
        <CustomTextinput
          placeholder="Enter RBS"
          keyboardType="numeric"
          value={randomBloodGlucose}
          onChangeText={setRandomBloodGlucose}
        />
        <Text style={{ marginLeft: 10 }}>mg/dL</Text>

        {/* Blood Pressure */}
        <DGHeading head="Blood Pressure" />
        <View style={styles.bpRow}>
          <CustomTextinput
            placeholder="Sys"
            keyboardType="numeric"
            value={bpSys}
            onChangeText={setBpSys}
            mainContStyle={{ flex: 1 }}
          />
          <Text style={{ marginHorizontal: 6, fontSize: 18, alignSelf: 'center' }}>/</Text>
          <CustomTextinput
            placeholder="Dia"
            keyboardType="numeric"
            value={bpDia}
            onChangeText={setBpDia}
            mainContStyle={{ flex: 1 }}
          />
          <Text style={{ marginLeft: 10 }}>mmHg</Text>
        </View>

        {/* Physical Activity */}
        <DGHeading head="Physical Activity" />
        <RadioButtons list={PHYSICAL_ACTIVITY} onChange={setPhysicalActivity} value={physicalActivity} />

        <View style={{ height: 30 }} />
        <CustomButton label="CALCULATE" load={load} onPress={calculateYADR} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default YADRCalculator;

const styles = StyleSheet.create({
  genderMain: { flexDirection: 'row', justifyContent: 'space-between' },
  genderItemCont: {
    backgroundColor: '#EDDC46',
    borderRadius: 10,
    padding: 10,
    paddingVertical: 20,
    alignItems: 'center',
    width: '48%',
  },
  genderText: { color: '#fff', fontWeight: '700', marginTop: 30, fontSize: 16 },
  safeArea: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 16 },
  measurmentInput: { flexDirection: 'row', width: '100%', alignItems: 'center' },
  bpRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
});
