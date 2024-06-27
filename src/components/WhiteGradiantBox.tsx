import {FC} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface IWhiteGradiantBox {
  style?: StyleProp<ViewStyle>;
  direction?: 'left' | 'right' | 'top' | 'bottom';
}

const WhiteGradiantBox: FC<IWhiteGradiantBox> = ({style, direction}) => {
  const deg =
    direction === 'bottom'
      ? 0
      : direction === 'left'
      ? 90
      : direction === 'right'
      ? 270
      : 180;

  return (
    <LinearGradient
      colors={['rgba(254,254,255,1)', 'rgba(255,254,254,0)']}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 0.7}}
      style={[
        styles.gradient,
        {
          transform: [
            {
              rotate: `${deg}deg`,
            },
          ],
        },
        style,
      ]}
    />
  );
};

export default WhiteGradiantBox;

const styles = StyleSheet.create({
  text: {},
  gradient: {
    height: 500,
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
});
