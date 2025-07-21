'use client';

import useAdmin from "@/modules/administration/hooks/useAdmin";
import {useEffect} from "react";

export default function RangeForm({id}) {

  const {
    off, setOff,
    empty, setEmpty,
    normal, setNormal,
    overloaded, setOverloaded,

    loading,
    errors,
    error,

    handleSubmitUpdateRangesForm,
    loadRanges,
    resetRangeForm,
  } = useAdmin();

  const handleChange = (event, key, setState) => {
    event.preventDefault();
    const value = event.target.value;
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleKeyDown = (event) => {
    const currentValue = event.target.value;

    const allowedCharacters = /^[0-9.]$/;
    const isDigit = /^[0-9]$/;

    const parts = currentValue.split('.');
    const integerPart = parts[0] || '';
    const decimalPart = parts[1] || '';

    const isNewDigit = isDigit.test(event.key);
    const hasDecimal = currentValue.includes('.');

    if (!(allowedCharacters.test(event.key) || event.key === 'Backspace' || event.key === 'Delete')) {
      event.preventDefault();
    }

    // Si el string esta vacio y se quiere ingresar un punto
    if (event.key === '.' && (!currentValue)) {
      event.preventDefault();
    }

    // Si el string ya tiene un punto y se quiere ingresar otro punto
    if (event.key === '.' && hasDecimal) {
      event.preventDefault();
    }

    // Si engresas los 3 digitos no ingresa otro punto
    if (event.key === '.' && integerPart.length >= 3) {
      event.preventDefault();
    }

    // Limita la entrada a 3 dígitos enteros y dos decimales
    if (isNewDigit && (integerPart.length >= 3 || decimalPart.length >= 2)) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    resetRangeForm();
    loadRanges(id);
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title display-6">Registra los rangos del molino #{id}</h5>
        <p className="card-text">
          Modificar los rangos asociados a los molinos en el sistema.
        </p>

        {loading && (
          <div className="alert alert-primary d-flex align-items-center" role="alert">
            La información de los rangos se está cargando...
          </div>
        )}
      </div>
      <div className="card-body">
        <form onSubmit={(event) => handleSubmitUpdateRangesForm(event, id)} className="row g-3">

          {error && (
            <div className="alert alert-danger small" role="alert">
              {error}
            </div>
          )}

          <div className="col-md-12">
            <div className="mb-2">
              <p className="fw-medium text-decoration-underline mb-0">Apagado</p>
            </div>
            <div className="input-group">
              <div className="form-floating mb-1">
                <input
                  id="ranges[off][min]"
                  name="ranges[off][min]"
                  type="text"
                  className={`form-control ${errors?.ranges ? 'is-invalid' : ''}`}
                  placeholder="Mínimo"
                  value={off.min}
                  onChange={(event) => handleChange(event, 'min', setOff)}
                  onKeyDown={handleKeyDown}
                  required={true}
                />
                <label htmlFor="ranges[off][min]">Mínimo</label>
              </div>
              <div className="form-floating mb-1">
                <input
                  id="ranges[off][max]"
                  name="ranges[off][max]"
                  type="text"
                  className={`form-control ${errors?.ranges ? 'is-invalid' : ''}`}
                  placeholder="Máximo"
                  value={off.max}
                  onChange={(event) => handleChange(event, 'max', setOff)}
                  onKeyDown={handleKeyDown}
                  required={true}
                />
                <label htmlFor="ranges[off][max]">Máximo</label>
              </div>
              {errors?.ranges && (
                <div className="invalid-feedback">
                  {errors.ranges.map((error) => error)}
                </div>
              )}
            </div>
          </div>

          <div className="col-md-12">
            <div className="mb-2">
              <p className="fw-medium text-decoration-underline mb-0">Vacío</p>
            </div>
            <div className="input-group">
              <div className="form-floating mb-1">
                <input
                  id="ranges[empty][min]"
                  name="ranges[empty][min]"
                  type="text"
                  className={`form-control ${errors?.ranges? 'is-invalid': ''}`}
                  placeholder="Mínimo"
                  value={empty.min}
                  onChange={(event) => handleChange(event, 'min', setEmpty)}
                  onKeyDown={handleKeyDown}
                  required={true}
                />
                <label htmlFor="ranges[empty][min]">Mínimo</label>
              </div>
              <div className="form-floating mb-1">
                <input
                  id="ranges[empty][max]"
                  name="ranges[empty][max]"
                  type="text"
                  className={`form-control ${errors?.ranges? 'is-invalid': ''}`}
                  placeholder="Máximo"
                  value={empty.max}
                  onChange={(event) => handleChange(event, 'max', setEmpty)}
                  onKeyDown={handleKeyDown}
                  required={true}
                />
                <label htmlFor="ranges[empty][max]">Máximo</label>
              </div>
              {errors?.ranges && (
                <div className="invalid-feedback">
                  {errors.ranges.map((error) => error)}
                </div>
              )}
            </div>
          </div>

          <div className="col-md-12">
            <div className="mb-2">
              <p className="fw-medium text-decoration-underline mb-0">Normal</p>
            </div>
            <div className="input-group">
              <div className="form-floating mb-1">
                <input
                  id="ranges[normal][min]"
                  name="ranges[normal][min]"
                  type="text"
                  className={`form-control ${errors?.ranges? 'is-invalid': ''}`}
                  placeholder="Mínimo"
                  value={normal.min}
                  onChange={(event) => handleChange(event, 'min', setNormal)}
                  onKeyDown={handleKeyDown}
                  required={true}
                />
                <label htmlFor="ranges[normal][min]">Mínimo</label>
              </div>
              <div className="form-floating mb-1">
                <input
                  id="ranges[normal][max]"
                  name="ranges[normal][max]"
                  type="text"
                  className={`form-control ${errors?.ranges? 'is-invalid': ''}`}
                  placeholder="Máximo"
                  value={normal.max}
                  onChange={(event) => handleChange(event, 'max', setNormal)}
                  onKeyDown={handleKeyDown}
                  required={true}
                />
                <label htmlFor="ranges[normal][max]">Máximo</label>
              </div>
              {errors?.ranges && (
                <div className="invalid-feedback">
                  {errors.ranges.map((error) => error)}
                </div>
              )}
            </div>
          </div>

          <div className="col-md-12">
            <div className="mb-2">
              <p className="fw-medium text-decoration-underline mb-0">Sobrecargado</p>
            </div>
            <div className="input-group">
              <div className="form-floating mb-1">
                <input
                  id="ranges[overloaded][min]"
                  name="ranges[overloaded][min]"
                  type="text"
                  className={`form-control ${errors?.ranges? 'is-invalid': ''}`}
                  placeholder="Mínimo"
                  value={overloaded.min}
                  onChange={(event) => handleChange(event, 'min', setOverloaded)}
                  onKeyDown={handleKeyDown}
                  required={true}
                />
                <label htmlFor="ranges[overloaded][min]">Mínimo</label>
              </div>
              <div className="form-floating mb-1">
                <input
                  id="ranges[overloaded][max]"
                  name="ranges[overloaded][max]"
                  type="text"
                  className={`form-control ${errors?.ranges? 'is-invalid': ''}`}
                  placeholder="Máximo"
                  value={overloaded.max}
                  onChange={(event) => handleChange(event, 'max', setOverloaded)}
                  onKeyDown={handleKeyDown}
                  required={true}
                />
                <label htmlFor="ranges[overloaded][max]">Máximo</label>
              </div>
              {errors?.ranges && (
                <div className="invalid-feedback">
                  {errors.ranges.map((error) => error)}
                </div>
              )}
            </div>
          </div>
          <div className="col-12">
            <button className="btn btn-primary w-100 py-2" type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  )
}