import axios from "@/lib/axios";
import Authentication from "@/common/endpoints/Authentication";

const validateAuthentication = async (token) => {
  if(!token) return null;

  try {
    const response  = await axios(token).post(Authentication.AUTH_ME);
    return(response.data);
  } catch (error) {
    return null;
  }
}

export default validateAuthentication;
