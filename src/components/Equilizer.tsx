import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

const NUMBER_OF_BARS = 3;
const BAR_HEIGHT = 10;

const Equalizer = () => {
  const bars = new Array(NUMBER_OF_BARS).fill(0).map(() => useSharedValue(10));

  useEffect(() => {
    bars.forEach((bar, index) => {
      bar.value = withRepeat(
        withSequence(
          withTiming(Math.random() * BAR_HEIGHT, {duration: 500}),
          withTiming(Math.random() * BAR_HEIGHT, {duration: 500}),
        ),
        -1,
        true,
      );
    });
  }, [bars]);

  return (
    <View style={styles.container}>
      {bars.map((bar, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          height: bar.value,
        }));

        return (
          <Animated.View key={index} style={[styles.bar, animatedStyle]} />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    height: BAR_HEIGHT,
  },
  bar: {
    width: 5,
    backgroundColor: 'white',
    marginHorizontal: 2,
  },
});

export default Equalizer;
