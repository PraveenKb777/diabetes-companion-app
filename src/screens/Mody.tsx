import React, {FC, useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BackButtonHeader from '../components/BackButtonHeader';
import {CarouselItem} from '../components/Carousal';
import Loading from '../components/Loading';
import ModyCard from '../components/ModyCard';
import {
  BottomSheetYesbullet,
  BulletTrue,
  IBottomSheetContent,
  useBottomSheet,
} from '../context/BottomSheetContext';
import popUpContent from '../popUpContent';
import {DGHeading} from './DiabetesGuide';
import {useAppSelector} from '../redux/hooks/hooks';
import {CustomModyButton} from '../components/CustomButton';
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
    desc: 'Typically diagnosed in before age 30.',
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
    desc: '(HNF4α/Hepatocyte nuclear factor 4)',
  },
  {
    head: 'MODY 2',
    id: '-1301rmgwe9',
    desc: '(GCK/Glucokinase)',
  },
  {
    head: 'MODY 3',
    id: '-1we942',
    desc: '(HNF1α/Hepatocyte nuclear factor 1)',
  },
  {
    head: 'MODY 4',
    id: '3--1rmgwe942',
    desc: '(PDX1/IPF1/insulin Promoter factor-1)',
  },
  {
    head: 'MODY 5',
    id: '-1301rmgw--',
    desc: '(HNF1β/Hepatocyte nuclear factor 1β)',
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
    desc: '(usually before 30 years)',
  },
  {
    id: '0(wq434wdg)23413134(',
    head: 'Family History',
    img: 'youngmodyfamily.png',
    desc: '(2 or more generations with diabetes)',
  },
  {
    id: '0(wq434wdg)23413134)',
    head: 'Clinical Examination and Physical Examination',
    img: 'youngmodyinsulinclipart.png',
    desc: '(mild or stable blood sugar levels, non-obese, absence of autoantibodies)',
  },

  {
    id: '0(wq434wdg23413134()',
    head: 'Non insulin dependence',
    img: 'youngmodyveins.png',
    desc: 'insulin not required for many years after diagnosis',
  },
  {
    id: '0wq434wdg)23413134()',
    head: 'Autoantibody test was negative (no diabetes antibodies), and C-peptide was positive (body still makes insulin) even after 3 years',
    img: 'youngmodycpeptoidtest.png',
  },
  {
    id: '(wq434wdg)23413134()',
    head: 'Genetic Testing',
    desc: '(to confirm MODY)',
    img: 'youngmodygenetictest.png',
  },
];

//

//

//

const reasonsOfMody: CarouselItem[] = [
  {
    head: 'Don’t mistake MODY for Type 1 or Type 2 diabetes',
    id: '^^&624hrtb',
    img: 'reasonsmodyupset.png',
    color: '#4BACC6',
  },
  {
    head: 'Knowing MODY helps give the right treatment',
    id: '^&624hrtb',
    img: 'reasonsmodytablets.png',
    color: '#60E146',
  },
  {
    head: 'Test family members to find MODY early',
    id: '^^&624hr',
    img: 'reasonsmodytwogirls.png',
    // desc: '(Predictive testing)',
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
    head: 'Early diagnosis and intervention help in living well with MODY.',
    id: '90-()34%83hjgkjn',
    img: 'guidetomodyclubtest.png',
  },
  {
    head: 'Discuss with doctors for genetic testing.',
    id: '-()34%83hjgkjn',
    img: 'guidemodydocclipart.png',
  },
  {
    head: 'A blood or saliva test can detect MODY.',
    id: '()34%83hjgkjn',
    img: 'guidemodytakebloodsample.png',
  },
  {
    head: 'Motivate family members to go for predictive testing.',
    id: '90-()3%83hjgkjn',
    img: 'guidemodyclaps.png',
  },
  {
    head: 'Know your specific MODY type for the right treatment and management.',
    id: '90-()343hjgkjn',
    img: 'guidemodydnamicro.png',
  },
  {
    head: 'Genetic testing for MODY can be done in two ways:',
    id: '90-(34%83hjgkjn',
    img: 'guidemodydna.png',
    desc: 'a targeted test (checking specific known genes) or by NGS – Next Generation Sequencing (checking many genes at once).',
  },
  {
    head: 'Manage complications based on your MODY type.',
    id: '90()34%83hjg',
    img: 'guidemodyorgans.png',
  },
  {
    head: 'Knowledge of MODY and healthy habits helps you live better with MODY.',
    id: '90-()34%83hjn',
    img: 'guidemodyhealthy.png',
  },
];

const userTypesOfMody: BulletTrue[] = [
  {
    desc: [
      'They differ in severity and how blood sugar is affected over time.',
    ],
    bullet: true,
  },
  {
    desc: ['Some stay mild and steady; others may need medicine or insulin.'],
    bullet: true,
  },
  {
    desc: [
      'In India, MODY 3 is the most common form, followed by MODY 1 and MODY 2.',
    ],
    bullet: true,
  },
  {
    desc: ['Doctors use special tests to confirm the exact type.'],
    bullet: true,
  },
  {
    desc: [
      'Correct type helps in choosing the right treatment and guiding family members.',
    ],
    bullet: true,
  },
];

const ModyBullets: FC<{item: BulletTrue; index: number}> = ({item, index}) => {
  return (
    <Text key={item.desc[0] + index}>
      {'\u25CF'}{' '}
      <Text style={{fontSize: 16, color: '#9D9D9D'}}>{item.desc}</Text>
    </Text>
  );
};

const Mody = () => {
  const {openBottomSheet} = useBottomSheet();
  const {isDoctor} = useAppSelector(e => e.userReducer);
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
        {isDoctor ? (
          typesOfMody.map((e, i) => (
            <ModyCard
              key={e.id + i}
              item={e}
              info
              onPress={() => onPress(popUpContent[e.head])}
            />
          ))
        ) : (
          <>
            <CustomModyButton
              label="MODY has about 14 different forms"
              onPress={() => {
                openBottomSheet(popUpContent['14 different forms'], true);
              }}
            />
            <View style={{height: 15}} />
            {userTypesOfMody.map((e, i) => (
              <ModyBullets item={e} index={i} key={e.desc[0]} />
            ))}
          </>
        )}
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
