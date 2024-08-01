import React, {FC} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {RoundedNextSvg} from '../assets/Svg';
import WhiteGradiantBox from './WhiteGradiantBox';
import {R2_URL} from '@env';

interface IDownGradientBox {
  style?: StyleProp<ViewStyle>;
  img?: any;
  onClick?: () => void;
  label?: string;
  above?: boolean;
  color?: (string | number)[];
  fontSize?: number;
  fontStyle?: 'normal' | 'italic' | undefined;
}

const DownGradientBox: FC<IDownGradientBox> = ({
  style = {},
  img = '',
  label = '',
  onClick = () => {},
  above = false,
  fontSize,
  color,
  fontStyle,
}) => {
  const imgSource =
    typeof img === 'string' ? {src: R2_URL + img} : {source: img};
  return (
    <ImageBackground
      {...imgSource}
      //   resizeMode="cover"
      style={[styles.mainCont, style]}>
      <WhiteGradiantBox color={color} height={300} style={styles.gradiantPos} />
      <View style={[styles.contentCont]}>
        <Text
          style={[
            styles.text,
            {maxWidth: above ? '100%' : '70%'},
            color ? {color: '#fff'} : {},
            {fontSize, fontStyle},
          ]}>
          {label}
        </Text>
        <TouchableOpacity
          style={above ? {position: 'absolute', top: 0, right: 0} : {}}
          onPress={onClick}>
          <RoundedNextSvg height={40} width={40} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default DownGradientBox;
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  contentCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    margin: 10,
    flex: 1,
  },
  text: {
    fontWeight: 500,
    fontSize: 14,

    color: '#000',
  },
  mainCont: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
    justifyContent: 'flex-end',
    // elevation: 5,
    height: 200,
    width: (width * 45) / 100,
  },

  gradiantPos: {
    position: 'absolute',
    left: 0,
    width: 390,
  },
});
