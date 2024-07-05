import {IEGList} from '../screens/ExcerciseGudie';

const importanceOfExcList: IEGList[][] = [
  [
    {
      head: 'Increase in insulin sensitivity reduces blood glucose and even HbA1C level during regular exercise.',
      img: 'ioebloodtest.png',
    },
    {
      head: 'Reduces the risk of heart disease, high blood pressure, bone diseases and unhealthy weight gain.',
      img: 'ioeheartproblem.png',
    },
    {
      head: 'Keeps one flexible and agile.',
      img: 'ioeyoga.png',
    },
    {
      head: 'Helps relieve stress, anxiety and prevents depression.',
      img: 'ioemeditation.png',
    },
  ],
  [
    {
      head: 'Increases strength and stamina.',
      img: 'ioerunning.png',
    },
    {
      head: 'RPromotes sound sleep.',
      img: 'ioesleeping.png',
    },
    {
      head: 'Increases metabolic rate and digestion.',
      img: 'ioesmalllargeintestine.png',
    },
    {
      head: 'Delays the process of aging.',
      img: 'ioeageing.png',
    },
  ],
];

/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {NextArrow} from '../assets/Svg';

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {IBottomSheetContent} from '../context/BottomSheetContext';
import ModyCard from './ModyCard';

const {width} = Dimensions.get('window');
type ISubCarousal = IBottomSheetContent & {videoId: any};

export interface CarouselItem {
  id: string;
  img: any;
  head: string;
  desc: String;
}

interface CarouselProps {
  data?: ISubCarousal[];
  interval?: number;
}

const PaginationDot = ({active}: {active: boolean}) => {
  const width = useSharedValue(active ? 30 : 6);

  React.useEffect(() => {
    width.value = withTiming(active ? 30 : 6, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  }, [width, active]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  return <Animated.View style={[styles.pagenationDot, animatedStyle]} />;
};

const PagenationItem = ({
  activeIndex,
  total = 3,
}: {
  activeIndex: number;
  total?: number;
}) => {
  return (
    <View style={styles.paginationMain}>
      {Array(total)
        .fill(0)
        .map((_, i) => {
          return <PaginationDot key={i} active={activeIndex === i} />;
        })}
    </View>
  );
};

const ImportanceOfExeCarousal: React.FC<CarouselProps> = ({
  data = importanceOfExcList,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<IEGList[]>>(null);

  const handlePrev = () => {
    setCurrentIndex(_ => {
      const prevIndex = currentIndex === 0 ? data.length - 1 : currentIndex - 1;
      flatListRef.current?.scrollToIndex({animated: true, index: prevIndex});
      return prevIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex(_ => {
      const nextIndex = (currentIndex + 1) % data.length;
      flatListRef.current?.scrollToIndex({animated: true, index: nextIndex});
      return nextIndex;
    });
  };

  const renderItem: ListRenderItem<IEGList[]> = ({item}) => (
    <View style={[styles.itemContainer]}>
      <View style={[styles.banner]}>
        {item.map((e, i) => (
          <ModyCard
            item={{img: e.img, head: e.head, id: e.head}}
            key={e.head + i}
          />
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={flatListRef}
        data={importanceOfExcList}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <PagenationItem
          activeIndex={currentIndex}
          total={importanceOfExcList.length}
        />

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[
              {
                backgroundColor: '#000',
                height: 24,
                width: 24,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 1000,
                marginRight: 10,
                transform: [{rotate: '180deg'}],
              },
            ]}
            onPress={handlePrev}>
            <NextArrow height={15} width={15} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                backgroundColor: '#000',
                height: 24,
                width: 24,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 1000,
              },
            ]}
            onPress={handleNext}>
            <NextArrow height={15} width={15} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pagenationDot: {
    height: 6,
    width: 6,
    backgroundColor: '#0075FF',
    borderRadius: 100,
    marginRight: 10,
  },
  paginationMain: {
    flexDirection: 'row',
  },
  banner: {
    width: '100%',
    height: '100%',
    // borderWidth: 1,
    // borderColor: 'rgba(0, 0, 0, 0.20)',
    borderRadius: 10,
    overflow: 'hidden',
    // padding: 16,
  },
  carouselContainer: {
    // backgroundColor: 'orange',
  },
  itemContainer: {
    width: width,
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    height: 380,
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F0F0F',
    marginBottom: 16,
  },
  itemDesc: {
    color: '#9D9D9D',
    fontSize: 14,
    maxWidth: '90%',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ImportanceOfExeCarousal;
