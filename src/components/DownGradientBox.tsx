import React, {FC} from 'react';
import {
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
}

const DownGradientBox: FC<IDownGradientBox> = ({
  style = {},
  img = '',
  label = '',
  onClick = () => {},
  above = false,
}) => {
  const imgSource =
    typeof img === 'string' ? {src: R2_URL + img} : {source: img};
  return (
    <ImageBackground
      {...imgSource}
      //   resizeMode="cover"
      style={[styles.mainCont, style]}>
      <WhiteGradiantBox height={300} style={styles.gradiantPos} />
      <View style={[styles.contentCont]}>
        <Text style={[styles.text, {maxWidth: above ? '100%' : '70%'}]}>
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
    width: 169,
  },

  gradiantPos: {
    position: 'absolute',
    left: 0,
    width: 390,
  },
});
