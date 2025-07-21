'use client';

import {useEffect, useState} from "react";
import Currents from "@/common/endpoints/Currents";

export default function CurrentsPanel({id}) {

  const [connectedSocket, setConnectedSocket] = useState(false);
  const [currents, setCurrents] = useState({});

  const handleOpen = (event) => {
    setConnectedSocket(true);
  };

  const handleMessage = (event) => {
    var evento = JSON.parse(event.data);
    setCurrents(evento.currents);
  };

  useEffect(() => {
    const webSocketCurrent = new WebSocket(Currents.TREND_CURRENT_REAL_TIME.formatUnicorn({
      mill_id: id,
    }))

    webSocketCurrent.onopen = handleOpen;
    webSocketCurrent.onmessage = handleMessage;
  }, []);

  return (
    <div className="row d-flex justify-content-center align-items-center">
      <div className="col-2">
        <div className="text-center">
          <h2 className="fw-bold">Linea #1</h2>
          {currents.currentL1 ? (
            <h3 className="">{currents.currentL1}A</h3>
          ) : (
            <p className="placeholder-glow mb-1">
              <span className="placeholder col-12"></span>
            </p>
          )}
        </div>
      </div>

      <div className="col-2">
        <div className="text-center">
          <h2 className="fw-bold">Linea #2</h2>
          {currents.currentL2 ? (
            <h3 className="">{currents.currentL2}A</h3>
          ) : (
            <p className="placeholder-glow mb-1">
              <span className="placeholder col-12"></span>
            </p>
          )}
        </div>
      </div>

      <div className="col-2">
        <div className="text-center">
          <h2 className="fw-bold">Linea #3</h2>
          {currents.currentL3 ? (
            <h3 className="">{currents.currentL3}A</h3>
          ) : (
            <p className="placeholder-glow mb-1">
              <span className="placeholder col-12"></span>
            </p>
          )}
        </div>
      </div>
    </div>
  )

}