import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
import YoutubeIframe from 'react-native-youtube-iframe';
import alcohol from '../assets/causeofdiabetics/alcohol.png';
import bodyparts from '../assets/causeofdiabetics/bodyparts.png';
import surgury from '../assets/causeofdiabetics/surgury.png';
import tablets from '../assets/causeofdiabetics/tablets.png';
import weight from '../assets/causeofdiabetics/weight.png';
import bglindicator from '../assets/palm/image.png';
import BackButtonHeader from '../components/BackButtonHeader';
import BOMBGCard from '../components/BOMBGCard';
import {CarouselItem} from '../components/Carousal';
import CauseOfDCard from '../components/CauseOfDCard';
import ComplicationsOfDCard from '../components/ComplicationsOfDCard';
import DiabetesMellitusCard from '../components/DiabetesMellitusCard';
import FlowChartCard from '../components/FlowChartDiabetesGuide';
import Loading from '../components/Loading';
import ModyCard from '../components/ModyCard';
import SubCarousal from '../components/SubCarousal';
import SympromesOfDiaCard from '../components/SymptomesOfDiaCard';
import TestForDCard from '../components/TestForDCard';
import {DMItems} from './Home';

interface ISymptomesOfDiaCard {
  head: string;
  key: string;
  img: string;
  desc?: string;
}

const symptomesofDiaList: ISymptomesOfDiaCard[] = [
  {
    head: 'Polyuria',
    key: 'Polyuria',
    img: 'urinatetoilate.jpg',
    desc: '(Excess Urination)',
  },
  {
    head: 'Polyphagia',
    key: 'Polyphagia',
    img: 'symptomesofdfood.png',
    desc: '(Increase appetite)',
  },
  {
    head: 'Polydipsia',
    key: 'Polydipsia',
    img: 'symptomesofDrinkwater.png',
    desc: '(Increase thirst)',
  },
  {
    head: 'Blurred vision',
    key: 'Blurred vision',
    img: 'symptomsofdiaeye.jpeg',
  },
  {
    head: 'Vaginal Infection',
    key: 'Vaginal infection',
    img: 'symptomesofdiavagina.jpeg',
  },
  {
    head: 'Itching',
    key: 'Itching',
    img: 'itching.jpg',
  },
  {
    head: 'Numbness',
    key: 'Numbness',
    img: 'footpain.jpg',
  },
  {
    head: 'Delayed wound healing',
    key: 'Delayed wound healing',
    img: 'woundonfeet.jpg',
  },
  {
    head: 'Tiredness',
    key: 'Tiredness',
    img: 'tiered.jpg',
  },
];
interface ICauseofDiabetics {
  head: string;
  key: string;
  img: any;
  color: string;
}

const causeOfDiabeticsList: ICauseofDiabetics[] = [
  {
    head: 'Family History',
    key: 'Family history',
    img: 'youngmodyfamily.png',
    color: '#0075FF',
  },
  {
    head: 'Unhealthy lifestyle practices',
    key: 'Lifestyle Practices',
    img: alcohol,
    color: '#49CFAE',
  },
  {
    head: 'Obese/Overweight',
    key: 'Obese/Overweight',
    img: weight,
    color: '#47D872',
  },
  {
    head: 'Other comorbidities',
    key: 'Other comorbidities',
    img: bodyparts,
    color: '#60E146',
  },
  {
    head: 'Medications for long period of time',
    key: 'Long-term medication use',
    img: tablets,
    color: '#ACE946',
  },
  {
    key: 'Post-surgical complications',
    head: 'Post-Surgery effects',
    img: surgury,
    color: '#F0E146',
  },
  {
    head: 'Age',
    key: 'Age',
    img: 'youngmodypersonclipart.png',
    color: '#F79646',
  },
];

// eyerounded.png

// fall.png

// heart.png

// issuesonfoot.png

// issuesonkidney.png

// tissues.png

const complicationsList: ISymptomesOfDiaCard[] = [
  {
    head: 'Diabetic Nephropathy',
    img: 'issuesonkidney.png',
    key: 'Diabetic Nephropathy',
  },
  {
    head: 'Diabetic Neuropathy',
    img: 'tissues.png',
    key: 'Diabetic Neuropathy',
  },
  {
    head: 'Diabetic Retinopathy',
    img: 'eyerounded.png',
    key: 'Diabetic Retinopathy',
  },
  {
    head: 'Cardiac Diseases',
    img: 'heart.png',
    key: 'Cardiac Diseases',
  },
  {
    head: 'Diabetic Ketoacidosis',
    img: 'fall.png',
    key: 'Diabetic Ketoacidosis',
  },
  {
    head: 'Diabetic foot',
    img: 'issuesonfoot.png',
    key: 'Diabetic foot',
  },
];

// fbg.png

// hba1c.png

// ogtt.png

// ppg.png

interface ITestForD extends ISymptomesOfDiaCard {
  desc?: string;
  testNo?: number;
}
const testsForDList: ITestForD[] = [
  {
    head: 'FBG',
    img: 'fbg.png',
    testNo: 1,
    key: 'FBG',
    desc: 'Fasting Blood Glucose test',
  },
  {
    head: 'OGTT',
    img: 'ogtt.png',
    testNo: 2,
    key: 'OGTT',
    desc: 'Oral Glucose Tolerance Test',
  },
  {
    head: 'PPG',
    img: 'ppg.png',
    testNo: 3,
    key: 'PPG',
    desc: 'Post-Prandial Glucose Test\n(2 hrs post-plasma glucose)',
  },
  {
    head: 'HbA1C',
    img: 'hba1c.png',
    testNo: 4,
    key: 'HbA1C',
    desc: 'Glycated Hemoglobin',
  },
];

const waysToControlD: CarouselItem[] = [
  {
    head: 'Eat Healthy',
    img: 'healthyfood.png',
    id: 'erhqehv4354',
    navigation: 'DietaryGuideScreen',
  },
  {
    head: 'Do regular exercise and lose extra weight (atleast 20-25 minutes per day)',
    img: 'excersise.png',
    id: 'erhqeh354',
    navigation: 'ExcerciseGuideScreen',
  },
  {
    head: 'Sleep well (7 hours/night)',
    img: 'soundsleep.png',
    id: 'erhqehv43',
  },
  {
    head: 'Quit smoking and alcohol',
    img: 'breakcigar.png',
    id: 'hqehv4354',
  },
  {
    head: 'Regular monitoring of blood glucose and blood pressure levels',
    img: 'woundbandage.png',
    id: 'ehqe4354',
  },
  {
    head: 'Regular health check up',
    img: 'blacknurse.png',
    id: 'ehqe43qefqe54',
  },
  {
    head: 'Follow the prescribed medications',
    img: 'moretablets.png',
    id: 'ehqqe##fqe54',
  },
];
// ombgbodydesc.png

//

//

//

//

const BOMBGList: {head: string; img: string}[] = [
  {
    head: 'Helps in controlling blood glucose level and prevent from diabetes complication.',
    img: 'bombgbodyparts.png',
  },
  {
    head: 'Helps in finding the cause of diabetic symptoms.',
    img: 'bombgbodydesc.png',
  },
  {
    head: 'Understands the connection between the types of diet, activity, medication and blood sugar level.',
    img: 'bombgfruits.png',
  },
  {
    head: 'Understands the effect of stress on blood glucose level.',
    img: 'bombgstess.png',
  },
  {
    head: 'Tracking and nothing it does helps the doctor to give correct treatment.',
    img: 'bombgmobile.png',
  },
];

export const DGHeading: FC<{head: string; onClick?: () => {}}> = ({head}) => {
  return (
    <View style={styles.headMainCont}>
      <Text style={[styles.headMainheadText]}>{head}</Text>
    </View>
  );
};

const DiabetesGuide: FC = () => {
  const navigation = useNavigation();
  const [load, setLoad] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setLoad(false));

    return () => clearTimeout(id);
  }, []);
  if (load) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <BackButtonHeader heading="Diabetes Guide" />
      <ScrollView style={styles.scrolView}>
        <View style={{padding: 16}}>
          <DGHeading head="Diabetes Mellitus Intro" />
          <ScrollView horizontal nestedScrollEnabled>
            {DMItems.map(e => (
              <DiabetesMellitusCard key={e.id} item={e} />
            ))}
          </ScrollView>
          <DGHeading head="Types of Diabetes Mellitus" />
          <FlowChartCard />
          <DGHeading head="Causes of Diabetes" />
          {causeOfDiabeticsList.map((e, i) => (
            <CauseOfDCard
              img={e.img}
              label={e.head}
              itemKey={e.key}
              key={e.head + i}
              color={e.color}
            />
          ))}
        </View>

        <YoutubeIframe height={250} videoId="u3UkFFN9qjA" />
        <View style={{paddingHorizontal: 16}}>
          <DGHeading head="Symptoms of Diabetes" />
          <ScrollView horizontal nestedScrollEnabled>
            {symptomesofDiaList.map((e, i) => (
              <SympromesOfDiaCard
                key={e.key + i}
                img={e.img}
                itemKey={e.key}
                label={e.head}
                desc={e.desc}
              />
            ))}
          </ScrollView>
          <DGHeading head="Complication of Diabetes" />
          <Text style={{fontStyle: 'italic'}}>
            Uncontrollable high blood blucose level leads to,
          </Text>
          <View style={{height: 20}} />
          {complicationsList.map((e, i) => {
            return (
              <ComplicationsOfDCard
                img={e.img}
                label={e.head}
                itemKey={e.key}
                key={e.key + i}
              />
            );
          })}
          <DGHeading head="Tests for Diabetes" />

          {testsForDList.map((e, i) => (
            <TestForDCard
              img={e.img}
              itemKey={e.key}
              label={e.head}
              desc={e.desc}
              testNo={e.testNo}
              key={e.head + e.testNo + i}
            />
          ))}
          <DGHeading head={'Benefits of monitoring blood\nglucose level'} />
          <ScrollView horizontal nestedScrollEnabled>
            {BOMBGList.map((e, i) => (
              <BOMBGCard img={e.img} label={e.head} key={e.head + i} />
            ))}
          </ScrollView>
          <DGHeading head={'Blood Glucose Indicator Chart'} />
          <Image source={bglindicator} style={styles.signalToD} />
          <DGHeading head={'Technology used to monitor\nBlood Glucose'} />
        </View>
        <SubCarousal />
        <View style={{paddingHorizontal: 16}}>
          <DGHeading head={'Ways to Control and Prevent\nDiabetes'} />
          {waysToControlD.map((e, i) => (
            <>
              <ModyCard
                key={e.id + i}
                item={e}
                onPress={
                  e.navigation
                    ? () => {
                        navigation.navigate(e.navigation as never);
                      }
                    : undefined
                }
              />
            </>
          ))}
        </View>

        {/*  */}

        <View style={{height: 30}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DiabetesGuide;

const styles = StyleSheet.create({
  scrolView: {
    flex: 1,
  },
  headMainCont: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headMainheadText: {
    fontSize: 16,
    fontWeight: 700,
    color: '#000',
  },
  signalToD: {
    height: 326,
    maxWidth: '100%',
    objectFit: 'fill',
  },
});
