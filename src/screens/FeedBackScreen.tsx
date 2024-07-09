import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';

import avg from '../assets/reactions/avg.png';
import avgFill from '../assets/reactions/avgFill.png';
import excellent from '../assets/reactions/excellent.png';
import excellentFill from '../assets/reactions/excellentFill.png';
import good from '../assets/reactions/good.png';
import goodFill from '../assets/reactions/goodFill.png';
import poor from '../assets/reactions/poor.png';
import poorFill from '../assets/reactions/poorFill.png';
import worst from '../assets/reactions/worst.png';
import worstFill from '../assets/reactions/worstFill.png';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {NextArrow} from '../assets/Svg';
import {DGHeading} from './DiabetesGuide';
import auth from '../utils/auth';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../Stack';
import BackButtonHeader from '../components/BackButtonHeader';

const REC_ITEMS = [
  [worst, worstFill],
  [poor, poorFill],
  [avg, avgFill],
  [good, goodFill],
  [excellent, excellentFill],
];

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
    <View style={[styles.reactionMain, {}]}>
      {REC_ITEMS.map((e, i) => (
        <TouchableOpacity
          style={{
            minWidth: '19%',
            marginHorizontal: '.5%',
          }}
          onPress={() => onClick && onPress(i + 1)}>
          <Image
            style={[styles.reactionImg]}
            source={selected === i + 1 ? e[1] : e[0]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const FeedBackQuestions: {[key: string]: any} = {
  'User Interaction': [
    'Find myself using this app frequently.',
    'I am likely to recommend this app to others.',
    'I enjoy using this app.',
    'I am motivated to continue using this app.',
    'This app keeps my attention well.',
  ],
  Accessibility: [
    'Learning how to use this app is easy.',
    'Navigating this app is easy.',
    'This app rarely crashes or freezes.',
    'This app loads quickly.',
  ],
  Design: [
    'This app’s design is visually appealing.',
    'The text on this app is easy to read.',
    'This app’s layout is well-organized.',
  ],
  'Information Quality': [
    'This information in this app is accurate.',
    'The information in this app is up-to-date.',
    'The information in this app is revealed to my need.',
    'The information in this app is easy to understand.',
    'The information in this app is trustworthy.',
    'The information in this app is well-referenced.',
    'The information in this app is comprehensive.',
  ],
  'Subjective quality Assessment': [
    'I am likely to recommended this app to other.',
    'I expect to use this app frequently.',
    'I would be willing to pay for this app.',
    'Overall, I rate this app as.',
  ],
  'Application-specific questions': [
    {
      head: 'Awareness',
      body: 'This app is likely to increase awareness of the importance of managing Diabetes and Maturity Onset Diabetes of the Young (MODY).',
    },
    {
      head: 'Knowledge',
      body: 'This app is likely to increase knowledge and understand of Diabetes, MODY and its management.',
    },
    {
      head: 'Attitudes',
      body: 'This app is likely to change attitudes towards self management Diabetes and MODY effectively.',
    },
    {
      head: 'Intention to Change',
      body: 'This app is likely to increase motivation and willingness to manage Diabetes and MODY effectively.',
    },
    {
      head: 'Self-Management',
      body: 'This app’s educational module and tools are likely to help users effectively manage their Diabetes and MODY.',
    },
    {
      head: 'Help Seeking',
      body: 'This app is likely to encourage users to seek further help from healthcare professionals when needed.',
    },
  ],
};

const FeedBackScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const flatListRef = useRef<FlatList<string>>(null);
  const [nextAvilable, setNextAvilable] = useState(false);
  const navigation = useNavigation<StackNavigation>();
  const [load, setLoad] = useState(false);
  const [checkLoad, setCheckLoad] = useState(false);
  const checkFeedBackSubmitted = useCallback(async () => {
    try {
      setCheckLoad(true);
      const res = await auth.get('/feedback/check');
      const {success} = await res.data;
      if (success) {
        navigation.navigate('ProfileScreen');
        ToastAndroid.show(
          'User Feedback has been registered already so going back to profile screen',
          ToastAndroid.SHORT,
        );
      }
    } catch (error: any) {
      console.log(error);
      console.log(error.response);
    } finally {
      setCheckLoad(false);
    }
  }, [navigation]);
  useEffect(() => {
    checkFeedBackSubmitted();
  }, [checkFeedBackSubmitted]);

  useEffect(() => {
    const curItem = Object.keys(FeedBackQuestions)[currentIndex];
    const totalItem = FeedBackQuestions[curItem].length;
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
        if (currentIndex === Object.keys(FeedBackQuestions).length - 1) {
          sendData();
          return currentIndex;
        }
        const nextIndex = currentIndex + 1;
        flatListRef.current?.scrollToIndex({animated: true, index: nextIndex});
        return nextIndex;
      });
  };

  const sendData = async () => {
    try {
      setLoad(true);
      setNextAvilable(false);
      const res = await auth.post('/feedback', {answers});
      const {message} = await res.data;
      navigation.navigate('ProfileScreen');
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } catch (error: any) {
      console.log(error);
      console.log(error.response);
      const msg = error?.response?.data?.message || 'Something went wrong';
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } finally {
      setLoad(false);
    }
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
      FeedBackQuestions[item];
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
          <DGHeading head={item} />
          <Text>
            {'<  '}
            <Text style={{fontSize: 20, color: '#0075FF'}}>{`${index + 1}/ ${
              Object.keys(FeedBackQuestions).length
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

  if (checkLoad) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color={'#0075FF'} />
      </View>
    );
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <BackButtonHeader heading="Feed Back" />
      <FlatList
        ref={flatListRef}
        data={Object.keys(FeedBackQuestions)}
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

export default FeedBackScreen;
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
