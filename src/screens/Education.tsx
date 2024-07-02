import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {useBottomSheet} from '../context/BottomSheetContext';
import {ScrollView} from 'react-native-gesture-handler';
import DownGradientBox from '../components/DownGradientBox';
import {useNavigation} from '@react-navigation/native';

// e

//

//

//

//

//

const eduList: {img: string; head: string; nav: string}[] = [
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
    nav: 'DiabetesGuideScreen',
  },
  {
    head: 'Myths and Facts',
    img: 'edufacts.png',
    nav: 'DiabetesGuideScreen',
  },
  {
    head: 'Exercise Guide',
    img: 'eduexcersise.png',
    nav: 'ExcerciseGuideScreen',
  },
  {
    head: 'Assessment',
    img: 'edubrain.png',
    nav: 'DiabetesGuideScreen',
  },
];

const Education = () => {
  const navigation = useNavigation();

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

const styles = StyleSheet.create({});
