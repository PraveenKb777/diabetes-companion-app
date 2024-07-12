import React, {forwardRef} from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface ICustomTextInput extends TextInputProps {
  mainContStyle?: StyleProp<ViewStyle>;
  prefixIcon?: any;
  suffixIcon?: any;
  suffixIconTap?: () => void;
}

const CustomTextinput = forwardRef<TextInput, ICustomTextInput>(
  (
    {mainContStyle = {}, prefixIcon, suffixIcon, suffixIconTap, ...props},
    ref,
  ) => {
    return (
      <View style={[styles.mainCont, mainContStyle]}>
        {prefixIcon ? (
          <Image source={prefixIcon} height={10} width={10} />
        ) : null}
        <TextInput
          placeholderTextColor={'rgba(0, 11, 33, .2)'}
          style={[{marginLeft: 5, flex: 1, color: '#000'}, props.style]}
          cursorColor={'rgba(0, 11, 33, .4)'}
          ref={ref}
          {...props}
        />
        {suffixIcon ? (
          <TouchableOpacity
            activeOpacity={suffixIcon ? 0 : 1}
            onPress={suffixIconTap || undefined}>
            <Image source={suffixIcon} height={10} width={10} />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  },
);

export default CustomTextinput;

const styles = StyleSheet.create({
  mainCont: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 11, 33, .1)',
    backgroundColor: 'rgba(0, 11, 33, .02)',
    borderRadius: 5,
  },
});
