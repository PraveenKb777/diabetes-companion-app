/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
export interface IMythAndFactItem {
  id: string;
  number: string;
  myth: string;
  fact: string;
  mythImg: any;
  factImg: any;
}
const MythsAndFactsCard: FC<{item: IMythAndFactItem}> = ({item}) => {
  return (
    <View style={styles.lastCont}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 700,
          color: '#0075FF',
          position: 'absolute',
          top: -25,
          left: 20,
          backgroundColor: 'white',
        }}>
        {item.number}
      </Text>
      <Image source={item.mythImg} style={{height: 97, width: '100%'}} />
      <Text
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: '#000',
          marginTop: 12,
        }}>
        Myth
      </Text>
      <Text style={styles.headMainKmText}>{item.myth}</Text>

      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.20)',
          height: 1,
          width: '80%',
          marginVertical: 32,
          alignSelf: 'center',
        }}
      />
      <Image source={item.factImg} style={{height: 97, width: '100%'}} />
      <Text
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: '#000',
          marginTop: 12,
        }}>
        Fact
      </Text>
      <Text style={styles.headMainKmText}>{item.fact}</Text>
    </View>
  );
};

export default MythsAndFactsCard;

const styles = StyleSheet.create({
  lastCont: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
    padding: 16,
    borderRadius: 10,
    marginTop: 25,
  },
  headMainheadText: {
    fontSize: 16,
    fontWeight: 700,
    color: '#000',
  },
  headMainKmText: {
    fontStyle: 'italic',
    fontSize: 12,
    color: '#9D9D9D',
    marginVertical: 12,
  },
});
