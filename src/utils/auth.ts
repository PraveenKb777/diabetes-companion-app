import axios from 'axios';
import {BASE_URL} from '@env';

const auth = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default auth;
