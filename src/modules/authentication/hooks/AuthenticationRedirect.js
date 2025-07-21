import validateAuthentication from "@/modules/authentication/hooks/validateAuthentication";
import {getCookie} from "@/lib/cookiesServerSide";
import {redirect} from "next/navigation";

const AuthenticationRedirect = async () => {
  const token = getCookie('token') || "";
  const userAuthenticated = await validateAuthentication(token.value);

  if(userAuthenticated) {
    redirect('/dashboard');
  }
}

export default AuthenticationRedirect;