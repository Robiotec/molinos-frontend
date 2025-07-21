import Axios from 'axios';

const axios = (token) => {
  return Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    ...token && { headers: {'Authorization' : `Bearer ${token}`} }
  })
};

export default axios;