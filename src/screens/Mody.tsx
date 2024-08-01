import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CarouselItem} from '../components/Carousal';
import {ScrollView} from 'react-native-gesture-handler';
import BackButtonHeader from '../components/BackButtonHeader';
import ModyCard from '../components/ModyCard';
import {DGHeading} from './DiabetesGuide';
import {
  IBottomSheetContent,
  useBottomSheet,
} from '../context/BottomSheetContext';
import popUpContent from '../popUpContent';
import Loading from '../components/Loading';
// dnamody.png

// groupmody.png

// insulinmody.png

// multiplednamody.png

// surgerymody.png

const modyItems: CarouselItem[] = [
  {
    head: 'Distinct Diabetes Variant',
    desc: 'MODY is a unique diabetes type with 1% - 2% of all diabetes cases.',
    img: 'dnamody.png',
    id: '1414gwcegewcw',
  },
  {
    head: 'Youth Onset',
    desc: 'Typically diagnosed in before age 35.',
    img: 'groupmody.png',
    id: '141gwcegewcw',
  },
  {
    head: 'Genetic Influence',
    desc: 'Rooted in genetic mutations affecting insulin production.',
    img: 'multiplednamody.png',
    id: '1414gwcegewc',
  },
  {
    head: 'Insulin',
    desc: 'Unlike common diabetes types, MODY may not require initial insulin.',
    img: 'insulinmody.png',
    id: '4gwcegewcw',
  },
  {
    head: 'Diagnostic challenges',
    desc: 'Often misdiagnosed, emphasizing the need for accurate identification.',
    img: 'surgerymody.png',
    id: '1414gw---gewcw',
  },
];

const typesOfMody: CarouselItem[] = [
  {
    head: 'MODY 1',
    id: '-1301rmgwe942',
    desc: '(HNF4/Hepatocyte nuclear factor 4)',
  },
  {
    head: 'MODY 2',
    id: '-1301rmgwe9',
    desc: '(GCK/Glucokinase)',
  },
  {
    head: 'MODY 3',
    id: '-1we942',
    desc: '(HNF1/Hepatocyte nuclear factor 1)',
  },
  {
    head: 'MODY 4',
    id: '3--1rmgwe942',
    desc: '(PDX1/IPF1/insulin Promoter factor-1)',
  },
  {
    head: 'MODY 5',
    id: '-1301rmgw--',
    desc: '(HNF16/Hepatocyte nuclear factor 16)',
  },
  {
    head: 'MODY 6',
    id: '-1301rmgwqcv 42',
    desc: '(NEUROD1/Neurogenic differentiation)',
  },
  {
    head: 'MODY 7',
    id: '-1301rqwde942',
    desc: '(KLF11/Krupel-like-factor 11)',
  },
  {
    head: 'MODY 8',
    id: '-130-=-31!e942',
    desc: '(CEL/Carboxyl ester lipase)',
  },
  {
    head: 'MODY 9',
    id: '-1301rmgw^&',
    desc: '(PAX4/Paired box gene 4)',
  },
  {
    head: 'MODY 10',
    id: '-1301rmgwe942+_',
    desc: '(INS/Insulin gene)',
  },
  {
    head: 'MODY 11',
    id: '001301rmgwe942',
    desc: '(BLK/B-Lymphotcyte tyrosin kinaase)',
  },
  {
    head: 'MODY 12',
    id: '-1301rmgwe942$$%',
    desc: '(KCNJ11/Permanent neonatal diabetes mellitus)',
  },

  {
    head: 'MODY 13',
    id: '-1301rmgw&&*2',
    desc: '(ABCC8/Permenen transient neonatal diabetes mellitus)',
  },
  {
    head: 'MODY 14',
    id: '-1301rmgwe942+++',
    desc: '(APPL1/Adaptor protein, phosphoserine interacting with PH domain and leucine zipper 1)',
  },
];

//

//

//

//

//

//

const modyYoungList: CarouselItem[] = [
  {
    id: '0(wq434wdg)23413134()',
    head: 'Age',
    img: 'youngmodypersonclipart.png',
    desc: '(below 30 years)',
  },
  {
    id: '0(wq434wdg)23413134(',
    head: 'Family History',
    img: 'youngmodyfamily.png',
    desc: '(Continuous 2 or more generations with diabetes)',
  },
  {
    id: '0(wq434wdg)23413134)',
    head: 'Clinical Examination and Physical Examination',
    img: 'youngmodyinsulinclipart.png',
    desc: '(Mild, stable fasting hyperglycemia, non-obese, absence of autoantibodies, normal lipid level)',
  },

  {
    id: '0(wq434wdg23413134()',
    head: 'Non insulin dependence',
    img: 'youngmodyveins.png',
    desc: 'Endogenous insulin production more than 3 years post diagnosis with diabetes',
  },
  {
    id: '0wq434wdg)23413134()',
    head: 'Negative antibody and positive C-peptide more than 3 years post diagnosis with diabetes',
    img: 'youngmodycpeptoidtest.png',
  },
  {
    id: '(wq434wdg)23413134()',
    head: 'Genetic Testing',
    img: 'youngmodygenetictest.png',
  },
];

//

//

//

const reasonsOfMody: CarouselItem[] = [
  {
    head: 'Stop misdiagnosing between type 1 and type 2 diabetes',
    id: '^^&624hrtb',
    img: 'reasonsmodyupset.png',
    color: '#4BACC6',
  },
  {
    head: 'Proper Treatment',
    id: '^&624hrtb',
    desc: '(Mostly, it is treated with the cost effecting sulfonyl urea tablet)',
    img: 'reasonsmodytablets.png',
    color: '#60E146',
  },
  {
    head: 'Digging out the family members with Maturity Onset Diabetes of the Young (MODY)',
    id: '^^&624hr',
    img: 'reasonsmodytwogirls.png',
    desc: '(Predictive testing)',
    color: '#F79646',
  },
];

//

//

//

//

//

//

//

//

const guideModyTest: CarouselItem[] = [
  {
    head: 'Early diagnosis and intervention are key to living well with MODY.',
    id: '90-()34%83hjgkjn',
    img: 'guidetomodyclubtest.png',
  },
  {
    head: 'Discuss with doctors and go for genetic testing.',
    id: '-()34%83hjgkjn',
    img: 'guidemodydocclipart.png',
  },
  {
    head: 'A blood or saliva test reveal the genetic code.',
    id: '()34%83hjgkjn',
    img: 'guidemodytakebloodsample.png',
  },
  {
    head: 'Motivate the family members for predictive genetic testing.',
    id: '90-()3%83hjgkjn',
    img: 'guidemodyclaps.png',
  },
  {
    head: 'Know your specific MODY type for precise treatment and management.',
    id: '90-()343hjgkjn',
    img: 'guidemodydnamicro.png',
  },
  {
    head: 'Two Genetic test type:',
    id: '90-(34%83hjgkjn',
    img: 'guidemodydna.png',
    desc: 'Targeted test: Focuses on known MODY genes.\n\nNGS(Next Generation Sequencing): \nChecks many MODY genes at once',
  },
  {
    head: 'Manage complications associated with your MODY type.',
    id: '90()34%83hjg',
    img: 'guidemodyorgans.png',
  },
  {
    head: 'Knowledge and healthy habits empower you to thrive with MODY.',
    id: '90-()34%83hjn',
    img: 'guidemodyhealthy.png',
  },
];

const Mody = () => {
  const {openBottomSheet} = useBottomSheet();

  const onPress = (value: IBottomSheetContent) => {
    openBottomSheet(value);
  };
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
      <BackButtonHeader
        heading={'Maturity Onset Diabetes of\nthe Young (MODY) Guide'}
      />

      <ScrollView style={{flex: 1, padding: 16}}>
        <DGHeading head="Unveiling MODY" />
        {modyItems.map(e => (
          <ModyCard item={e} key={e.id} />
        ))}
        <DGHeading
          head={'Types of Maturity Onset Diabetes of the\nYoung (MODY)'}
        />
        {typesOfMody.map((e, i) => (
          <ModyCard
            key={e.id + i}
            item={e}
            info
            onPress={() => onPress(popUpContent[e.head])}
          />
        ))}
        <DGHeading head="Ways to find Maturity Onset Diabetes of the young (MODY)" />
        {modyYoungList.map((e, i) => (
          <ModyCard item={e} key={e.id + i} />
        ))}
        <DGHeading head="Reasons for Diagnosing Maturity Onset Diabetes of the Young (MODY)" />
        {reasonsOfMody.map(e => (
          <ModyCard item={e} key={e.id} />
        ))}
        <DGHeading head="A Guide to MODY Testing and Living Well" />
        {guideModyTest.map(e => (
          <ModyCard key={e.id} item={e} />
        ))}
        <View style={{height: 30}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Mody;

const styles = StyleSheet.create({});
