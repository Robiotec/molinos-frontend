import {createContext, useEffect, useState} from "react";
import { useRouter } from "next/navigation"
import axios from "@/lib/axios";
import Authentication from "@/common/endpoints/Authentication";
import {deleteCookieCS, getCookieCS, setCookieCS} from "@/lib/cookiesClientSide";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

  const router = useRouter();

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setError(null);
    setErrors([]);

    try {
      setLoading(true);

      await axios().post(Authentication.AUTH_LOGIN, {
        email: email,
        password: password,
      })
        .then((response) => {

          // Se guarda la cookie
          const exp = response.data.expires_in * 60;
          setCookieCS('token', response.data.token, {
            maxAge: exp
          });

          // Se resetea el formulario
          setEmail('');
          setPassword('');

          // Se redirige al Dash
          router.push('/dashboard');

          // Se borran los errores y se cambia el estado de carga
          setErrors([]);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);

          if (error?.response?.status === 400) {
            setErrors(error.response.data);
          }

          if (error?.response?.status === 401) {
            setError(error.response.data.message);
          }
        })

    } catch (error) {  }
  }

  const handleLogout = async () => {
    try {
      const token = getCookieCS('token');
      await axios(token).post(Authentication.AUTH_LOGOUT)
        .then((response) => {
          deleteCookieCS('token');
          setDefaultValue();
        })
        .catch((error) => {
          router.push('/');
        });
    } catch (error) { }
  }

  const loadAuthenticatedUser = async () => {
    try {
      const token = getCookieCS('token');

      if (!token) {
        return;
      }

      await axios(token).post(Authentication.AUTH_ME)
        .then((response) => {
          setUser(response.data);
        })

    } catch (error) { }
  }

  const setDefaultValue = () => {
    setUser(null);
    setEmail('');
    setPassword('');
    setError(null);
    setErrors([]);
    setLoading(false);
  }

  useEffect(() => {
    loadAuthenticatedUser();
  }, [loading])

  return (
    <AuthContext.Provider value={{
      // variables
      user: user,
      email: email,
      password: password,
      error: error,
      errors: errors,
      loading: loading,


      // functions
      setUser,
      setEmail,
      setPassword,
      setError,
      setErrors,
      setLoading,

      //handle
      handleLogin,
      handleLogout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthProvider
}

export default AuthContext;