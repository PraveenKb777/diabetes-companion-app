import {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useBottomSheet} from '../context/BottomSheetContext';
import popUpContent from '../popUpContent';
import {R2_URL} from '@env';

const TestForDCard: FC<{
  img: any;
  label: string;
  itemKey: string;
  desc?: string;
  testNo?: number;
  onClick?: () => {};
}> = ({label, onClick, img, itemKey, desc, testNo}) => {
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
    <View style={styles.mainCont}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Image source={img} style={styles.img} {...imgSource} />
        <View style={{width: '60%'}}>
          <Text style={[styles.textNo]}>Test {testNo}</Text>
          <Text style={[styles.text]}>{label}</Text>
        </View>
        <TouchableOpacity onPress={onPress} style={[styles.infoCont]}>
          <Text
            style={{
              color: '#fff',
              fontSize: 12,
              fontFamily: '700',
              fontStyle: 'italic',
            }}>
            More
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{marginTop: 20}}>{desc}</Text>
    </View>
  );
};
export default TestForDCard;

const styles = StyleSheet.create({
  mainCont: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
    padding: 12,
  },
  textNo: {},
  img: {
    height: 50,
    width: 50,
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  infoCont: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0075FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    alignSelf: 'center',
  },
});
