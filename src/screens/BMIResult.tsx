import {R2_URL} from '@env';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
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
import {R2_AUDIO_URL} from '@env';
import AudioPlayer from '../components/AudioPlayer';
import {StackNavigation} from '../Stack';
import { NoteComp } from './CMP';
const findBodyGrade = (val: number) => {
  let color: string;
  let cat: string;
  let pos: DimensionValue;

  if (val < 18.5) {
    color = '#F3BC51';
    cat = 'Underweight';
    pos = '10%';
  } else if (val >= 18.5 && val <= 22.9) {
    color = '#1F8C0E';
    cat = 'Normal';
    pos = '35%';
  } else if (val >= 23 && val <= 24.9) {
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
  const [url, setUrl] = useState<string>();
  const {params} = useRoute<RouteProp<ParamList, 'Detail'>>();
  const navigation = useNavigation<StackNavigation>();
  const getBmidata = useCallback(async () => {
    setLoad(true);
    try {
      const res = await auth.get(`/bmi/${params?.id || ''}`);
      const {result} = await res.data;
      let audioFile = R2_AUDIO_URL;
      if (result.bmi_score >= 30) {
    
        audioFile = audioFile + 'obesityiibmi.mp3';
      } else if (result.bmi_score >= 25 && result.bmi_score <= 29.9) {
        audioFile = audioFile + 'obesityibmi.mp3';
      } else if (result.bmi_score >= 23 && result.bmi_score <= 24.9) {
        audioFile = audioFile + 'OverweightBMI.mp3';
      } else if (result.bmi_score >= 18.5 && result.bmi_score <= 22.9) {
        audioFile = audioFile + 'normalweightbmi.mp3';
      } else {
        audioFile = audioFile + 'underweightbmi.mp3';
      }
      setUrl(audioFile);
      setBmiData(result);
    } catch (error: any) {
      //console.log(error.response);
      const msg = error?.response?.data?.message || 'Something went wrong';

      ToastAndroid.show(msg, ToastAndroid.SHORT);
      navigation.goBack();
    } finally {
      setLoad(false);
    }
  }, [navigation, params?.id]);
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
        <BottomSheetNobullet
          item={{
            bullet: false,
            desc: '18.5-24.9 kg/m²',
            head: 'Normal Range',
          }}
        />
        <BottomSheetNobullet
          item={{
            bullet: false,
            desc: 'Assesses risk for weight-related health issues like heart disease, diabetes and some cancers.',
            head: 'Benefits',
          }}
        />
        <DGHeading head="Results" />
        <AudioPlayer url={url || ''} />
        <View style={{height: 20}} />
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
              Overweight
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
        <Image src={`${R2_URL}bmi_new.png`} style={styles.pryamid} />
        <BottomSheetNobullet
          item={{
            bullet: false,
            desc: 'WHO expert consultation. (2004). Appropriate body-mass index for Asian populations and its implications for policy and intervention strategies. The Lancet, 363(9403), 157–163. https://doi.org/https://doi.org/10.1016/S0140-6736(03)15268-3',
            head: 'Source',
          }}
        />
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
