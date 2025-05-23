import {FC} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface IWhiteGradiantBox {
  style?: StyleProp<ViewStyle>;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  height?: number;
  color?: (string | number)[];
}

const WhiteGradiantBox: FC<IWhiteGradiantBox> = ({
  style,
  direction,
  height = 500,
  color,
}) => {
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
      colors={color ? color : ['rgba(254,254,255,1)', 'rgba(255,254,254,0)']}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 0.7}}
      style={[
        styles.gradient,
        {
          height,
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
