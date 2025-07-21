'use client';

import Currents from "@/common/endpoints/Currents";

export default function CardToLive() {

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title fw-bold">Ver en directo los molinos</h5>
        <p className="card-text">Visualización en directo de los datos del molino con un historial de 12 horas</p>
        <div className="text-center d-grid">
          <a href={Currents.DASHBOARD_TO_LIVE} target="_blank" className="btn btn-primary">Ir al sitio</a>
        </div>
      </div>
    </div>
  )
}