import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import DownGradientBox from '../components/DownGradientBox';
import {ScreenNames, StackNavigation} from '../Stack';

const eduList: {img: string; head: string; nav: ScreenNames[number]}[] = [
  {
    head: 'Diabetes Guide',
    img: 'edumulti.png',
    nav: 'DiabetesGuideScreen',
  },
  {
    head: 'Maturity Onset Diabetes of the young (MODY) Guide',
    img: 'edudna.png',
    nav: 'ModyScreen',
  },
  {
    head: 'Dietary Guide',
    img: 'edumeal.png',
    nav: 'DietaryGuideScreen',
  },
  {
    head: 'Myths and Facts',
    img: 'edufacts.png',
    nav: 'MythsAndFactsScreen',
  },
  {
    head: 'Exercise Guide',
    img: 'eduexcersise.png',
    nav: 'ExcerciseGuideScreen',
  },
  {
    head: 'Assessment',
    img: 'edubrain.png',
    nav: 'AssesmentScreen',
  },
];

const Education = () => {
  const navigation = useNavigation<StackNavigation>();

  return (
    <ScrollView style={{padding: 12, paddingTop: 50}}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}>
        {eduList.map((e, i) => (
          <View key={e.head + i} style={{marginBottom: 10}}>
            <DownGradientBox
              above
              img={e.img}
              label={e.head}
              onClick={() => navigation.navigate(e.nav)}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Education;
