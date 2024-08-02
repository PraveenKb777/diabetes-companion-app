import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IUser} from './Profile';
import {R2_URL} from '@env';
import BackButtonHeader from '../components/BackButtonHeader';
import {EditPenSvg} from '../assets/Svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownComponent from '../components/CustomDropDown';
import {TGender} from './SignUp';
import CustomButton from '../components/CustomButton';
import auth from '../utils/auth';
import {useNavigation} from '@react-navigation/native';

const data = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Others', value: 'other'},
];
const ProfileSetting = () => {
  const [user, setUser] = useState<IUser>();
  const [load, setLoad] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const u = JSON.parse((await AsyncStorage.getItem('user')) || '');

    setUser(u);
  };

  const changeUserDetails = (val: any) => {
    setUser(e => ({...e, ...val}));
  };

  const saveChangesAction = async () => {
    setLoad(true);
    try {
      const res = await auth.post('/auth/edit-user', user);
      const data1 = await res.data;
      console.log(data1);
      await AsyncStorage.setItem('user', JSON.stringify(data1.user));
      navigation.goBack();
      ToastAndroid.show(data1.message, ToastAndroid.SHORT);
    } catch (error: any) {
      const msg =
        error.response.data.message ||
        'Something went wrong try again after some time';
      navigation.goBack();
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } finally {
      setLoad(false);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <BackButtonHeader heading="Profile settings" />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{alignItems: 'center', padding: 16}}>
        <Image
          src={user?.img || `${R2_URL}100.png`}
          style={{height: 130, width: 130}}
        />
        <View style={{width: '100%', marginBottom: 10}}>
          <Text style={styles.label}>User Name</Text>
          <View style={{width: '100%'}}>
            <TextInput
              style={styles.input}
              value={user?.name}
              onChangeText={e => changeUserDetails({name: e})}
            />
            <EditPenSvg
              style={{position: 'absolute', right: 10, bottom: '30%'}}
            />
          </View>
        </View>
        <View style={{width: '100%', marginBottom: 10}}>
          <Text style={styles.label}>Email ID</Text>
          <View style={{width: '100%'}}>
            <TextInput
              style={styles.input}
              value={user?.email}
              onChangeText={e => changeUserDetails({email: e})}
            />
            <EditPenSvg
              style={{position: 'absolute', right: 10, bottom: '30%'}}
            />
          </View>
        </View>
        <View style={{width: '100%'}}>
          <Text style={styles.label}>Age</Text>
          <View style={{width: '100%'}}>
            <TextInput
              style={styles.input}
              maxLength={2}
              value={user?.age + ''}
              onChangeText={e => changeUserDetails({age: e})}
            />
            <EditPenSvg
              style={{position: 'absolute', right: 10, bottom: '30%'}}
            />
          </View>
          <View style={{height: 30}} />
          <Text style={styles.label}>Gender</Text>
          <DropdownComponent
            data={data}
            labelField={'label' as never}
            onChange={(e: {label: string; value: TGender}) =>
              changeUserDetails({gender: e.value})
            }
            valueField={'value' as never}
            additionalDropDownStyle={[styles.inputStyle]}
            value={user?.gender}
          />
          <View style={{height: 30}} />
          <CustomButton
            label="Save changes"
            load={load}
            onPress={saveChangesAction}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileSetting;

const styles = StyleSheet.create({
  label: {
    fontStyle: 'italic',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
    color: '#000',
  },
  inputStyle: {
    marginVertical: 5,
    width: '100%',
  },
});
