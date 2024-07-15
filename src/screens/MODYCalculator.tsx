//

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import BackButtonHeader from '../components/BackButtonHeader';
import CustomButton from '../components/CustomButton';
import CustomTextinput from '../components/CustomTextinput';
import RadioButtons from '../components/RadioButtons';
import {StackNavigation} from '../Stack';
import auth from '../utils/auth';
import {MeasurementBox} from './BmiCalculator';
import {DGHeading} from './DiabetesGuide';

const PARENT_HISTORY = ['No parent with diabetes', 'One parent with diabetes'];
const GENERATION = [
  '0 or 1 generations with diabetes',
  '2 or 3 generations with diabetes',
];

const HBA1C = [' ≤7.5 %', '>7.5 %'];

const OPTIONS = ['Presence', 'Absence'];

const MODYCalculator = () => {
  const [load, setLoad] = useState(false);
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [parent_history, setParentHistory] = useState<number>();
  const [family_history, setFamilyHistory] = useState<number>();
  const [hba1c, setHba1c] = useState<number>();
  const [auto_anitbodie, setAutoAnitbodie] = useState<number>();
  const [ketoacidosis, setKetoacidosis] = useState<number>();
  const [complications, setComplications] = useState<number>();
  const navigation = useNavigation<StackNavigation>();

  const clearState = () => {
    setAge('');
    setFamilyHistory(undefined);
    setName('');
    setHeight('');
    setWeight('');
    setParentHistory(undefined);
    setHba1c(undefined);
    setAutoAnitbodie(undefined);
    setKetoacidosis(undefined);
    setComplications(undefined);
  };

  useFocusEffect(
    useCallback(() => {
      return () => clearState();
    }, []),
  );
  const calculateBmi = async () => {
    setLoad(true);
    try {
      const res = await auth.post('/mody', {
        name,
        age,
        parent_history,
        family_history,
        height,
        weight,
        auto_anitbodie,
        hba1c,
        ketoacidosis,
        complications,
      });
      const {
        result: {id},
      } = await res.data;
      ToastAndroid.show('MODY Calculated successfully', ToastAndroid.SHORT);
      navigation.navigate('ModyResultsScreen', {id});
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

  const bmiCalculator = (h: number, w: number) => {
    const meterHeight = h / 100;
    const bmi = w / (meterHeight * meterHeight);
    return parseFloat(bmi.toFixed(2));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackButtonHeader heading="MODY Risk Finder " />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="always">
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
        <DGHeading head="Height" />
        <View style={styles.measurmentInput}>
          <CustomTextinput
            placeholder="Enter your height size"
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
            placeholder="Enter your weight size"
            keyboardType="numeric"
            mainContStyle={{flex: 1}}
            value={weight}
            maxLength={3}
            onChangeText={e => setWeight(e)}
          />
          <MeasurementBox unit="kg" />
        </View>
        <DGHeading
          head={`BMI Score : ${bmiCalculator(+height, +weight) || '0'}`}
        />
        <DGHeading head="Generations with diabetes?" />
        <RadioButtons
          list={GENERATION}
          value={family_history}
          onChange={e => setFamilyHistory(e)}
        />
        <DGHeading head="Do either of your Parents have diabetes?" />
        <RadioButtons
          list={PARENT_HISTORY}
          onChange={e => setParentHistory(e)}
          value={parent_history}
        />
        <DGHeading head="HbA1C (%)" />
        <RadioButtons list={HBA1C} onChange={e => setHba1c(e)} value={hba1c} />
        <DGHeading head="Are auto antibodies (IAA/GAD- Insulin Auto Antibodies/ Glutamic Acid Decarboxylase) present in your blood? " />
        <RadioButtons
          list={OPTIONS}
          onChange={e => setAutoAnitbodie(e)}
          value={auto_anitbodie}
        />
        <DGHeading head="Have you diagnosed with Ketoacidosis?" />
        <RadioButtons
          list={OPTIONS}
          onChange={e => setKetoacidosis(e)}
          value={ketoacidosis}
        />
        <DGHeading head="Do you have any of the following complications? (Glycosuria or  Macrosomia and Neonatal hypoglycemia or Renal cysts or Urogenital abnormalities or Exocrine Insufficiency)" />
        <RadioButtons
          list={OPTIONS}
          onChange={e => setComplications(e)}
          value={complications}
        />

        <View style={{height: 30}} />
        <CustomButton label="CALCULATE" load={load} onPress={calculateBmi} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MODYCalculator;

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
