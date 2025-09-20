import React, {FC} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {ViewAllSVG} from '../assets/Svg';

interface ICustomBtn extends TouchableOpacityProps {
  label: string;
  load?: boolean;
  subLable?: string;
}

const CustomButton: FC<ICustomBtn> = ({
  label,
  subLable,
  load,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles.mainStyle, style]} {...props}>
      {!load ? (
        <>
          <Text style={[styles.lable]}>{label}</Text>
          {subLable ? (
            <Text style={[styles.lable, {fontSize: 8}]}>{subLable}</Text>
          ) : null}
        </>
      ) : (
        <ActivityIndicator color={'#FFFFFF'} size={'small'} />
      )}
    </TouchableOpacity>
  );
};
export const CustomModyButton: FC<ICustomBtn> = ({
  label,
  subLable,
  load,
  style,
  ...props
}) => {
  return (
    <View
      style={[
        styles.mainStyle,
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        },
        style,
      ]}>
      <Text
        style={[
          styles.lable,
          {
            width: '50%',
            textAlign: 'left',
            fontSize: 14,
            textTransform: 'none',
          },
        ]}>
        {label}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#FFF',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          borderRadius: 5,
          paddingHorizontal: 20,
        }}
        {...props}>
        <Text style={{color: '#0075FF', fontWeight: '500', fontSize: 12}}>
          {'View All'}
        </Text>
        <ViewAllSVG />
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  mainStyle: {
    backgroundColor: '#0075FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 5,
  },
  lable: {
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
