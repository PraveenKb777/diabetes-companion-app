/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import child from '../assets/typesofflowchart/child.png';
import dna from '../assets/typesofflowchart/dna.png';
import insulinvial from '../assets/typesofflowchart/insulinvial.png';
import ladybloodtest from '../assets/typesofflowchart/ladybloodtest.png';
import multidna from '../assets/typesofflowchart/multidna.png';
import multiplediaitems from '../assets/typesofflowchart/multiplediaitems.png';
import pregnantlady from '../assets/typesofflowchart/pregnantlady.png';
import upsetgirl from '../assets/typesofflowchart/upsetgirl.png';
import {useBottomSheet} from '../context/BottomSheetContext';
import popUpContent from '../popUpContent';

export const FlowChartCard: FC<{
  img: any;
  label: string;
  onClick?: () => {};
}> = ({label, onClick, img}) => {
  const {openBottomSheet} = useBottomSheet();
  const value = popUpContent[label];
  const length = value?.content?.length || 0;
  const onPress = () => {
    openBottomSheet(value, length > 3);
    onClick && onClick();
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.mainCont}>
      <Image source={img} style={styles.img} />
      <Text style={[styles.text]}>{label}</Text>
      <View style={[styles.infoCont, {alignSelf: 'flex-start'}]}>
        <Text
          style={{
            color: '#0075FF',
            fontSize: 12,
            fontFamily: '700',
          }}>
          i
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const FlowChartDiabetesGuide: FC = () => {
  return (
    <View>
      <View style={{marginBottom: 32, alignSelf: 'center'}}>
        <FlowChartCard img={multiplediaitems} label="Diabetes Mellitus" />
        <View
          style={{
            height: 12,
            width: 1.5,
            position: 'absolute',
            alignSelf: 'center',
            backgroundColor: '#000',
            bottom: -11,
          }}
        />
        <View
          style={{
            borderWidth: 1,
            height: 26,
            width: 207,
            position: 'absolute',
            alignSelf: 'center',
            bottom: -36,
            borderBottomColor: '#fff',
          }}
        />
      </View>
      <View
        style={{
          marginBottom: 16,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: 1.5,
            height: 152,
            bottom: -152,
            left: 18,
            position: 'absolute',
            backgroundColor: '#000',
          }}
        />
        <View
          style={{
            width: 1.5,
            height: 502,
            bottom: -502,
            right: 18,
            position: 'absolute',
            backgroundColor: '#000',
          }}
        />
        <FlowChartCard label="Monogenic Diabetes Mellitus" img={dna} />
        <FlowChartCard label="Polygenic Diabetes Mellitus" img={multidna} />
      </View>
      <View style={{marginBottom: 16, marginLeft: 32}}>
        <View
          style={{
            width: 12,
            height: 1.5,
            top: 20,
            left: -12,
            position: 'absolute',
            backgroundColor: '#000',
          }}
        />
        <FlowChartCard label="Neonatal Diabetes Mellitus (NDM)" img={child} />
      </View>
      <View style={{marginBottom: 16, marginLeft: 32}}>
        <View
          style={{
            width: 13,
            height: 1.5,
            top: 20,
            left: -13,
            position: 'absolute',
            backgroundColor: '#000',
          }}
        />
        <FlowChartCard
          label="Maturity Onset Diabetes of the young (MODY)"
          img={insulinvial}
        />
      </View>
      <View style={{marginBottom: 16, marginRight: 32, alignSelf: 'flex-end'}}>
        <View
          style={{
            width: 13,
            height: 1.5,
            top: 20,
            right: -13,
            position: 'absolute',
            backgroundColor: '#000',
          }}
        />
        <FlowChartCard label="Type 1 Diabetes Mellitus" img={upsetgirl} />
      </View>
      <View style={{marginBottom: 16, marginRight: 32, alignSelf: 'flex-end'}}>
        <View
          style={{
            width: 13,
            height: 1.5,
            top: 20,
            right: -13,
            position: 'absolute',
            backgroundColor: '#000',
          }}
        />
        <FlowChartCard label="Type 2 Diabetes Mellitus" img={ladybloodtest} />
      </View>
      <View style={{marginBottom: 16, marginRight: 32, alignSelf: 'flex-end'}}>
        <View
          style={{
            width: 13,
            height: 1.5,
            top: 20,
            right: -13,
            position: 'absolute',
            backgroundColor: '#000',
          }}
        />
        <FlowChartCard
          label="Gestational Diabetes Mellitus"
          img={pregnantlady}
        />
      </View>
    </View>
  );
};

export default FlowChartDiabetesGuide;
const styles = StyleSheet.create({
  mainCont: {
    maxWidth: 163,
    width: 163,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
    borderRadius: 14,
    overflow: 'hidden',
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
  },
  img: {
    height: 44,
    width: 44,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    maxWidth: 80,
  },
  infoCont: {
    height: 16,
    width: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0075FF',
    borderRadius: 100,
  },
});
