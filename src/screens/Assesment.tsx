import {StackActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BackButtonHeader from '../components/BackButtonHeader';
import CustomButton from '../components/CustomButton';
import {BottomSheetNobullet} from '../context/BottomSheetContext';
import {StackNavigation} from '../Stack';
import {DGHeading} from './DiabetesGuide';

const Assesment = () => {
  const navigation = useNavigation<StackNavigation>();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <BackButtonHeader heading="Assessment" />
      <ScrollView style={{flex: 1, padding: 16}}>
        <DGHeading head="Why Take This Assessment?" />
        <BottomSheetNobullet
          item={{
            bullet: false,
            head: 'Enhance Your Understanding',
            desc: 'Learn more about diabetes and how it affects your body.',
          }}
        />
        <BottomSheetNobullet
          item={{
            bullet: false,
            head: 'Identify Knowledge Gaps',
            desc: 'Discover areas where you may need more information or support.',
          }}
        />
        <BottomSheetNobullet
          item={{
            bullet: false,
            head: 'Improve Health Outcomes',
            desc: ' Better knowledge leads to better management and improved health.',
          }}
        />
        <BottomSheetNobullet
          item={{
            bullet: false,
            head: 'Support Loved Ones',
            desc: 'Gain insights to help support friends or family members with diabetes.',
          }}
        />
        <DGHeading head="What to expect?" />
        <Text>
          The assessment consists of multiple-choice questions that cover
          various aspects of diabetes. It is designed to be informative and
          engaging, providing you with valuable insights regardless of your
          current level of knowledge.
        </Text>
        <DGHeading head="Ready to test your knowledge?" />
        <Text>
          Click the button below to start the assessment. It’s quick, easy, and
          informative!
        </Text>
        <View style={{height: 30}} />
        <CustomButton
          label="TAKE ASSESSMENT"
          onPress={() =>
            navigation.dispatch(
              StackActions.replace('AssesmentQuestionsScreen'),
            )
          }
        />
        <View style={{height: 30}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Assesment;
