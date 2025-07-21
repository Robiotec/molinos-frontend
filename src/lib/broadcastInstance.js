import Axios from 'axios';

const broadcastInstance = () => {
  return Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + 'broadcasting',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
};

export default broadcastInstance;