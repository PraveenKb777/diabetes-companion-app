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
import {BottomSheetYesbullet} from '../context/BottomSheetContext';
import auth from '../utils/auth';
import {DGHeading} from './DiabetesGuide';
const findBodyGrade = (val: number) => {
  let color: string;
  let cat: string;
  let pos: DimensionValue;
  let image: string;

  if (val < 30) {
    color = '#1F8C0E';
    cat = 'Low';
    pos = '15%';
    image = 'happy.png';
  } else if (val >= 31 && val < 61) {
    color = '#F47C0C';
    cat = 'Moderate';
    pos = '48%';
    image = 'sad.png';
  } else {
    color = '#EE3F3F';
    cat = 'High';
    pos = '82%';
    image = 'verySad.png';
  }

  return {color, cat, pos, image};
};

type ParamList = {
  Detail: {
    id: string;
  };
};

interface IDRFData {
  id: string;
  mody_score: number;
}

// whrFemale.png

// whrMale.png

const ModyResults = () => {
  const [load, setLoad] = useState(true);
  const [drfData, setDrfData] = useState<IDRFData>();
  const {params} = useRoute<RouteProp<ParamList, 'Detail'>>();
  const getBmidata = useCallback(async () => {
    setLoad(true);
    try {
      const res = await auth.get(`/mody/${params?.id || ''}`);
      const {result} = await res.data;
      setDrfData(result);
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
      <BackButtonHeader heading={'MODY Risk Finder Result'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          src={`${R2_URL}${findBodyGrade(drfData?.mody_score!).image}`}
          style={{width: '100%', aspectRatio: 1}}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            color: '#000',
            textAlign: 'center',
          }}>
          You are at{' '}
          <Text style={{color: findBodyGrade(drfData?.mody_score!).color}}>
            {findBodyGrade(drfData?.mody_score!).cat}
          </Text>{' '}
          Risk!
        </Text>
        <DGHeading head="Results" />
        <View style={{height: 20}} />
        <View style={styles.resultCont}>
          <Text style={styles.resultText}>
            DRF Score {'    '} :{'       '}
            <Text style={{color: findBodyGrade(drfData?.mody_score!).color}}>
              {drfData?.mody_score!}
            </Text>
          </Text>
          <Text style={styles.resultText}>
            Risk Level {'     '} :{'       '}
            <Text style={{color: findBodyGrade(drfData?.mody_score!).color}}>
              {findBodyGrade(drfData?.mody_score!).cat}
            </Text>
          </Text>
          <View style={{height: 30}} />
          <DownArrowSvg
            style={{left: findBodyGrade(drfData?.mody_score!).pos}}
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
        <DGHeading head="Recommendations" />
        <Text style={{fontStyle: 'italic', color: '#000', fontSize: 16}}>
          {drfData?.mody_score! < 30
            ? 'Maintain a healthy lifestyle and monitor for any new symptoms.'
            : drfData?.mody_score! <= 50
            ? 'Schedule a health checkup and consult with a healthcare provider for further evaluation.'
            : 'Seek immediate medical advice and undergo a comprehensive health assessment.'}
        </Text>
        <View style={{height: 20}} />
        <BottomSheetYesbullet
          item={{
            bullet: true,
            head: 'Important Disclaimers',
            desc: [
              'This assessment provides information only and not diagnosis.',
              'Seek professional diagnosis and management.',
              'Results vary with response accuracy.',
              'Additional testing may be necessary.',
              'Prioritize healthy habits and regular health checkups.',
              'Your data will be kept confidential and used only for this assessment.',
            ],
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ModyResults;

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
