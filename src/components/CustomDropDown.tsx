import React, {FC} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {DropdownProps} from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';

interface DDProps extends DropdownProps<{label: string; value: string | any}> {
  additionalDropDownStyle?: StyleProp<ViewStyle>;
}

const CustomDropDown: FC<DDProps> = ({additionalDropDownStyle, ...props}) => {
  return (
    <Dropdown
      style={[styles.dropdown, additionalDropDownStyle]}
      iconStyle={styles.iconStyle}
      placeholder="Gender"
      placeholderStyle={[{color: 'rgba(0, 11, 33, .2)'}]}
      maxHeight={300}
      itemTextStyle={[{padding: 0}]}
      itemContainerStyle={[
        {
          borderColor: 'rgba(0, 11, 33, .1)',
          backgroundColor: 'rgba(0, 11, 33, .02)',
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 8,
          marginVertical: 2,
        },
      ]}
      containerStyle={[
        {
          borderRadius: 5,
          padding: 5,
        },
      ]}
      selectedTextStyle={[{color: 'black'}]}
      {...props}
    />
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'rgba(0, 11, 33, .1)',
    backgroundColor: 'rgba(0, 11, 33, .02)',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
