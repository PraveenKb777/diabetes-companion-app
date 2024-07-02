/* eslint-disable react-native/no-inline-styles */
import {R2_URL} from '@env';
import {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const BOMBGCard: FC<{
  img: any;
  label: string;
}> = ({label, img}) => {
  const imgSource =
    typeof img === 'string' ? {src: R2_URL + img} : {source: img};

  return (
    <View style={styles.mainCont}>
      <Image source={img} style={styles.img} {...imgSource} />
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text style={[styles.text, styles.desc]}>{label}</Text>
      </View>
      {/* {desc ? <Text style={[styles.text, styles.desc]}>{desc}</Text> : null} */}
    </View>
  );
};
export default BOMBGCard;

const styles = StyleSheet.create({
  mainCont: {
    width: 280,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 14,
    overflow: 'hidden',
    padding: 8,
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginHorizontal: 10,
    // paddingLeft: 15,
  },
  img: {
    height: 172,
    width: 256,
    borderRadius: 10,
    objectFit: 'fill',
    // marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
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
    borderColor: '#fFF',
    borderRadius: 100,
    position: 'absolute',
    right: 30,
    top: 20,
  },
});
