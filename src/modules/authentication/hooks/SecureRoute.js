import validateAuthentication from "@/modules/authentication/hooks/validateAuthentication";
import {getCookie} from "@/lib/cookiesServerSide";
import {redirect} from "next/navigation";
import routes from "@/common/functions/routes";

const SecureRoute = async (route) => {
  const token = getCookie('token') || "";
  const userAuthenticated = await validateAuthentication(token.value);

  if(!userAuthenticated) {
    redirect('/');
  }

  const userRoles = userAuthenticated.roles.map(role => role.name);
  const allowedRoles = routes.find(r => r.route === route)?.roles;

  const hasPermission = allowedRoles.some(role => userRoles.includes(role));

  console.log(userRoles, allowedRoles, hasPermission);

  if (!hasPermission) {
    redirect('/');
    return false;
  }

  return true;
}

export default SecureRoute;