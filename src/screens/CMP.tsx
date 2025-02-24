import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BackButtonHeader from '../components/BackButtonHeader';
import DownGradientBox from '../components/DownGradientBox';
import {StackNavigation} from '../Stack';

export const NoteComp: FC<{note: string}> = ({note}) => {
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.20)',
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 2,
        marginTop: 10,
      }}>
      <Text style={{fontSize: 16, fontStyle: 'italic'}}>
        <Text style={{color: '#000'}}>Note : </Text> {note}
      </Text>
    </View>
  );
};

const CMP = () => {
  const navigattion = useNavigation<StackNavigation>();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <BackButtonHeader heading="Caloric Menu Planner " />
      <ScrollView contentContainerStyle={{padding: 16}}>
        <Text style={{fontStyle: 'italic'}}>
          Effective dietary management is essential for maintaining optimal
          health, particularly for individuals with diabetes.{'\n\n'} Our
          Caloric Menu Planner is designed to assist you in making informed
          nutritional choices and effortlessly maintaining a balanced diet.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 30,
          }}>
          <DownGradientBox
            img={'cmpplanyourmeal.png'}
            above
            color={['rgba(40,40,40,1)', 'rgba(0,0,0,0)']}
            label="Plan your menu"
            fontSize={20}
            fontStyle="italic"
            onClick={() => navigattion.navigate('CYCVScreen')}
          />
          <DownGradientBox
            img={'cmpedityourmeal.png'}
            above
            color={['rgba(40,40,40,1)', 'rgba(0,0,0,0)']}
            label="View your menu"
            fontSize={20}
            fontStyle="italic"
            onClick={() =>
              navigattion.navigate('YourCaloricMenuScreen', {latest: true})
            }
          />
        </View>
        <NoteComp note="Restrict the usage of COCONUT in your meal" />
        <NoteComp note="1 Cup = 200ml" />
        <NoteComp note="This caloric menu is mainly designed for diabetic patients." />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CMP;
