import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const NothingToShow = () => {
  const animation = useAnimatedStyle(() => {
    const val = withRepeat(
      withSequence(
        withTiming(360 + 'deg', {duration: 2000, easing: Easing.linear}),
        withTiming(0 + 'deg', {duration: 2000, easing: Easing.linear}),
      ),
      -1,
    );

    return {
      transform: [
        {
          rotateY: val,
        },
      ],
    };
  }, []);

  return (
    <View style={styles.nothingToShow}>
      <Animated.View style={animation}>
        <Text style={styles.warning}>!</Text>
      </Animated.View>
      <Text style={styles.headText}>Nothing To Show Here</Text>
      <Text style={[styles.headText, styles.desc]}>
        Kindly Add new Entry or try different date
      </Text>
    </View>
  );
};

export default NothingToShow;

const styles = StyleSheet.create({
  nothingToShow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headText: {
    fontSize: 26,
    textAlign: 'center',
  },
  warning: {
    padding: 20,
    borderRadius: 100,
    borderWidth: 1,
    aspectRatio: 1,
    textAlign: 'center',
    color: 'grey',
    borderColor: 'grey',
    fontSize: 100,
    marginBottom: 30,
  },
  desc: {
    fontSize: 16,
    color: '#00000080',
    marginTop: 10,
  },
});
