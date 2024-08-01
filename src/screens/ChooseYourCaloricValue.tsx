import {R2_URL} from '@env';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';

import React, {FC, useCallback} from 'react';
import BackButtonHeader from '../components/BackButtonHeader';
import {DGHeading} from './DiabetesGuide';
import {Radios} from '../components/RadioButtons';
import {useAppDispatch, useAppSelector} from '../redux/hooks/hooks';
import {resetState, setSelectedCalories} from '../redux/slice/cmpSlice';
import CustomButton from '../components/CustomButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../Stack';

export const CALORIC_AMOUNTS = [
  {
    id: '6ac67627-9aa5-46a1-a634-7a4f35acbfb0',
    val: '1250 Kcal',
  },
  {
    id: '53a67fef-286a-4872-a128-0919e631d9d5',
    val: '1500 Kcal',
  },
  {
    id: '601b95af-6c4d-4da5-82a5-707ac8059570',
    val: '1800 Kcal',
  },
];

const RadioButtons: FC<{
  list: typeof CALORIC_AMOUNTS;
  value?: any;
}> = ({list, value}) => {
  const dispatch = useAppDispatch();
  return (
    <View>
      {list.map(e => (
        <Radios
          key={e.id}
          label={e.val}
          selected={value === e.id}
          onClick={() => dispatch(setSelectedCalories(e.id))}
        />
      ))}
    </View>
  );
};

const ChooseYourCaloricValue = () => {
  const {selectedCalories} = useAppSelector(e => e.cmpReducer);
  const dispatch = useAppDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(resetState());
    }, []),
  );
  const navigation = useNavigation<StackNavigation>();
  return (
    <SafeAreaView style={styles.safeArea}>
      <BackButtonHeader heading="Choose your Caloric Value" />
      <ScrollView style={styles.scrollView}>
        <Image src={`${R2_URL}cymv.jpeg`} style={styles.img} />
        <DGHeading head="Choose your caloric value to get your desired caloric menu planner" />
        <RadioButtons list={CALORIC_AMOUNTS} value={selectedCalories} />
        <View style={{height: 30}} />
        <CustomButton
          label="next"
          onPress={() =>
            selectedCalories
              ? navigation.navigate('CaloriesWiseListScreen')
              : ToastAndroid.show('Kindly select a value', ToastAndroid.SHORT)
          }
        />
        <View style={{height: 30}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChooseYourCaloricValue;
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  img: {
    height: (width * 90) / 100,
    aspectRatio: 1,
    objectFit: 'cover',
    borderRadius: 10,
    alignSelf: 'center',
    borderColor: 'rgba(0, 0, 0, 0.20)',
    borderWidth: 1,
  },
});
