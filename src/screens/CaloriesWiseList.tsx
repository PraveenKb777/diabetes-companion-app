import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAppSelector} from '../redux/hooks/hooks';
import {CALORIC_AMOUNTS} from './ChooseYourCaloricValue';

const CaloriesWiseList = () => {
  const selectedItem = useAppSelector(e => {
    const id = e.cmpReducer.selectedCalories;

    const item = CALORIC_AMOUNTS.find(i => i.id === id);
    return item;
  });

  console.log(selectedItem);
  return (
    <View>
      <Text>CaloriesWiseList</Text>
    </View>
  );
};

export default CaloriesWiseList;

const styles = StyleSheet.create({});
