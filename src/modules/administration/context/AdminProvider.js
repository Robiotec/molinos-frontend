import {createContext, useState} from "react";
import {getCookieCS} from "@/lib/cookiesClientSide";
import axios from "@/lib/axios";
import Role from "@/common/endpoints/Role";
import Swal from "sweetalert2";
import User from "@/common/endpoints/User";
import MillRanges from "@/common/endpoints/MillRanges";

const AdminContext = createContext();

const AdminProvider = ({children}) => {

  // New user form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(3);

  // Range form
  const [off, setOff] = useState({
    min: '',
    max: '',
  });
  const [empty, setEmpty] = useState({
    min: '',
    max: '',
  });
  const [normal, setNormal] = useState({
    min: '',
    max: '',
  });
  const [overloaded, setOverloaded] = useState({
    min: '',
    max: '',
  });

  // User list
  const [users, setUsers] = useState([]);

  // Selects
  const [roles, setRoles] = useState([]);

  // Metadata
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmitNewUser = async (event) => {
    event.preventDefault();

    setError(false);
    setErrors([]);

    try {
      const token = getCookieCS('token');
      await axios(token).post(User.REGISTER, {
        name: name,
        email: email,
        password: password,
        role: role,
      })
        .then((response) => {
          Swal.fire({
            title: "Perfecto",
            text: "Usuario registrado correctamente",
            icon: "success"
          });

          setName('');
          setEmail('');
          setPassword('');
        })
        .catch((error) => {
          if (error?.response?.status !== 400) {
            Swal.fire({
              title: "Error",
              text: error?.response?.data?.message ?? 'Se ha producido un error, inténtelo de nuevo más tarde.',
              icon: "error"
            });
          }

          if (error?.response?.status === 400) {
            setErrors(error.response.data);
          }
        })
    } catch (e) {}
  }

  const handleSubmitUpdateRangesForm = async (event, id) => {
    event.preventDefault();

    setError(false);
    setErrors([]);

    try {
      const token = getCookieCS('token');
      await axios(token).put(MillRanges.MILL_RANGES_RESOURCE.formatUnicorn({
        id: id
      }), {
        off,
        empty,
        normal,
        overloaded,
      })
        .then((response) => {
          Swal.fire({
            title: "Perfecto",
            text: "Los cambios se han guardado correctamente",
            icon: "success"
          });
        })
        .catch((error) => {
          if (error?.response?.status !== 400) {
            Swal.fire({
              title: "Error",
              text: error?.response?.data?.message ?? 'Se ha producido un error, inténtelo de nuevo más tarde.',
              icon: "error"
            });
          }

          if (error?.response?.status === 400) {
            Swal.fire({
              title: "Error",
              text: 'Por favor, comprueba los rangos, el mínimo no puede ser mayor que el máximo, y el máximo no puede ser mayor que el mínimo del siguiente bloque.',
              icon: "error"
            });
            setErrors(error.response.data);
          }
        });
    } catch (e) { }
  }

  const loadRoles = async () => {
    try {
      const token = getCookieCS('token');
      await axios(token).get(Role.ROLE_COLLECTION)
        .then((response) => {
          setRoles(response.data.data);
        })
        .catch((error) => {
          if (error?.response) {
            setError(true);
          }
        })
    } catch (e) {  }
  }

  const loadRanges = async (mill_id) => {
    try {
      setLoading(true);
      const token = getCookieCS('token');
      await axios(token).get(MillRanges.MILL_RANGES_RESOURCE.formatUnicorn({
        id: mill_id,
      }))
        .then((response) => {
          setLoading(false);
          setOff({
            ...off,
            min: response.data.off.values[0],
            max: response.data.off.values[1],
          });
          setEmpty({
            ...empty,
            min: response.data.empty.values[0],
            max: response.data.empty.values[1],
          });
          setNormal({
            ...normal,
            min: response.data.normal.values[0],
            max: response.data.normal.values[1],
          });
          setOverloaded({
            ...overloaded,
            min: response.data.overloaded.values[0],
            max: response.data.overloaded.values[1],
          });
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response) {
            setError(true);
          }
        })
    } catch (e) {  }
  }

  const loadUsers = async () => {
    try {
      setLoading(true);
      const token = getCookieCS('token');
      await axios(token).get(User.USER_COLLECTION)
        .then((response) => {
          setLoading(false);
          setUsers(response.data.data);
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response) {
            setError(true);
          }
        })
    } catch (e) {  }
  }

  const resetRangeForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setOff({
      min: '',
      max: '',
    });
    setEmpty({
      min: '',
      max: '',
    });
    setNormal({
      min: '',
      max: '',
    });
    setOverloaded({
      min: '',
      max: '',
    });
  }

  return (
    <AdminContext.Provider value={{
      name: name, setName,
      email: email, setEmail,
      password: password, setPassword,
      role: role, setRole,
      roles: roles,

      off: off, setOff,
      empty: empty, setEmpty,
      normal: normal, setNormal,
      overloaded: overloaded, setOverloaded,

      users: users,

      loading: loading,
      errors: errors,
      error: error,

      handleSubmitNewUser,
      handleSubmitUpdateRangesForm,

      loadRoles,
      loadRanges,
      loadUsers,

      resetRangeForm,
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export {
  AdminProvider
}

export default AdminContext;