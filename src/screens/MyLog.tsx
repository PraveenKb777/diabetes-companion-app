import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import DatePicker from '../components/DatePicker';
import BackButtonHeader from '../components/BackButtonHeader';
import {ScrollView} from 'react-native-gesture-handler';
import auth from '../utils/auth';
import BMICard from '../components/BMICard';
import Loading from '../components/Loading';
import {NextArrow} from '../assets/Svg';
import NothingToShow from '../components/NothingToShow';
import {ScreenNames, StackNavigation} from '../Stack';
import {useNavigation} from '@react-navigation/native';

const HEADING = ['BMI', 'WHR', 'DRF', 'MODY RF', 'CMP'];
const URLS = ['/bmi', '/whr', '/drf', '/mody', '/cmp'];
interface IBmiResult {
  bmi_score: number;
  created_at: string;
  height_cm: number;
  id: string;
  name: string;
  weight_kg: number;
}
type TGender = 'male' | 'female';
interface IDRFREsults {
  age: number;
  created_at: string;
  family_history: number;
  gender: TGender;
  id: string;
  name: string;
  physical_activity: number;
  drf_score: number;
  waist_cm: number;
}

interface IWHRResults {
  created_at: string;
  gender: TGender;
  hip_cm: number;
  id: string;
  name: string;
  waist_cm: number;
  whr_score: number;
}

interface IModyResults {
  age: string;
  auto_anitbodie: number;
  complications: number;
  created_at: string;
  family_history: number;
  hba1c: number;
  height_cm: number;
  id: string;
  ketoacidosis: number;
  mody_score: number;
  name: string;
  parent_history: number;
  weight_kg: number;
}

interface ICMPResults {
  carbohydrate_g: number;
  created_at: Date;
  energy_kcal: number;
  fat_g: number;
  fiber_g: number;
  id: string;
  protein_g: number;
}

const LIMIT = 3;

export type ALL = IBmiResult &
  IDRFREsults &
  IWHRResults &
  IModyResults &
  ICMPResults;

const MyLog = () => {
  const [date, setDate] = useState('');
  const [selectedItem, setSelectedItem] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [list, setList] = useState<ALL[]>();
  const [load, setLoad] = useState(false);
  const [pages, setPages] = useState<{
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
    totalPages: number;
  }>({currentPage: 1, nextPage: null, prevPage: null, totalPages: 1});
  const getItems = useCallback(async () => {
    setLoad(true);
    try {
      let url = URLS[selectedItem];
      url += `?limit=${LIMIT}&offset=${
        (currPage - 1) * LIMIT
      }&order_by=desc&date=${date}`;
      //console.log(url);
      const res = await auth.get(url);
      const {result, currentPage, nextPage, prevPage, totalPages, total} =
        await res.data;
      setPages({currentPage, nextPage, prevPage, totalPages});
      setList(result);
      //console.log(result, totalPages, total);
    } catch (error: any) {
      //console.log(error);
      //console.log(error.response);
    } finally {
      setLoad(false);
    }
  }, [currPage, date, selectedItem]);
  useEffect(() => {
    getItems();
  }, [getItems]);

  const handleNext = () => {
    !load && pages.nextPage && setCurrPage(e => e + 1);
  };
  const handlePrev = () => {
    !load && pages.prevPage && setCurrPage(e => e - 1);
  };

  const navigation = useNavigation<StackNavigation>();

  const onPressCard = (id: any) => {
    // const URLS = ['/bmi', '/whr', '/drf', '/mody', ''];
    let navigationRoute: ScreenNames[number] = 'BMIResultScreen';
    if (selectedItem === 1) {
      navigationRoute = 'WHRResultScreen';
    }

    if (selectedItem === 2) {
      navigationRoute = 'DRFResultsScreen';
    }
    if (selectedItem === 3) {
      navigationRoute = 'ModyResultsScreen';
    }
    if (selectedItem === 4) {
      navigationRoute = 'YourCaloricMenuScreen';
    }

    navigation.navigate(navigationRoute, {id});
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <BackButtonHeader heading="My Log" />
      <View style={{padding: 16}}>
        <View style={styles.dateCont}>
          <Text style={styles.dateAdjText}>
            Here, you can track{'\n'}important health metrics.
          </Text>
          <DatePicker onChange={setDate} value={date} />
        </View>
        <View style={{flexDirection: 'row', width: '100%', marginTop: 20}}>
          {HEADING.map((e, i) => {
            return (
              <TouchableOpacity
                style={[
                  styles.headingItems,
                  {width: `${100 / HEADING.length}%`},
                  selectedItem === i ? {backgroundColor: '#0075FF'} : {},
                ]}
                key={e + i}
                onPress={() => {
                  setSelectedItem(i);
                  setCurrPage(1);
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: selectedItem === i ? '#fff' : '#000',
                    fontSize: 16,
                    fontWeight: '600',
                  }}>
                  {e}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      {load ? (
        <Loading />
      ) : !list?.length ? (
        <NothingToShow />
      ) : (
        <ScrollView style={{flex: 1, padding: 16}}>
          {list?.map(e => (
            <BMICard
              bmiScore={e.bmi_score}
              height={e.height_cm}
              key={e.id}
              name={e.name}
              weight={e.weight_kg}
              waist={e.waist_cm}
              hip={e.hip_cm}
              gender={e.gender}
              whrScore={e.whr_score}
              age={e.age}
              drfScore={e.drf_score}
              time={e.created_at}
              modyScore={e.mody_score}
              carbohydrate_g={e.carbohydrate_g}
              energy_kcal={e.energy_kcal}
              fat_g={e.fat_g}
              fiber_g={e.fiber_g}
              protein_g={e.protein_g}
              onPress={() => onPressCard(e.id)}
            />
          ))}
          <View style={{height: 30}} />
        </ScrollView>
      )}
      {pages.totalPages > 1 ? (
        <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
          <TouchableOpacity
            style={[
              {
                backgroundColor: !pages.prevPage ? 'grey' : '#000',
                height: 60,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 1000,
                marginRight: 26,
                alignSelf: 'flex-end',
                marginBottom: 20,
                transform: [{rotate: '180deg'}],
              },
            ]}
            onPress={handlePrev}>
            <NextArrow height={30} width={30} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                backgroundColor: !pages.nextPage ? 'grey' : '#000',
                height: 60,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 1000,
                marginRight: 26,
                alignSelf: 'flex-end',
                marginBottom: 20,
              },
            ]}
            onPress={handleNext}>
            <NextArrow height={30} width={30} />
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default MyLog;

const styles = StyleSheet.create({
  dateCont: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  dateAdjText: {
    color: '#0075FF',
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  headingItems: {
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#000B2133',
  },
});
