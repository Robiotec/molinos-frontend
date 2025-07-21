import "./../functions/unicornFormat";

const Reports = {
  DOWNLOAD_REPORTS_MILLS: '/api/v1/reports/mills/download/{start_date}/{end_date}/{id}/{type}',
  CHART_REPORTS_MILLS: '/api/v1/reports/mills/charts/{start_date}/{end_date}',
}

export default Reports;