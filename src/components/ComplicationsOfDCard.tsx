import {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useBottomSheet} from '../context/BottomSheetContext';
import popUpContent from '../popUpContent';
import {R2_URL} from '@env';

const ComplicationsOfDCard: FC<{
  img: any;
  label: string;
  itemKey: string;
  onClick?: () => {};
}> = ({label, onClick, img, itemKey}) => {
  const {openBottomSheet} = useBottomSheet();
  const value = popUpContent[itemKey];

  const length = value?.content?.length || 0;
  const onPress = () => {
    openBottomSheet(value, length > 3);
    onClick && onClick();
  };
  const imgSource =
    typeof img === 'string' ? {src: R2_URL + img} : {source: img};

  return (
    <TouchableOpacity onPress={onPress} style={styles.mainCont}>
      <Image source={img} style={styles.img} {...imgSource} />
      <Text style={[styles.text]}>{label}</Text>
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
    </TouchableOpacity>
  );
};
export default ComplicationsOfDCard;

const styles = StyleSheet.create({
  mainCont: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
    borderRadius: 100,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingRight: 4,
  },
  img: {
    height: 30,
    width: 30,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    width: '70%',
  },
  infoCont: {
    height: 16,
    width: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0075FF',
    borderRadius: 100,
  },
});
