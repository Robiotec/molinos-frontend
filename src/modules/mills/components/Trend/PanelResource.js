'use client'

import Plot from 'react-plotly.js';
import useCurrents from "@/modules/mills/hooks/useCurrents";

export default function PanelResource({id}) {

  const { trend, loadingFetchData } = useCurrents();

  if (!loadingFetchData && Object.keys(trend).length === 0) {
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

  if (loadingFetchData && Object.keys(trend).length === 0) {
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

  if (!loadingFetchData && Object.keys(trend?.data).length === 0) {
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

  if (!loadingFetchData && trend?.data) {

    const layout = {
      title: `Tendencia del molino #${id}`,
      autosize: true,
    }

    const config = {

    }

    return (
      <div className="text-center">
        <div className="col-sm-12">
          <Plot
            className="w-100 vh-100"
            data={trend.data}
            layout={layout}
            config={config}
          />
        </div>
      </div>
    )
  }

}