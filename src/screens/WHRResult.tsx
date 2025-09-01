import {R2_URL, R2_AUDIO_URL} from '@env';
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
import AudioPlayer from '../components/AudioPlayer';

const findBodyGrade = (val: number, gender: string = 'male') => {
  let color: string;
  let cat: string;
  let pos: DimensionValue;
  //console.log('gender', gender);
  if (gender === 'male') {
    if (val <= 0.9) {
      color = '#1F8C0E';
      cat = 'Low';
      pos = '15%';
    } else if (val > 0.9 && val <= 0.95) {
      color = '#F47C0C';
      cat = 'Moderate';
      pos = '48%';
    } else {
      color = '#EE3F3F';
      cat = 'High Risk';
      pos = '82%';
    }
  } else {
    if (val <= 0.8) {
      color = '#1F8C0E';
      cat = 'Low';
      pos = '15%';
    } else if (val > 0.8 && val <= 0.85) {
      color = '#F47C0C';
      cat = 'Moderate';
      pos = '48%';
    } else {
      color = '#EE3F3F';
      cat = 'High Risk';
      pos = '82%';
    }
  }

  return {color, cat, pos};
};

type ParamList = {
  Detail: {
    id: string;
  };
};

interface IWHhrData {
  name: string;
  gender: string;
  waist_cm: number;
  hip_cm: number;
  whr_score: number;
  created_at: string;
}

// whrFemale.png

// whrMale.png

const WHRResult = () => {
  const [load, setLoad] = useState(true);
  const [whrData, setWhrData] = useState<IWHhrData>();
  const [url, setUrl] = useState<string>();
  const {params} = useRoute<RouteProp<ParamList, 'Detail'>>();
  const getBmidata = useCallback(async () => {
    setLoad(true);
    try {
      const res = await auth.get(`/whr/${params?.id || ''}`);
      const {result} = await res.data;
      const gender = result.gender;
      const score = result.whr_score;
      let audioUrl = R2_AUDIO_URL;
      if (gender === 'male') {
        if (score > 0.95) {
          audioUrl += 'highriskmenwhr.mp3';
        } else if (score >= 0.81 && score <= 0.85) {
          audioUrl += 'moderateriskmenwhr.mp3';
        } else {
          audioUrl += 'lowriskmenwhr.mp3';
        }
      } else {
        if (score > 0.85) {
          audioUrl += 'highriskwomenwhr.mp3';
        } else if (score >= 0.81 && score <= 0.85) {
          audioUrl += 'moderateriskwomenwhr.mp3';
        } else {
          audioUrl += 'lowriskwomenwhr.mp3';
        }
      }
      setUrl(audioUrl);
      setWhrData(result);
    } catch (error: any) {
      //console.log(error.response);
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
      <BackButtonHeader
        heading={`Waist to Hip Ration (WHR)\nResult-${
          whrData?.gender === 'male' ? 'Male' : 'Female'
        }`}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <DGHeading head="Waist to Hip Ration (WHR) " />
        <BottomSheetNobullet
          item={{
            bullet: false,
            desc: 'Body fat distribution, specifically around the abdomen.',
            head: 'Measures',
          }}
        />
        <BottomSheetNobullet
          item={{
            bullet: false,
            desc: 'Waist circumference (cm) / Hip circumference (cm)',
            head: 'Formula',
          }}
        />
        <BottomSheetNobullet
          item={{
            bullet: false,
            desc: whrData?.gender === 'male' ? '0.90 or less' : '0.80 or less',
            head:
              whrData?.gender === 'male'
                ? 'Normal Range for men'
                : 'Normal Range for women',
          }}
        />
        <BottomSheetNobullet
          item={{
            bullet: false,
            desc: 'Identifies excess abdominal fat, a major risk factor for heart disease and diabetes, even within a normal BMI range.',
            head: 'Benefits',
          }}
        />
        <DGHeading head="Results" />
        <AudioPlayer url={url || ''} />
        <View style={{height: 20}} />
        <View style={styles.resultCont}>
          <Text style={styles.resultText}>
            WHR Score {'  '} :{'       '}
            <Text
              style={{
                color: findBodyGrade(whrData?.whr_score!, whrData?.gender)
                  .color,
              }}>
              {whrData?.whr_score!}
            </Text>
          </Text>
          <Text style={styles.resultText}>
            Risk Level {'     '} :{'       '}
            <Text
              style={{
                color: findBodyGrade(whrData?.whr_score!, whrData?.gender)
                  .color,
              }}>
              {findBodyGrade(whrData?.whr_score!, whrData?.gender).cat}
            </Text>
          </Text>
          <View style={{height: 30}} />
          <DownArrowSvg
            style={{
              left: findBodyGrade(whrData?.whr_score!, whrData?.gender).pos,
            }}
          />

          <View style={styles.indicatorCont}>
            <View
              style={{
                width: '33.33%',
                backgroundColor: '#1F8C0E',
                height: '100%',
              }}
            />
            <View
              style={{
                width: '33.33%',
                backgroundColor: '#F47C0C',
                height: '100%',
              }}
            />
            <View
              style={{
                width: '33.33%',
                backgroundColor: '#EE3F3F',
                height: '100%',
              }}
            />
          </View>
          <View style={[styles.indicatorCont, {height: 'auto'}]}>
            <Text
              style={{
                width: '33.33%',
                color: '#1F8C0E',
                height: '100%',
                textAlign: 'center',
              }}>
              Low Risk
            </Text>
            <Text
              style={{
                width: '33.33%',
                color: '#F47C0C',
                height: '100%',
                textAlign: 'center',
              }}>
              Moderate
            </Text>
            <Text
              style={{
                width: '33.33%',
                color: '#EE3F3F',
                height: '100%',
                textAlign: 'center',
              }}>
              High Risk
            </Text>
          </View>
        </View>

        <DGHeading head={whrData?.gender === 'male' ? 'Male' : 'Female'} />
        <Image
          src={`${R2_URL}${
            whrData?.gender === 'male' ? 'whrMale.png' : 'whrFemale.png'
          }`}
          style={styles.pryamid}
        />
        <BottomSheetNobullet item={{bullet:false,
          head:"Source",desc:"World Health Organization. (2011). Waist circumference and waist-hip ratio: Report of a WHO expert consultation. World Health Organization (WHO)."
        }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WHRResult;

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
