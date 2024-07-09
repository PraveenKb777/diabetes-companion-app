import {R2_URL} from '@env';
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  DimensionValue,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {DownArrowSvg} from '../assets/Svg';
import BackButtonHeader from '../components/BackButtonHeader';
import Loading from '../components/Loading';
import {BottomSheetNobullet} from '../context/BottomSheetContext';
import auth from '../utils/auth';
import {DGHeading} from './DiabetesGuide';

const findBodyGrade = (val: number) => {
  let color: string;
  let cat: string;
  let pos: DimensionValue;

  if (val < 18.5) {
    color = '#F3BC51';
    cat = 'Underweight';
    pos = '10%';
  } else if (val >= 18.5 && val <= 24.9) {
    color = '#1F8C0E';
    cat = 'Normal';
    pos = '35%';
  } else if (val >= 25 && val <= 29.9) {
    color = '#F47C0C';
    cat = 'Pre-obesity';
    pos = '60%';
  } else {
    color = '#EE3F3F';
    cat = 'Obesity';
    pos = '85%';
  }

  return {color, cat, pos};
};

type ParamList = {
  Detail: {
    id: string;
  };
};

interface IBmiData {
  name: string;
  height_cm: number;
  weight_kg: number;
  bmi_score: number;
  created_at: string;
}

const BMIResult = () => {
  const [load, setLoad] = useState(true);
  const [bmiData, setBmiData] = useState<IBmiData>();

  const {params} = useRoute<RouteProp<ParamList, 'Detail'>>();
  const getBmidata = useCallback(async () => {
    setLoad(true);
    try {
      const res = await auth.get(`/bmi/${params?.id || ''}`);
      const {result} = await res.data;
      setBmiData(result);
    } catch (error: any) {
      console.log(error.response);
      const msg = error?.response?.data?.message || 'Something went wrong';
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } finally {
      setLoad(false);
    }
  }, [params?.id]);
  useEffect(() => {
    getBmidata();
  }, [getBmidata]);

  if (load) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <BackButtonHeader heading="Body Mass Index (BMI) Result" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <DGHeading head="Body Mass Index (BMI)" />
        <BottomSheetNobullet
          item={{
            bullet: false,
            desc: 'Overall body fatness using height and weight.',
            head: 'Measures',
          }}
        />
        <BottomSheetNobullet
          item={{
            bullet: false,
            desc: 'Weight (kg) / Height (m²)',
            head: 'Formula',
          }}
        />
        <DGHeading head="Results" />
        <View style={styles.resultCont}>
          <Text style={styles.resultText}>
            BMI Score {'  '} :{'       '}
            <Text style={{color: findBodyGrade(bmiData?.bmi_score!).color}}>
              {bmiData?.bmi_score!}
            </Text>
          </Text>
          <Text style={styles.resultText}>
            Category {'     '} :{'       '}
            <Text style={{color: findBodyGrade(bmiData?.bmi_score!).color}}>
              {findBodyGrade(bmiData?.bmi_score!).cat}
            </Text>
          </Text>
          <View style={{height: 30}} />
          <DownArrowSvg
            style={{left: findBodyGrade(bmiData?.bmi_score!).pos}}
          />

          <View style={styles.indicatorCont}>
            <View
              style={{width: '25%', backgroundColor: '#F3BC51', height: '100%'}}
            />
            <View
              style={{width: '25%', backgroundColor: '#1F8C0E', height: '100%'}}
            />
            <View
              style={{width: '25%', backgroundColor: '#F47C0C', height: '100%'}}
            />
            <View
              style={{width: '25%', backgroundColor: '#EE3F3F', height: '100%'}}
            />
          </View>
          <View style={[styles.indicatorCont, {height: 'auto'}]}>
            <Text
              style={{
                width: '25%',
                color: '#F3BC51',
                height: '100%',
                textAlign: 'center',
              }}>
              Underweight
            </Text>
            <Text
              style={{
                width: '25%',
                color: '#1F8C0E',
                height: '100%',
                textAlign: 'center',
              }}>
              Normal
            </Text>
            <Text
              style={{
                width: '25%',
                color: '#F47C0C',
                height: '100%',
                textAlign: 'center',
              }}>
              Pre-obesity
            </Text>
            <Text
              style={{
                width: '25%',
                color: '#EE3F3F',
                height: '100%',
                textAlign: 'center',
              }}>
              Obesity
            </Text>
          </View>
        </View>

        <DGHeading head="Obesity Pyramid" />
        <Image src={`${R2_URL}bmipryamid.png`} style={styles.pryamid} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BMIResult;

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
  pryamid: {
    width: '100%',
    aspectRatio: 1,
    objectFit: 'fill',
  },
  resultCont: {
    padding: 16,
    elevation: 5,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  resultText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  indicatorCont: {
    height: 5,
    width: '100%',
    marginVertical: 10,
    borderRadius: 100,
    overflow: 'hidden',
    flexDirection: 'row',
  },
});
