import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {R2_URL} from '@env';

import React, {FC} from 'react';
interface IExcersiseImgCard {
  label: string;
  img: any;
  desc?: string;
  onClick?: () => void;
}

const ExcersiseImgCard: FC<IExcersiseImgCard> = ({
  img,
  label,
  onClick,
  desc,
}) => {
  const imgSource =
    typeof img === 'string' ? {src: R2_URL + img} : {source: img};
  return (
    <TouchableOpacity onPress={onClick} style={styles.mainCont}>
      <Image source={img} style={styles.img} {...imgSource} />
      <Text
        style={{
          color: '#000',
          fontStyle: 'italic',
          marginTop: 10,
          textAlign: 'center',
        }}>
        {label}
      </Text>
      <Text style={{textAlign: 'center'}}>{desc}</Text>
    </TouchableOpacity>
  );
};

const {width} = Dimensions.get('window');

export default ExcersiseImgCard;

const styles = StyleSheet.create({
  mainCont: {
    width: (width * 45) / 100,
    marginBottom: 20,
  },
  img: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    objectFit: 'fill',
  },
});
