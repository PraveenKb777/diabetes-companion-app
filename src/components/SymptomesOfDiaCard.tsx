import {FC} from 'react';
import {
  ColorValue,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useBottomSheet} from '../context/BottomSheetContext';
import popUpContent from '../popUpContent';
import {R2_URL} from '@env';

const SympromesOfDiaCard: FC<{
  img: any;
  label: string;
  desc?: string;
  itemKey?: string;
  borderColor?: ColorValue;
  width?: any;
  onClick?: () => {};
}> = ({label, onClick, img, itemKey, desc, borderColor, width}) => {
  const {openBottomSheet} = useBottomSheet();
  const value = popUpContent[itemKey || ''];

  const length = value?.content?.length || 0;
  const onPress = () => {
    itemKey && openBottomSheet(value, length > 3);
    onClick && onClick();
  };

  const imgSource =
    typeof img === 'string' ? {src: R2_URL + img} : {source: img};

  return (
    <TouchableOpacity
      activeOpacity={itemKey ? 0 : 1}
      onPress={onPress}
      style={[
        styles.mainCont,
        borderColor ? {borderColor: borderColor} : {},
        width ? {width: width} : {width: 210},
      ]}>
      <Image
        source={img}
        style={[styles.img, width ? {width: width} : {}]}
        {...imgSource}
      />
      <Text style={[styles.text]}>{label}</Text>
      {desc ? <Text style={[styles.text, styles.desc]}>{desc}</Text> : null}
      {itemKey ? (
        <View style={[styles.infoCont]}>
          <Text
            style={{
              color: '#0075FF',
              fontSize: 12,
              fontFamily: '700',
            }}>
            i
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};
export default SympromesOfDiaCard;

const styles = StyleSheet.create({
  mainCont: {
    width: 210,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
    borderRadius: 14,
    overflow: 'hidden',
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginRight: 10,
    flex: 1,
    // paddingLeft: 15,
  },
  img: {
    height: 172,
    width: 186,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: '#0F0F0F',
    width: '70%',
    textAlign: 'center',
  },
  desc: {
    color: '#9D9D9D',
  },
  infoCont: {
    height: 16,
    width: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0075FF',
    borderRadius: 100,
    position: 'absolute',
    right: 30,
    top: 20,
  },
});
