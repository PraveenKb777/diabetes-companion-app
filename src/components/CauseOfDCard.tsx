import {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useBottomSheet} from '../context/BottomSheetContext';
import popUpContent from '../popUpContent';
import {R2_URL} from '@env';
const CauseOfDCard: FC<{
  img: any;
  label: string;
  color?: string;
  itemKey: string;
  onClick?: () => {};
}> = ({label, onClick, img, itemKey, color}) => {
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
      <View
        style={{
          height: 150,
          width: 10,
          position: 'absolute',
          left: 0,
          top: 0,
          backgroundColor: color || '#000',
        }}
      />
      <Image style={styles.img} {...imgSource} />
      <Text style={[styles.text]}>{label}</Text>
      <View style={[styles.infoCont, {alignSelf: 'flex-start'}]}>
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
export default CauseOfDCard;

const styles = StyleSheet.create({
  mainCont: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
    borderRadius: 14,
    overflow: 'hidden',
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingLeft: 15,
  },
  img: {
    height: 60,
    width: 60,
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
