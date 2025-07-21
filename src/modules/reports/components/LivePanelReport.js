'use client';

import {useEffect} from "react";
import Plot from "react-plotly.js";
import useReports from "@/modules/reports/hooks/useReports";

export default function LivePanelReport() {

  const {
    startDate,
    endDate,
    chart,

    handleLoadChartMill,
  } = useReports();

  const layout = {
    title: `Corrientes de molinos en tiempo real`,
    autosize: true,
  }

  const config = {

  }

  useEffect(() => {
    if (startDate === '') {
      return;
    }

    if (endDate === '') {
      return;
    }

    handleLoadChartMill();

  }, [startDate, endDate]);

  return (
    <div className="card text-center">
      <div className="card-body">
        <div className="col-sm-12">
          <Plot
            className="w-100 vh-100 rounded-3"
            data={chart.data}
            layout={layout}
            config={config}
          />
        </div>
      </div>
    </div>
  )
}