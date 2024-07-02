import {R2_URL} from '@env';
import {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const EGCard: FC<{
  img: any;
  label: string;
  desc?: string;
}> = ({label, img, desc}) => {
  const imgSource =
    typeof img === 'string' ? {src: R2_URL + img} : {source: img};

  return (
    <View style={styles.mainCont}>
      <Image source={img} style={styles.img} {...imgSource} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '100%',
        }}>
        <Text style={[styles.text]}>{label}</Text>
        {desc ? <Text style={[styles.text, styles.desc]}>{desc}</Text> : null}
      </View>
    </View>
  );
};
export default EGCard;

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
    textAlign: 'center',
    fontStyle: 'italic',
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
