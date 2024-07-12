import React, {FC, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {R2_URL} from '@env';
import {StackActions, useNavigation} from '@react-navigation/native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {StackNavigation} from '../Stack';
import {NextArrow} from '../assets/Svg';
import BackButtonHeader from '../components/BackButtonHeader';
import CustomButton from '../components/CustomButton';
import ASSESMENT_QUESTIONS from '../questions/assesment';
import {DGHeading} from './DiabetesGuide';
const REC_ITEMS = ['No', 'Yes'];

interface IReactComp {
  onClick?: (e: any) => void;
  selected?: 0 | 1 | 2 | 3 | 4 | 5;
  index?: number;
}

const ReactionComp: FC<IReactComp> = ({onClick, selected, index}) => {
  const onPress = (val: number) => {
    const newObj: any = {};
    newObj[`${index}`] = val;
    onClick && onClick(newObj);
  };

  return (
    <View style={[styles.reactionMain, {justifyContent: 'space-between'}]}>
      {REC_ITEMS.map((e, i) => {
        const isSelected = selected === i + 1;
        return (
          <TouchableOpacity
            style={{
              minWidth: '45%',
              marginHorizontal: '.5%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: isSelected ? '#000' : '#fff',
              borderColor: 'rgba(0, 11, 33, 0.20)',
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => onClick && onPress(i + 1)}>
            <Text style={{color: isSelected ? '#fff' : '#000'}}>{e}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const AssesmentQuestion = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const flatListRef = useRef<FlatList<string>>(null);
  const [nextAvilable, setNextAvilable] = useState(false);
  const navigation = useNavigation<StackNavigation>();
  const [load, setLoad] = useState(false);
  const [finalScore, setFinalScore] = useState<number>();
  useEffect(() => {
    const curItem = Object.keys(ASSESMENT_QUESTIONS)[currentIndex];
    const totalItem = ASSESMENT_QUESTIONS[curItem].length;
    const answerLength = Object.keys(answers[curItem] || {}).length;
    if (totalItem === answerLength) {
      setNextAvilable(true);
    } else {
      setNextAvilable(false);
    }
  }, [answers, currentIndex]);

  const handleNext = () => {
    nextAvilable &&
      setCurrentIndex(_ => {
        if (currentIndex === Object.keys(ASSESMENT_QUESTIONS).length - 1) {
          sendData();
          return currentIndex;
        }
        const nextIndex = currentIndex + 1;
        flatListRef.current?.scrollToIndex({animated: true, index: nextIndex});
        return nextIndex;
      });
  };

  const sendData = async () => {
    let answerKeys = Object.values(answers);
    let score = 0;
    for (let i of answerKeys) {
      let asnwersCount = Object.values(i);
      for (let j of asnwersCount) {
        if (j === 2) {
          score += 1;
        }
      }
    }
    setFinalScore(score);
    console.log(answerKeys);
  };

  const onClickReaction = (heading: string, value: any) => {
    setAnswers((e: any) => {
      const val = e[heading];
      const nVal = val ? {...val, ...value} : {...value};
      e[heading] = nVal;
      return {...e};
    });
  };

  const renderItem: ListRenderItem<string> = ({item, index}) => {
    const DATA: string[] | {head: string; body: string}[] =
      ASSESMENT_QUESTIONS[item];
    console.log(DATA);
    const onPressR = (v: any) => {
      onClickReaction(item, v);
    };

    return (
      <ScrollView style={[styles.itemContainer]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: 'rgba(0, 11, 33, 0.10)',
          }}>
          <DGHeading head="Knowledge Assessment Questions" />
          <Text>
            {'<  '}
            <Text style={{fontSize: 20, color: '#0075FF'}}>{`${index + 1}/ ${
              Object.keys(ASSESMENT_QUESTIONS).length
            }`}</Text>
            {'  >'}
          </Text>
        </View>
        <View>
          {DATA.map((e, i) => {
            const IsText = typeof e === 'string';
            const selectedObj = answers[item];
            const selectedNumber = selectedObj ? selectedObj[`${i + 1}`] : 0;
            return (
              <View key={i + JSON.stringify(e)}>
                {IsText ? (
                  <DGHeading head={`${i + 1}.  ${e}`} />
                ) : (
                  <>
                    <DGHeading head={e.head} />
                    <Text style={{marginBottom: 10, fontStyle: 'italic'}}>
                      {e.body}
                    </Text>
                  </>
                )}
                <ReactionComp
                  onClick={onPressR}
                  index={i + 1}
                  selected={selectedNumber}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  };
  if (finalScore !== undefined) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView style={{flex: 1, padding: 16}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              fontStyle: 'italic',
              textAlign: 'center',
              marginTop: 20,
            }}>
            Summary Result
          </Text>
          <Image
            src={`${R2_URL}assesmentresultimg.jpeg`}
            style={{width: '100%', aspectRatio: 1}}
          />
          <Text
            style={{
              fontWeight: '700',
              fontSize: 30,
              color: '#000',
              textAlign: 'center',
            }}>
            You did it !
          </Text>
          <View
            style={{
              padding: 20,
              backgroundColor: '#0075FF',
              borderRadius: 16,
              marginTop: 20,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontStyle: 'italic',
                textAlign: 'center',
              }}>
              Your Score
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 50,
                fontStyle: 'italic',
                fontWeight: '700',
                textAlign: 'center',
              }}>
              {finalScore}/{30}
            </Text>
          </View>
          <View style={{height: 30}} />

          <CustomButton
            label="Retake Assesment"
            onPress={() =>
              navigation.dispatch(StackActions.replace('AssesmentScreen'))
            }
          />
          <View style={{height: 30}} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <BackButtonHeader heading="Feed Back" />
      <FlatList
        ref={flatListRef}
        data={Object.keys(ASSESMENT_QUESTIONS)}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
      <TouchableOpacity
        style={[
          {
            backgroundColor: nextAvilable ? '#000' : 'grey',
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
        {load ? (
          <ActivityIndicator size={'small'} color={'white'} />
        ) : (
          <NextArrow height={30} width={30} />
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AssesmentQuestion;
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  itemContainer: {
    width: width,
    paddingHorizontal: 16,
    flex: 1,
  },
  reactionMain: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  reactionImg: {
    height: 40,
    width: 40,
  },
});
