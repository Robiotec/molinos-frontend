'use client';

import Plot from "react-plotly.js";
import {useEffect, useState} from "react";
import Currents from "@/common/endpoints/Currents";
import moment from "moment";

export default function LivePanel(props) {

  const [connectedSocket, setConnectedSocket] = useState(false);
  const [axisXCurrentOne, setAxisXCurrentOne] = useState([]);
  const [axisYCurrentOne, setAxisYCurrentOne] = useState([]);
  const [axisXCurrentTwo, setAxisXCurrentTwo] = useState([]);
  const [axisYCurrentTwo, setAxisYCurrentTwo] = useState([]);
  const [axisXCurrentThree, setAxisXCurrentThree] = useState([]);
  const [axisYCurrentThree, setAxisYCurrentThree] = useState([]);

  const { id } = props;

  const layout = {
    title: `Corrientes de molinos en tiempo real nº ${id}`,
    autosize: true,
  }

  const config = {

  }

  const handleOpen = (event) => {
    setConnectedSocket(true);
  };

  const handleMessage = (event) => {
    var evento = JSON.parse(event.data);
    var currentDate = moment().format('YYYY-MM-DD HH:mm:ss');

    setAxisXCurrentOne(prevAxisXCurrentOne => [
      ...prevAxisXCurrentOne,
      currentDate.toString(),
    ]);

    setAxisYCurrentOne(prevAxisYCurrentOne => [
      ...prevAxisYCurrentOne,
      evento.currents.currentL1,
    ]);

    setAxisXCurrentTwo(prevAxisXCurrentTwo => [
      ...prevAxisXCurrentTwo,
      currentDate.toString(),
    ]);

    setAxisYCurrentTwo(prevAxisYCurrentTwo => [
      ...prevAxisYCurrentTwo,
      evento.currents.currentL2,
    ]);

    setAxisXCurrentThree(prevAxisXCurrentThree => [
      ...prevAxisXCurrentThree,
      currentDate.toString(),
    ]);

    setAxisYCurrentThree(prevAxisYCurrentThree => [
      ...prevAxisYCurrentThree,
      evento.currents.currentL3,
    ]);
  };

  useEffect(() => {
    const webSocketCurrent = new WebSocket(Currents.TREND_CURRENT_REAL_TIME.formatUnicorn({
      mill_id: id,
    }));

    webSocketCurrent.onopen = handleOpen;
    webSocketCurrent.onmessage = handleMessage;
  }, []);

  return (
    <div className="text-center">
      <div className="col-sm-12">
        <Plot
          className="w-100 vh-100"
          data={[
            {
              x: axisXCurrentOne,
              y: axisYCurrentOne,
              type: 'scatter',
              mode: 'lines',
              marker: {
                color: 'red',
              },
              name: 'Corriente n° 1',
            },
            {
              x: axisXCurrentTwo,
              y: axisYCurrentTwo,
              type: 'scatter',
              mode: 'lines',
              marker: {
                color: 'blue',
              },
              name: 'Corriente n° 2',
            },
            {
              x: axisXCurrentThree,
              y: axisYCurrentThree,
              type: 'scatter',
              mode: 'lines',
              marker: {
                color: 'green',
              },
              name: 'Corriente n° 3',
            },
          ]}
          layout={layout}
          config={config}
        />
      </div>
    </div>
  )
}