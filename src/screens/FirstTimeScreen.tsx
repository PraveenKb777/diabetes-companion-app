import React, {FC, useState} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import WhiteGradiantBox from '../components/WhiteGradiantBox';

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import one from '../assets/InitialScreen/1.png';
import two from '../assets/InitialScreen/2.png';
import three from '../assets/InitialScreen/3.png';

import {NextArrow as NArrow} from '../assets/Svg';
import {StackActions, useNavigation} from '@react-navigation/native';

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

interface ISlidesFirstTimeScreen {
  source: any;
  head: string;
  subHead: string;
}

const SlidesFirstTimeScreen: FC<ISlidesFirstTimeScreen> = ({
  head,
  source,
  subHead,
}) => {
  return (
    <ImageBackground source={source} style={styles.imagebg}>
      <WhiteGradiantBox
        key={'gradianttwo'}
        style={[styles.gradientPos, {top: 0}]}
        direction="bottom"
      />
      <WhiteGradiantBox style={styles.gradientPos} />

      <View style={styles.textMain}>
        <Text style={[styles.head, {fontWeight: 800}]}>{head}</Text>
        <Text style={[styles.subHead, {fontWeight: 400}]}>{subHead}</Text>
      </View>
    </ImageBackground>
  );
};

const NextArrow: FC<{onCLick: () => void}> = ({onCLick}) => {
  return (
    <TouchableOpacity
      onPress={onCLick}
      style={[
        {
          position: 'absolute',
          bottom: 40,
          right: 10,
          backgroundColor: '#000',
          height: 48,
          width: 48,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 1000,
        },
      ]}>
      <NArrow height={24} width={24} />
    </TouchableOpacity>
  );
};

const FirstTimeScreen = () => {
  const [index, setIndex] = useState<number>(0);
  const navigation = useNavigation();
  const onCLick = () => {
    if (index !== 2) {
      setIndex(e => e + 1);
    } else {
      navigation.dispatch(StackActions.replace('SignUpScreen'));
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      {index === 0 ? (
        <SlidesFirstTimeScreen
          source={one}
          head="Empowering Your Diabetes Management"
          subHead="Access comprehensive diabetes information and tools to manage your health."
        />
      ) : index === 1 ? (
        <SlidesFirstTimeScreen
          source={two}
          head="Taking Control of Your Health"
          subHead="Real-time risk assessment and detailed diabetes education for effective management."
        />
      ) : (
        <SlidesFirstTimeScreen
          source={three}
          head="Your Personal Diabetes Companion"
          subHead="Plan balanced meals, understand your risks, and learn about diabetes with ease."
        />
      )}
      <View style={styles.logoMain}>
        <Image
          style={{height: 51, width: 51}}
          src="https://personal.pkbmg.shop/Rectangle%2031%20(1).png"
        />
      </View>
      <NextArrow onCLick={onCLick} />
      <PagenationItem activeIndex={index} />
    </SafeAreaView>
  );
};

export default FirstTimeScreen;

const styles = StyleSheet.create({
  safeAreaStyle: {flex: 1},
  gradientPos: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  imagebg: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  pagenationDot: {
    height: 6,
    width: 6,
    backgroundColor: '#A0E2F7',
    borderRadius: 100,
    marginRight: 10,
  },
  head: {
    fontFamily: 'Roboto',

    fontSize: 20,
    color: '#100F0F',
  },

  subHead: {
    fontFamily: 'Roboto',
    // fontWeight: 400,
    fontSize: 14,
    color: '#9D9D9D',
  },
  logoMain: {
    position: 'absolute',
    top: 40,
    height: 40,
    width: 40,
    left: 21,
  },
  textMain: {padding: 10, maxWidth: '80%', marginBottom: 30},
  paginationMain: {
    position: 'absolute',
    bottom: 0,
    margin: 10,
    flexDirection: 'row',
  },
});
