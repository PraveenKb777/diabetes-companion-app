import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NextArrow} from '../assets/Svg';

const {width} = Dimensions.get('window');

const BackButtonHeader: FC<{heading?: string; subHeading?: string}> = ({
  heading,
  subHeading,
}) => {
  const navigation = useNavigation();
  const canGoBack = (navigation.getState()?.routes.length || 0) > 1;
  return (
    <View
      style={{
        width,
        elevation: 5,
        borderWidth: 0,
        backgroundColor: '#fff',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => canGoBack && navigation.goBack()}
        style={[
          {
            backgroundColor: '#000',
            height: 40,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 1000,
            transform: [{rotate: '180deg'}],
          },
        ]}>
        {canGoBack ? <NextArrow height={24} width={24} /> : null}
      </TouchableOpacity>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#000',
            marginLeft: 16,
          }}>
          {heading}
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: '#000',
            marginLeft: 16,
          }}>
          {subHeading}
        </Text>
      </View>
    </View>
  );
};

export default BackButtonHeader;
