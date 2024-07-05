import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {R2_URL} from '@env';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

interface IUser {
  img?: string;
  id: string;
  name: string;
  email: string;
  age: number;
  gender: 'male' | 'female' | 'other';
}

const HomeHeader = () => {
  const [userObj, setUserObj] = useState<IUser>();
  const navigation = useNavigation();
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const user = JSON.parse((await AsyncStorage.getItem('user')) || '');
    setUserObj(user);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text style={[styles.headerText]}>Hello, {userObj?.name}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProfileScreen' as never)}>
        <Image
          src={userObj?.img || `${R2_URL}100.png`}
          style={{height: 42, width: 42}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    color: '#000',
    fontWeight: 700,
  },
});
