'use client';

import useCurrents from "@/modules/mills/hooks/useCurrents";
import { useEffect } from "react";
import moment from "moment-timezone";

export default function DateForm({ id }) {
  const {
    setTrend,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleLoadAlarms,
  } = useCurrents();

  useEffect(() => {
    let currentDate = moment();
    let formattedDate = currentDate.tz('America/Guayaquil').format('YYYY-MM-DD');

    setStartDate(formattedDate);
    setEndDate(formattedDate);
    setTrend({});
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <form
        onSubmit={(event) => handleLoadAlarms(event, id)}
        className="row align-items-center"
      >
        <div className="col-md-5 mb-3">
          <label htmlFor="start_date" className="form-label">Fecha de inicio: </label>
          <input
            id="start_date"
            className="form-control"
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </div>
        <div className="col-md-5 mb-3">
          <label htmlFor="end_date" className="form-label">Fecha de fin: </label>
          <input
            id="end_date"
            className="form-control"
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </div>
        <div className="col-md-2 mb-3 text-center">
          <button type="submit" className="btn btn-primary align-middle">Consultar</button>
        </div>
      </form>
    </div>
  );
}
