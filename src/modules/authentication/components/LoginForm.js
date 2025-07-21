'use client';

import useAuth from "@/modules/authentication/hooks/useAuth";

export default function LoginForm() {

  const {
    email, setEmail,
    password, setPassword,
    error,
    errors,
    loading,
    handleLogin,
  } = useAuth();

  return (
    <form onSubmit={handleLogin}>

      {error && (
        <div className="alert alert-danger small" role="alert">
          {error}
        </div>
      )}

      <h1 className="h3 mb-3 fw-normal">Conéctese</h1>
      <div className="form-floating">
        <input
          id="email"
          type="email"
          placeholder="johndoe@email.com"
          value={email}
          className={`form-control ${errors?.email? 'is-invalid': ''}`}
          onChange={(event) => setEmail(event.target.value)}
          autoFocus
          required
        />
        <label htmlFor="floatingInput">Nombre de usuario</label>
        {errors?.email && Array.isArray(errors.email) && (
          <div className="invalid-feedback">
            {errors?.email.map((element) => {
              return element
            })}
          </div>
        )}
      </div>
      <div className="form-floating">
        <input
          id="password"
          type="password"
          placeholder="Contraseña"
          value={password}
          className={`form-control ${errors?.password? 'is-invalid': ''}`}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <label htmlFor="floatingPassword">Contraseña</label>
        {errors?.password && Array.isArray(errors.password) && (
          <div className="invalid-feedback">
            {errors?.password.map((element) => {
              return element
            })}
          </div>
        )}
      </div>

      {!loading? (
        <button className="btn btn-primary w-100 py-2" type="submit">Iniciar sesión</button>
      ) : (
        <button
          className="btn btn-primary w-100 py-2"
          type="submit"
          disabled={loading}
        >
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </button>
      )}

      <p className="mt-5 mb-3 text-body-secondary">Robiotec © 2023</p>
    </form>
  )
}