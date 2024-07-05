import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {NextArrow} from '../assets/Svg';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface IProfileBtn extends TouchableOpacityProps {
  label: string;
  Svg?: FC<SvgProps>;
  active?: boolean;
  btnStyle?: 'danger' | 'active';
}

const ProfileButton: FC<IProfileBtn> = ({
  Svg,
  label,
  style,
  active,
  btnStyle,
  ...props
}) => {
  const sty = Array.isArray(style) ? [...style] : [style];

  const rotation = useSharedValue(active ? 90 : 0);
  React.useEffect(() => {
    rotation.value = withTiming(active ? 90 : 0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  }, [rotation, active]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value}deg`,
        },
      ],
    };
  });

  return (
    <TouchableOpacity
      style={[
        styles.main,
        btnStyle === 'danger' ? {backgroundColor: '#D32F2F'} : {},
        ...sty,
      ]}
      {...props}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {Svg ? <Svg /> : null}
        <Text
          style={[styles.label, btnStyle === 'danger' ? {color: '#fff'} : {}]}>
          {label}
        </Text>
      </View>
      <Animated.View style={[animatedStyle]}>
        <NextArrow fill={btnStyle === 'danger' ? '#fff' : '#000'} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ProfileButton;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 11, 33, 0.03)',
    borderRadius: 100,
    marginVertical: 10,
  },
  label: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 12,
  },
});
