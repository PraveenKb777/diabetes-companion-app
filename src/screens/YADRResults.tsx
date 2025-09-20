// YADRREsults

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
import {
  BottomSheetNobullet,
  BottomSheetYesbullet,
} from '../context/BottomSheetContext';
import auth from '../utils/auth';
import {DGHeading} from './DiabetesGuide';
import AudioPlayer from '../components/AudioPlayer';
import ResultGuide from '../components/ResultGuide';
// YADRREsults.tsx

const findBodyGrade = (val: number) => {
  let color: string;
  let cat: string;
  let pos: DimensionValue;
  let image: string;
  let url: string =
    'https://pub-68f32a802c704337a2bc84aa92cc55a6.r2.dev/audio-files/';

  if (val <= 20) {
    color = '#1F8C0E'; // green
    cat = 'Low Risk';
    pos = '10%';
    image = 'happy.png';
    url += 'Lowdiabetesriskfinder-YADR.mp3';
  } else if (val >= 21 && val <= 40) {
    color = '#F47C0C'; // orange
    cat = 'Moderate Risk';
    pos = '35%';
    image = 'sad.png';
    url += 'ModerateDiabetesRisk-YADR.mp3';
  } else if (val >= 41 && val <= 60) {
    color = '#EE9C0E'; // dark orange
    cat = 'High Risk';
    pos = '65%';
    image = 'verySad.png';
    url += 'highdiabetesriskfinder-YADR.mp3';
  } else {
    color = '#EE3F3F'; // red
    cat = 'Very High Risk';
    pos = '90%';
    image = 'verySad.png';
    url += 'VeryHighdiabetesriskfinder-YADR.mp3';
  }

  return {color, cat, pos, image, url};
};

const getRecommendations = (score: number) => {
  if (score <= 20) {
    return 'Based on your answers, you are in the Low Risk category, with a score of less than or equal to 20. To maintain a healthy lifestyle, continue to monitor for any new symptoms. Continue regular health checkups.';
  } else if (score <= 40) {
    return 'Based on your answers, you are at the Moderate Risk category, with a score between 21 and 40. Schedule a health checkup and consult with a healthcare provider. Consider making lifestyle changes to manage your risk.';
  } else if (score <= 60) {
    return 'Based on your answers, you are at the High Risk category, with a score between 41 and 60. Seek immediate medical advice and undergo a comprehensive health assessment.';
  } else {
    return 'Based on your answers, you are in the Very High Risk category, with a score of 61 to 80. Seek immediate medical advice and undergo a comprehensive health assessment.';
  }
};

type ParamList = {
  Detail: {
    id: string;
  };
};

interface IDRFData {
  id: string;
  yadr_score: number;
}

const YADRREsults = () => {
  const [load, setLoad] = useState(true);
  const [drfData, setDrfData] = useState<IDRFData>();
  const {params} = useRoute<RouteProp<ParamList, 'Detail'>>();
  const getBmidata = useCallback(async () => {
    setLoad(true);
    try {
      const res = await auth.get(`/yadr/${params?.id || ''}`);
      const {result} = await res.data;
      setDrfData(result);
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
        heading={'Diabetes Risk Finder Result'}
        subHeading="Young Adult Diabetes Risk Finder(YADRF)"
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AudioPlayer url={findBodyGrade(drfData?.yadr_score!).url} />
        <Image
          src={`${R2_URL}${findBodyGrade(drfData?.yadr_score!).image}`}
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
          <Text style={{color: findBodyGrade(drfData?.yadr_score!).color}}>
            {findBodyGrade(drfData?.yadr_score!).cat}
          </Text>{' '}
          Risk!
        </Text>
        <DGHeading head="Results" />
        <View style={{height: 20}} />
        <View style={styles.resultCont}>
          <Text style={styles.resultText}>
            DRF Score {'    '} :{'       '}
            <Text style={{color: findBodyGrade(drfData?.yadr_score!).color}}>
              {drfData?.yadr_score!}
            </Text>
          </Text>
          <Text style={styles.resultText}>
            Risk Level {'     '} :{'       '}
            <Text style={{color: findBodyGrade(drfData?.yadr_score!).color}}>
              {findBodyGrade(drfData?.yadr_score!).cat}
            </Text>
          </Text>
          <View style={{height: 30}} />
          <DownArrowSvg
            style={{left: findBodyGrade(drfData?.yadr_score!).pos}}
          />

          <View style={styles.indicatorCont}>
            <View
              style={{width: '25%', backgroundColor: '#1F8C0E', height: '100%'}}
            />
            <View
              style={{width: '25%', backgroundColor: '#F47C0C', height: '100%'}}
            />
            <View
              style={{width: '25%', backgroundColor: '#EE9C0E', height: '100%'}}
            />
            <View
              style={{width: '25%', backgroundColor: '#EE3F3F', height: '100%'}}
            />
          </View>

          <View style={[styles.indicatorCont, {height: 'auto'}]}>
            <Text style={{width: '25%', color: '#1F8C0E', textAlign: 'center'}}>
              Low
            </Text>
            <Text style={{width: '25%', color: '#F47C0C', textAlign: 'center'}}>
              Moderate
            </Text>
            <Text style={{width: '25%', color: '#EE9C0E', textAlign: 'center'}}>
              High
            </Text>
            <Text style={{width: '25%', color: '#EE3F3F', textAlign: 'center'}}>
              Very High
            </Text>
          </View>
        </View>
        <DGHeading head="Recommendations" />
        <Text style={{fontStyle: 'italic', color: '#000', fontSize: 16}}>
          {getRecommendations(drfData?.yadr_score!)}
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

        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            marginTop: 30,
            borderColor: 'rgba(0, 0, 0, 0.20)',
            elevation: 5,

            backgroundColor: '#fff',
          }}>
          <BottomSheetNobullet
            item={{
              bullet: false,
              desc: 'The Young Adult Diabetes Risk Score was formulated based on various literatures and underwent validation by diabetologists, incorporating their feedback to refine the scores.(Ali, 2013; Anjana et al., 2011; Centers for Disease Control and Prevention, 2022; Chandrupatla et al., 2021; Dutta & Ghosh, 2019; Fichadiya et al., 2022; Gore et al., 2006; Hamilton et al., 2014; Harihar et al., 2025; Kekan et al., 2022; Mohan & Anbalagan, 2013; Parikh et al., 2025; RSSDI, 2022; Singh & Acharya, 2020; Susairaj et al., 2019; Swetha et al., 2023; Tiwari & Purohit, 2014; Unger et al., 2020; Wang et al., 2022; World Health Organisation, 2003)',
              head: 'Reference',
            }}
          />
        </View>
        <ResultGuide />
      </ScrollView>
    </SafeAreaView>
  );
};

export default YADRREsults;

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
