import {R2_URL} from '@env';
import React, {FC} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';

const DietPrincipalCard: FC<{item: {id: string; img: any; head: string}}> = ({
  item,
}) => {
  const imgSource =
    typeof item.img === 'string'
      ? {src: R2_URL + item.img}
      : {source: item.img};

  return (
    <View style={[styles.itemContainer]}>
      <ImageBackground source={item.img} style={[styles.banner]} {...imgSource}>
        <View style={[styles.textCont]}>
          <Text style={[styles.itemText]}>{item.head}</Text>
          {/* <Text style={[styles.itemDesc]}>{item.desc}</Text> */}
        </View>
      </ImageBackground>
    </View>
  );
};

export default DietPrincipalCard;

const styles = StyleSheet.create({
  itemContainer: {
    // paddingHorizontal: 16,
    // height: "",
    marginRight: 20,
  },
  banner: {
    maxWidth: '100%',
    width: 130,
    // height: '100%',
    minHeight: 200,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
    borderRadius: 14,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  textCont: {
    backgroundColor: '#fff',
    // height: '30%',
    height: 90,
    paddingVertical: 20,
    paddingTop: 10,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 14,
    fontWeight: 600,
    color: '#0F0F0F',
    textAlign: 'center',
  },
  itemDesc: {
    color: '#9D9D9D',
    fontSize: 12,
    fontStyle: 'italic',
  },
});
