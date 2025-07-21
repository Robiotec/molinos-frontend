import {createContext, useState} from "react";
import axios from "@/lib/axios";
import Mills from "@/common/endpoints/Mills";
import {getCookieCS} from "@/lib/cookiesClientSide";
import Reports from "@/common/endpoints/Reports";

const ReportsContext = createContext();

const ReportsProvider = ({children}) => {

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [mill, setMill] = useState('0');
  const [reportType, setReportType] = useState('csv');
  const [chart, setChart] = useState([]);

  // Metadata
  const [loading, setLoading] = useState(false);
  const [loadingChart, setLoadingChart] = useState(false);

  // Selects
  const [mills, setMills] = useState([]);

  const loadMills = async () => {
    try {
      const token = getCookieCS('token');
      const response = await axios(token).get(Mills.MILLS_COLLECTION);
      setMills(response.data.data);
    } catch (e) { return null }
  }

  const handleSubmitDownloadReport = async (event) => {
    event.preventDefault();

    setLoading(true);
    try {
      const token = getCookieCS('token');
      const response = await axios(token).get(Reports.DOWNLOAD_REPORTS_MILLS.formatUnicorn({
        start_date: startDate,
        end_date: endDate,
        id: mill,
        type: reportType,
      }), {
        responseType: 'blob',
      });

      const blobUrl = URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${startDate}_${endDate}_${mill}.${reportType}`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);

      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  const handleLoadChartMill = async () => {
    try {
      setLoadingChart(true);
      const token = getCookieCS('token');
      await axios(token).get(Reports.CHART_REPORTS_MILLS.formatUnicorn({
        start_date: startDate,
        end_date: endDate,
      }))
        .then((response) => {
          setLoadingChart(false);
          setChart(response.data);
        })
        .catch((error) => {
          setLoadingChart(false);
        })
    } catch (e) { }
  }

  return (
    <ReportsContext.Provider value={{
      startDate: startDate, setStartDate,
      endDate: endDate, setEndDate,
      mill: mill, setMill,
      mills: mills, setMills,
      reportType: reportType, setReportType,

      chart: chart, setChart,

      loading: loading,
      loadingChart: loadingChart,

      loadMills,
      handleSubmitDownloadReport,
      handleLoadChartMill,
    }}>
      {children}
    </ReportsContext.Provider>
  )
}

export {
  ReportsProvider
}

export default ReportsContext;