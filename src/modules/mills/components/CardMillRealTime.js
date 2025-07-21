'use client';

import Link from "next/link";
import {useEffect, useState} from "react";
import Currents from "@/common/endpoints/Currents";
import MillIcon2 from "@/modules/mills/components/MillIcon2";
import {getCookieCS} from "@/lib/cookiesClientSide";
import axios from "@/lib/axios";
import MillRanges from "@/common/endpoints/MillRanges";

export default function CardMillRealTime({mill}) {

  const [stateClassName, setStateClassName] = useState("");
  const [cardMessage, setCardMessage] = useState("");
  const [connectedSocket, setConnectedSocket] = useState(false);
  const [currents, setCurrents] = useState({});
  const [alarm, setAlarm] = useState(false);
  const [ranges, setRanges] = useState({});

  // Metadata
  const [cardClassName, setCardClassName] = useState('');
  const [cardHeaderClassName, setHeaderCardClassName] = useState('');

  const handleOpen = (event) => {
    setConnectedSocket(true);
  };

  const handleMessage = (event) => {
    var evento = JSON.parse(event.data);
    setCurrents(evento.currents);
    setAlarm(evento.alarm);
  };

  const handleTrafficLight = () => {

    if (Object.keys(ranges).length === 0) {
      return;
    }

    const keysToCheck = ["off", "empty", "normal", "overloaded"];

    // The current value is evaluated for color class
    for (const rangeKey of keysToCheck) {
      const range = ranges[rangeKey];
      const [minValue, maxValue] = range.values;

      if (currents.main_current >= parseFloat(minValue) && currents.main_current < parseFloat(maxValue)) {
        setStateClassName(range.classNameSlug);
        setCardMessage(range.cardMessages);
        return;
      } else {
        setCardMessage('Fuera de rango');
      }
    }

    setStateClassName('');
  };

  const handleAlarmLight = () => {
    // The value of the alarms are evaluated
    if (alarm) {
      setCardClassName('light-alarm');
      setHeaderCardClassName('light-danger')

      setTimeout(() => {
        setCardClassName('');
        setHeaderCardClassName('')
      }, 500);
    }
  }

  const loadRanges = async () => {
    try {
      const token = getCookieCS('token');
      await axios(token).get(MillRanges.MILL_RANGES_RESOURCE.formatUnicorn({
        id: mill.id,
      }))
        .then((response) => {
          setRanges(response.data);
        })
        .catch((error) => { })
    } catch (e) {  }
  }

  useEffect(() => {
    loadRanges();

    const webSocketCurrent = new WebSocket(Currents.TREND_CURRENT_REAL_TIME.formatUnicorn({
      mill_id: mill.id,
    }));

    webSocketCurrent.onopen = handleOpen;
    webSocketCurrent.onmessage = handleMessage;
  }, []);

  useEffect(() => {
    handleTrafficLight();
    handleAlarmLight();
  }, [currents]);

  return (
    <Link href={mill.href} className="text-decoration-none">
      <span>
        <div className={`card card-mill mb-3 text-center ${cardClassName}`}>
          <div className={`card-header card-mill-header ${cardHeaderClassName}`}>
            Molino <span className="fw-bold">#{mill.number}</span>
          </div>
          <div className="card-body card-mill-body py-3">
            <MillIcon2 className={stateClassName} />
          </div>
          <div className="card-footer card-mill-footer">
            <span className="small fw-bold">
              {(Object.keys(currents).length !== 0)?
                <>
                  {cardMessage} - {currents.main_current}A
                </>
                :
                <>
                  <p className="placeholder-glow mb-1">
                    <span className="placeholder col-12"></span>
                  </p>
                </>
              }
            </span>
          </div>
        </div>
      </span>
    </Link>
  )
}