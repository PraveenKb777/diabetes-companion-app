import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {CarouselItem} from './Carousal';

const DiabetesMellitusCard: FC<{item: CarouselItem}> = ({item}) => {
  return (
    <View style={[styles.itemContainer]}>
      <View style={[styles.banner]}>
        <Image source={item.img} style={{height: 152, width: '100%'}} />
        <View style={[{marginHorizontal: 12, marginVertical: 16}]}>
          <Text style={[styles.itemText]}>{item.head}</Text>
          <Text style={[styles.itemDesc]}>{item.desc}</Text>
        </View>
      </View>
    </View>
  );
};

export default DiabetesMellitusCard;

const styles = StyleSheet.create({
  itemContainer: {
    // paddingHorizontal: 16,
    // height: "",
    justifyContent: 'center',
    alignItems: 'center',
    width: 263,
    marginRight: 20,
  },
  banner: {
    maxWidth: '100%',
    width: 263,
    // height: '100%',
    height: 250,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
    borderRadius: 14,
    overflow: 'hidden',
  },
  itemText: {
    fontSize: 14,
    fontWeight: 600,
    color: '#0F0F0F',
  },
  itemDesc: {
    color: '#9D9D9D',
    fontSize: 12,
    fontStyle: 'italic',
  },
});
