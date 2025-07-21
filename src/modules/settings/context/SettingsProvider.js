import {createContext, useState} from "react";
import {getCookieCS} from "@/lib/cookiesClientSide";
import axios from "@/lib/axios";
import User from "@/common/endpoints/User";
import Swal from "sweetalert2";

const SettingsContext = createContext();

const SettingsProvider = ({children}) => {

  // Change password form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

  // Metadata
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState([]);

  // handlers
  const handleSubmitChangePasswordForm = async (event) => {
    event.preventDefault();

    setError(false);
    setErrors([]);

    try {
      const token = getCookieCS('token');
      await axios(token).post(User.CHANGE_PASSWORD, {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirmation,
      })
        .then((response) => {
          Swal.fire({
            title: "Perfecto",
            text: response.data.message,
            icon: "success",
          });

          resetChangePasswordReset();
        })
        .catch((error) => {
          if (error?.response?.status !== 400) {
            Swal.fire({
              title: "Error",
              text: error?.response?.data?.message ?? 'Se ha producido un error, inténtelo de nuevo más tarde.',
              icon: "error",
            });
          }

          if (error?.response?.status === 400) {
            setErrors(error.response.data);
          }
        })
    } catch (e) {  }
  }

  const resetChangePasswordReset = () => {
    setCurrentPassword('');
    setNewPassword('');
    setNewPasswordConfirmation('');
  }

  return (
    <SettingsContext.Provider value={{
      currentPassword: currentPassword, setCurrentPassword,
      newPassword: newPassword, setNewPassword,
      newPasswordConfirmation: newPasswordConfirmation, setNewPasswordConfirmation,

      loading: loading,
      error: error,
      errors: errors,

      handleSubmitChangePasswordForm,
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

export {
  SettingsProvider
}

export default SettingsContext;