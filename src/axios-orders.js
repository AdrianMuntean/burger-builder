import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://burger-builder-be915.firebaseio.com/'
});

export default axiosInstance;