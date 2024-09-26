import axios from 'axios';

axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// flattens the layer of nested introduced by axios
// the responses look like { data, error }, but axios nests the whole response under 'data'
instance.interceptors.response.use(
  res => res.data,
  (err) => {
    const error = {
      ...err.response.data.error,
      ...err,
    };

    // console.error(error);
    return Promise.reject(error);
  },
);

export default instance;
