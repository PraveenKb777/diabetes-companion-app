import axios from 'axios';
import {BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token ? `Bearer ${token}` : null;
};

const auth = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

auth.interceptors.request.use(async function (config) {
  const token = await getToken();
  config.headers.Authorization = token;

  return config;
});

export default auth;
