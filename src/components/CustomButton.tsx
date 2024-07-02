import React, {FC} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface ICustomBtn extends TouchableOpacityProps {
  label: string;
  load?: boolean;
}

const CustomButton: FC<ICustomBtn> = ({label, load, style, ...props}) => {
  return (
    <TouchableOpacity style={[styles.mainStyle, style]} {...props}>
      {!load ? (
        <Text style={[styles.lable]}>{label}</Text>
      ) : (
        <ActivityIndicator color={'#FFFFFF'} size={'small'} />
      )}
    </TouchableOpacity>
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
  },
});
