import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';

export const Radios: FC<{
  selected?: boolean;
  label?: string;
  onClick?: () => void;
}> = ({selected, label, onClick}) => {
  return (
    <TouchableOpacity style={styles.radioMain} onPress={onClick && onClick}>
      <View style={[styles.outerRing, selected ? {borderColor: '#000'} : {}]}>
        {selected ? <View style={styles.innerCircle} /> : null}
      </View>
      <Text style={{color: selected ? '#000' : undefined}}>{label}</Text>
    </TouchableOpacity>
  );
};

const RadioButtons: FC<{
  list: any[];
  onChange?: (e: number) => void;
  value?: number;
}> = ({list, value, onChange}) => {
  return (
    <View>
      {list.map((e, i) => (
        <Radios
          key={e + i}
          label={e}
          selected={value === i}
          onClick={() => onChange && onChange(i)}
        />
      ))}
    </View>
  );
};

export default RadioButtons;

const styles = StyleSheet.create({
  radioMain: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  outerRing: {
    borderColor: '#9D9D9D',
    borderWidth: 1.5,
    borderRadius: 100,
    height: 15,
    width: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  innerCircle: {
    width: '80%',
    height: '80%',
    backgroundColor: '#000',
    borderRadius: 100,
  },
});
