import validateAuthentication from "@/modules/authentication/hooks/validateAuthentication";
import {getCookie} from "@/lib/cookiesServerSide";

const getUserAuthenticated = async () => {
  const token = getCookie('token') || "";
  return await validateAuthentication(token.value);
}

export default getUserAuthenticated;