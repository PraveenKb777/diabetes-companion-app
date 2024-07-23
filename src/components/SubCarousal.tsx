import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
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
import YoutubeIframe from 'react-native-youtube-iframe';
import {
  BottomSheetNobullet,
  BottomSheetYesbullet,
  IBottomSheetContent,
} from '../context/BottomSheetContext';

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

const Items: ISubCarousal[] = [
  {
    videoId: 'aGljCxxb2FQ',
    head: 'Invasive',
    desc: 'Physio-chemical sensor used to measure/scan the level of glucose in blood.',

    content: [
      {
        head: 'Equipment',
        bullet: false,
        desc: 'Lancet, test strip and lancing device ',
      },
      {
        head: 'Procedure',
        bullet: true,
        desc: [
          'Disinfect fingertip.',
          'Insert test strip.',
          'Prick finger with lancet.',
          'Apply blood to strip.',
          'Read result on device.',
        ],
      },
      {
        head: 'Advantages',
        bullet: false,
        desc: 'Most accurate and commonly useable.',
      },
    ],
  },
  {
    videoId: 'Ih8LwZNmxPk',
    head: 'Non-Invasive',
    desc: 'Physio-chemical sensor used to measure/scan the level of glucose in blood.',
    content: [
      {
        head: 'Procedure',
        bullet: true,
        desc: [
          'Place the sensor in the arm area. The sensor senses the blood stream and shows the level of glucose in blood.',
        ],
      },
      {
        head: 'Advantages',
        desc: ' Minimal invasive.',
        bullet: false,
      },
      {
        head: 'Disadvantages',
        desc: 'Not accurate as invasive.',
        bullet: false,
      },
    ],
  },
  {
    videoId: 'z4JZzwgHImY',
    head: 'Continuous Glucose\nMonitoring ',
    desc: 'Sensor on skin (arm/belly) measures interstitial glucose few minutes.\n\t -Wireless date transfer to monitor for continuous tracking.',
    content: [
      {
        head: 'Advantages',
        desc: [
          'Reduces hypoglycemic emergencies.',
          'Improves blood glucose management.',
        ],
        bullet: true,
      },
      {
        head: 'Disadvantages',
        desc: ['Interpreting large data sets can br challenging.'],
        bullet: true,
      },
    ],
  },
];
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

const SubCarousal: React.FC<CarouselProps> = ({
  data = Items,
  interval = 8000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<ISubCarousal>>(null);

  //   useEffect(() => {
  //     const autoScroll = setInterval(() => {
  //       setCurrentIndex(prevIndex => {
  //         const nextIndex = (prevIndex + 1) % data.length;
  //         flatListRef.current?.scrollToIndex({animated: true, index: nextIndex});
  //         return nextIndex;
  //       });
  //     }, interval);

  //     return () => clearInterval(autoScroll);
  //   }, [data.length, interval]);

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

  const renderItem: ListRenderItem<ISubCarousal> = ({item}) => (
    <View style={[styles.itemContainer]}>
      <View style={[styles.banner]}>
        <YoutubeIframe height={180} videoId={item.videoId} />
        {/* <Image
          source={item.videoId}
          style={{height: 153, width: '100%', borderRadius: 10}}
        /> */}
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={[styles.itemText]}>{item.head}</Text>
          <Text style={[styles.itemDesc]}>{item.desc}</Text>

          <View style={{height: 10}} />
          {item.content?.map((e, i) =>
            e.bullet ? (
              <BottomSheetYesbullet item={e} key={i + (e.head || '')} />
            ) : (
              <BottomSheetNobullet item={e} key={i + (e.head || '')} />
            ),
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={flatListRef}
        data={data}
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
        <PagenationItem activeIndex={currentIndex} total={data.length} />

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
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 16,
  },
  carouselContainer: {
    // backgroundColor: 'orange',
  },
  itemContainer: {
    width: width,
    height: 470,
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

export default SubCarousal;
