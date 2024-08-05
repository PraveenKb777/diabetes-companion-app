import {BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {StackNavigation} from '../Stack';

let navigator: StackNavigation;

export const setNavigator = (nav: StackNavigation) => {
  navigator = nav;
};

const getToken = async (): Promise<string | null> => {
  const token = await AsyncStorage.getItem('token');
  return token ? `Bearer ${token}` : null;
};

const auth = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

auth.interceptors.request.use(async function (config) {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = token;
  }

  const state = await NetInfo.fetch();
  if (!state.isConnected) {
    navigator.navigate('NoInternetScreen');
    return Promise.reject(new Error('No internet connection'));
  }

  return config;
});

auth.interceptors.response.use(
  response => response,
  error => {
    console.log(error);
    if (error.response.status) {
      error.response.status === 401 &&
        navigator.reset({routes: [{name: 'LoginScreen'}]});
    }
    if (!error.response) {
      navigator.navigate('NoInternetScreen');
    }
    return Promise.reject(error);
  },
);

export default auth;
