import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://ec2-52-91-35-219.compute-1.amazonaws.com:8000/api',
});

export default instance;
