'use client';

import useAdmin from "@/modules/administration/hooks/useAdmin";
import {useEffect} from "react";

export default function NewUserForm() {

  const {
    name, setName,
    email, setEmail,
    password, setPassword,
    role, setRole,
    roles,

    errors,
    error,

    loadRoles,
    handleSubmitNewUser
  } = useAdmin();

  useEffect(() => {
    loadRoles();
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title display-6">Registra un nuevo usuario</h5>
        <p className="card-text">
          Crear un nuevo usuario asignándole un rol correspondiente en el sistema.
        </p>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmitNewUser} className="row g-3 needs-validation">

          {error && (
            <div className="alert alert-danger small" role="alert">
              {error}
            </div>
          )}

          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Nombres</label>
            <input
              type="text"
              className={`form-control ${errors?.name? 'is-invalid': ''}`}
              id="name"
              onChange={(event) => setName(event.target.value)}
              value={name}
              required
            />
            {errors?.name && (
              <div className="invalid-feedback">
                {errors.name.map((error) => error)}
              </div>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className={`form-control ${errors?.email? 'is-invalid': ''}`}
              id="email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              required
            />
            {errors?.email && (
              <div className="invalid-feedback">
                {errors.email.map((error) => error)}
              </div>
            )}
          </div>
          <div className="col-md-7">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className={`form-control ${errors?.password? 'is-invalid': ''}`}
              id="password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              required
            />
            {errors?.password && (
              <div className="invalid-feedback">
                {errors.password.map((error) => error)}
              </div>
            )}
          </div>
          <div className="col-md-5">
            <label htmlFor="role" className="form-label">Rol</label>
            <select
              className={`form-select ${errors?.role? 'is-invalid': ''}`}
              id="role" value={role}
              onChange={(event) => setRole(parseInt(event.target.value))}
              required>
              {roles && roles.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
            {errors?.role && (
              <div className="invalid-feedback">
                {errors.role.map((error) => error)}
              </div>
            )}
          </div>
          <div className="col-12">
            <button className="btn btn-primary w-100 py-2" type="submit">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}