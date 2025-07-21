'use client';

import {useEffect} from "react";
import useReports from "@/modules/reports/hooks/useReports";
import moment from "moment-timezone";

export default function CardToDownloadReport() {

  const {
    mills,

    startDate, setStartDate,
    endDate, setEndDate,
    mill, setMill,
    reportType, setReportType,

    loading,

    loadMills,
    handleSubmitDownloadReport,
  } = useReports();

  useEffect(() => {
    loadMills();

    let currentDate = moment();
    let formattedDate = currentDate.tz('America/Guayaquil').format('YYYY-MM-DD');

    setStartDate(formattedDate);
    setEndDate(formattedDate);
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title fw-bold">Descargar reporte</h5>
        <form onSubmit={handleSubmitDownloadReport}>
          <div className="mb-3">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="start_date" className="form-label">Fecha de inicio</label>
                <input
                  id="start_date"
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="start_date" className="form-label">Fecha de fin</label>
                <input
                  id="start_date"
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="mill" className="form-label">Seleccione el molino</label>
            <select
              id="mill"
              className="form-select"
              value={mill}
              onChange={(event) => setMill(event.target.value)}
            >
              <option value='0'>Todos</option>
              {mills.map((mill) => {
                return (
                  <option key={mill.id} value={mill.id}>{mill.id}</option>
                )
              })}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="mill" className="form-label">Seleccione el tipo de reporte</label>
            <select
              id="mill"
              className="form-select"
              value={reportType}
              onChange={(event) => setReportType(event.target.value)}
            >
              <option value='xlsx'>Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
          {!loading? (
            <button className="btn btn-primary w-100 py-2" type="submit">Descargar</button>
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
        </form>
      </div>
    </div>
  )
}