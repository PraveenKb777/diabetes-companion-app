import React, {FC, useEffect, useState} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CalanderSVG} from '../assets/Svg';

const DatePicker: FC<{onChange?: (date: string) => void; value?: string}> = ({
  onChange,
  value,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    onChange && onChange(moment(selectedDate).format('YYYY-MM-DD'));
  }, [onChange, selectedDate]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          padding: 10,
          borderColor: 'rgba(0, 0, 0, 0.20)',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={showDatePicker}>
        <Text
          style={{
            color: '#000',
          }}>
          {moment(
            value || moment(selectedDate).format('YYYY-MM-DD'),
            'YYYY-MM-DD',
          ).format('MMM, DD YYYY')}
        </Text>
        <View style={{width: 20}} />
        <CalanderSVG />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        maximumDate={new Date()}
        date={selectedDate}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DatePicker;
