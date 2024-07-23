import React, {FC} from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CarouselItem} from './Carousal';
import {R2_URL} from '@env';
import {NextBlueSvg, PlaySVG} from '../assets/Svg';

interface IModyCard {
  item: CarouselItem;
  onPress?: () => void;
  info?: boolean;
  video?: string;
}

const ModyCard: FC<IModyCard> = ({item, onPress, info, video}) => {
  const imgSource =
    typeof item.img === 'string'
      ? {src: R2_URL + item.img}
      : {source: item.img};
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.2 : 1}
      onPress={onPress}
      style={[styles.itemContainer]}>
      <View style={[styles.banner, {paddingLeft: item.color ? 16 : 10}]}>
        {item.color ? (
          <View
            style={{
              height: 150,
              width: 10,
              position: 'absolute',
              left: 0,
              top: 0,
              backgroundColor: item.color || '#000',
            }}
          />
        ) : null}
        {item.img ? (
          <View>
            <Image
              {...imgSource}
              style={{height: 52, width: 52, borderRadius: 100}}
            />
            {video ? (
              <TouchableOpacity
                onPress={() => Linking.openURL(video)}
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 3,
                }}>
                <PlaySVG />
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}
        <View style={[{marginLeft: item.img ? 20 : 0, flex: 1}]}>
          <Text style={[styles.itemText]}>{item.head}</Text>
          {item.desc ? (
            <Text style={[styles.itemDesc]}>{item.desc}</Text>
          ) : null}
        </View>
        {info ? (
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
        ) : onPress ? (
          <NextBlueSvg style={{alignSelf: 'flex-start'}} />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default ModyCard;

const styles = StyleSheet.create({
  itemContainer: {
    // paddingHorizontal: 16,
    // height: "",
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '100%',
    marginBottom: 8,
    overflow: 'hidden',
  },
  banner: {
    maxWidth: '100%',
    // height: '100%',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
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
  infoCont: {
    height: 16,
    width: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#0075FF',
    borderRadius: 100,
  },
});
