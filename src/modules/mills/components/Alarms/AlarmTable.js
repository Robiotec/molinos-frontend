'use client';

import useCurrents from "@/modules/mills/hooks/useCurrents";
import moment from "moment";

export default function AlarmTable({id}) {

  const { alarms, loadingFetchData } = useCurrents();

  if (!loadingFetchData && Object.keys(alarms).length === 0) {
    return (
      <div className="container">
        <div className="row">
          <div className="my-3 text-center">
            <h3>Selecciona un rango de fecha para consultar</h3>
          </div>
        </div>
      </div>
    )
  }

  if (loadingFetchData && Object.keys(alarms).length === 0) {
    return (
      <div className="container">
        <div className="row">
          <div className="my-3 text-center">
            <h3>Cargando...</h3>
          </div>
        </div>
      </div>
    )
  }

  if (!loadingFetchData && Object.keys(alarms?.data).length === 0) {
    return (
      <div className="container">
        <div className="row">
          <div className="text-center">
            <h3>No hay datos para mostrar del molino {id}</h3>
          </div>
        </div>
      </div>
    )
  }

  if (!loadingFetchData && alarms?.data) {
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Molino</th>
              <th scope="col">Estado</th>
              <th scope="col">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {alarms.data.map((alarm, index) => {

              var fechaParsed = moment(alarm.created_at);
              var fechaFormateada = fechaParsed.format("YYYY-MM-DD HH:mm:ss");

              return (
                <tr key={alarm.id} className={(alarm.still)? `table-danger` : ``}>
                  <th scope="row">{(index + 1)}</th>
                  <td>{alarm.mill_id}</td>
                  <td>{(alarm.still)? `Activada` : `Desactivada`}</td>
                  <td>{fechaFormateada}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}