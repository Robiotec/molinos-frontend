'use client';

import useSettings from "@/modules/settings/hooks/useSettings";

export default function ChangePasswordForm() {

  const {
    currentPassword, setCurrentPassword,
    newPassword, setNewPassword,
    newPasswordConfirmation, setNewPasswordConfirmation,

    loading,
    error,
    errors,

    handleSubmitChangePasswordForm,
  } = useSettings();

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title display-6">Cambiar contraseña</h5>
        <p className="card-text">
          Cambiar la contraseña de tu cuenta y mantener tus datos seguros.
        </p>
      </div>
      <div className="card-body">
        <form
          onSubmit={handleSubmitChangePasswordForm}
          className="row g-3"
        >

          {error && (
            <div className="alert alert-danger small" role="alert">
              {error}
            </div>
          )}

          <div className="col-md-12">
            <div className={`form-floating mb-1 ${errors?.current_password ? 'is-invalid' : ''}`}>
              <input
                id="current_password"
                name="current_password"
                type="password"
                className={`form-control ${errors?.current_password ? 'is-invalid' : ''}`}
                placeholder="Contraseña actual"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                required={true}
              />
              <label htmlFor="ranges[off][min]">Contraseña actual</label>
            </div>
            {errors?.current_password && (
              <div className="invalid-feedback">
                {errors.current_password.map((error) => error)}
              </div>
            )}
          </div>
          <div className="col-md-12">
            <div className={`form-floating mb-1 ${errors?.new_password ? 'is-invalid' : ''}`}>
              <input
                id="new_password"
                name="new_password"
                type="password"
                className={`form-control ${errors?.new_password ? 'is-invalid' : ''}`}
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                required={true}
              />
              <label htmlFor="ranges[off][min]">Nueva contraseña</label>
            </div>
            {errors?.new_password && (
              <div className="invalid-feedback">
                {errors.new_password.map((error) => error)}
              </div>
            )}
          </div>
          <div className="col-md-12">
            <div className={`form-floating mb-1 ${errors?.new_password_confirmation ? 'is-invalid' : ''}`}>
              <input
                id="new_password_confirmation"
                name="new_password_confirmation"
                type="password"
                className={`form-control ${errors?.new_password_confirmation ? 'is-invalid' : ''}`}
                placeholder="Confirma nueva contraseña"
                value={newPasswordConfirmation}
                onChange={(event) => setNewPasswordConfirmation(event.target.value)}
                required={true}
              />
              <label htmlFor="new_password_confirmation">Confirma nueva contraseña</label>
            </div>
            {errors?.new_password_confirmation && (
              <div className="invalid-feedback">
                {errors.new_password_confirmation.map((error) => error)}
              </div>
            )}
          </div>
          <div className="col-12">
            <button className="btn btn-primary w-100 py-2" type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  )
}