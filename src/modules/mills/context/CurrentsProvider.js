import {createContext, useState} from "react";
import axios from "@/lib/axios";
import Currents from "@/common/endpoints/Currents";
import {getCookieCS} from "@/lib/cookiesClientSide";

const CurrentsContext = createContext();

const CurrentsProvider = ({children}) => {

  const [trend, setTrend] = useState({});
  const [alarms, setAlarms] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // metadata
  const [millID, setMillID] = useState(0);
  const [loadingFetchData, setLoadingFetchData] = useState(false);

  const handleLoadTrend = async (event) => {
    event.preventDefault();

    try {
      setLoadingFetchData(true);
      const token = getCookieCS('token');
      await axios(token).get(Currents.TREND_RESOURCE.formatUnicorn({
        mill_id: millID,
      }), {
        params: {
          start_date: startDate,
          end_date: endDate,
        }
      })
        .then((response) => {
          setLoadingFetchData(false);
          setTrend(response.data);
        })
        .catch((error) => {
          setLoadingFetchData(false);
        })
    } catch (e) { }
  }

  const handleLoadAlarms = async (event, mill_id) => {
    event.preventDefault();

    try {
      setLoadingFetchData(true);
      const token = getCookieCS('token');
      await axios(token).get(Currents.ALARM_RESOURCE.formatUnicorn({
        mill_id: mill_id,
      }), {
        params: {
          start_date: startDate,
          end_date: endDate,
        }
      })
        .then((response) => {
          setLoadingFetchData(false);
          setAlarms(response.data);
        })
        .catch((error) => {
          setLoadingFetchData(false);
        })
    } catch (e) { }
  }

  return (
    <CurrentsContext.Provider value={{
      //state
      trend: trend, setTrend,
      alarms: alarms, setAlarms,
      startDate: startDate, setStartDate,
      endDate: endDate, setEndDate,

      // metadata
      millID: millID, setMillID,
      loadingFetchData: loadingFetchData,

      //fetch
      handleLoadTrend,
      handleLoadAlarms,
    }}>
      {children}
    </CurrentsContext.Provider>
  )
}

export {
  CurrentsProvider
}

export default CurrentsContext;
