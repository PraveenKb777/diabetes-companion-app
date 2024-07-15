import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  ListRenderItem,
  Image,
} from 'react-native';
import {NextArrow} from '../assets/Svg';

import one from '../assets/banner/1.png';
import two from '../assets/banner/2.png';
import three from '../assets/banner/3.png';
import four from '../assets/banner/4.png';
import five from '../assets/banner/5.png';
import six from '../assets/banner/6.png';
import seven from '../assets/banner/7.png';
import eight from '../assets/banner/8.png';
import nine from '../assets/banner/9.png';
import ten from '../assets/banner/10.png';
import {ScreenNames} from '../Stack';

const {width} = Dimensions.get('window');

export interface CarouselItem {
  id: string;
  img?: any;
  head: string;
  desc?: String;
  navigation?: ScreenNames[number];
  color?: string;
  video?: string;
}

interface CarouselProps {
  data?: CarouselItem[];
  interval?: number;
}

const Items: CarouselItem[] = [
  {
    id: '8saf89fa0ga8sg0',
    img: one,
    head: 'Eat the Rainbow',
    desc: 'Fill your plate with a variety of colorful fruits and vegetables for a balanced diet.',
  },
  {
    id: '8saf89fhth0ga8sg0',
    img: two,
    head: 'Say No to Junk',
    desc: 'Ditch the junk food and fast food for a healthier you.',
  },
  {
    id: '8saf56hedfa0ga8sg0',
    img: three,
    head: "Don't skip breakfast",
    desc: 'It can slow your metabolism, drain your energy, and increase your risk of diabetes.',
  },
  {
    id: '8saf89fa067jeqqerg8sg0',
    img: four,
    head: 'Step Up Your Game',
    desc: 'Aim for at least 30 minutes of physical activity most days to boost your health.',
  },
  {
    id: '8saf89fa0gfqefg-gwq8',
    img: five,
    head: 'Watch Your Weight',
    desc: 'Regular weight checks can help you maintain a healthy body.',
  },
  {
    id: '8saf896^8139ga8sg0',
    img: six,
    head: 'Stress Less, Live More',
    desc: 'Practice meditation, yoga, or deep breathing to manage stress effectively.',
  },
  {
    id: '8saf89f523+226ga8sg0',
    img: seven,
    head: 'Check In, Stay Well',
    desc: 'Regular medical check-ups are key to keeping your blood sugar and health in check.',
  },
  {
    id: '8saf89fa0wyryweyb8sg0',
    img: eight,
    head: "Don't neglect your sleep",
    desc: 'less than 6-9 hours can disrupt blood glucose hormones, spike cTortisol levels, and cause oxidative stress',
  },
  {
    id: '8saf89bns-sagiwgga8sg0',
    img: nine,
    head: 'Kick the Habit',
    desc: 'Quit smoking and limit alcohol to protect your health.',
  },
  {
    id: '8saf89fa0ga8sg0',
    img: ten,
    head: 'Stay Informed, Stay Healthy',
    desc: 'Keep learning about diabetes management from reliable sources.',
  },
];

const Carousel: React.FC<CarouselProps> = ({data = Items, interval = 8000}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<CarouselItem>>(null);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % data.length;
        flatListRef.current?.scrollToIndex({animated: true, index: nextIndex});
        return nextIndex;
      });
    }, interval);

    return () => clearInterval(autoScroll);
  }, [data.length, interval]);

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

  const renderItem: ListRenderItem<CarouselItem> = ({item}) => (
    <View style={[styles.itemContainer]}>
      <View style={[styles.banner]}>
        <Image source={item.img} style={{height: 70, width: 70}} />
        <View style={[{marginHorizontal: 20}]}>
          <Text style={[styles.itemText]}>{item.head}</Text>
          <Text style={[styles.itemDesc]}>{item.desc}</Text>
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
      <TouchableOpacity
        style={[
          {
            top: 25,
            left: 16,
            position: 'absolute',
            backgroundColor: '#000',
            height: 24,
            width: 24,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 1000,
            transform: [{rotate: '180deg'}],
          },
        ]}
        onPress={handlePrev}>
        <NextArrow height={15} width={15} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          {
            top: 25,
            right: 16,
            position: 'absolute',
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
  );
};

const styles = StyleSheet.create({
  banner: {
    width: '85%',
    height: '100%',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  carouselContainer: {
    // backgroundColor: 'orange',
  },
  itemContainer: {
    width: width,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 14,
    fontWeight: 600,
    color: '#0F0F0F',
  },
  itemDesc: {
    color: '#9D9D9D',
    fontSize: 12,
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

export default Carousel;
