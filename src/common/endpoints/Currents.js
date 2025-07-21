import "./../functions/unicornFormat";

const wsHost = process.env.NEXT_PUBLIC_NODERED_BACKEND_IP;

const Currents = {
  TREND_RESOURCE: '/api/v1/currents/{mill_id}/trend',
  TREND_CURRENT_REAL_TIME: `ws://${wsHost}:1880/ws/molinos/{mill_id}`,
  ALARM_RESOURCE: '/api/v1/mills/{mill_id}/alarms',
  TREND_ALL_CURRENT_REAL_TIME: `ws://${wsHost}:1880/ws/molinos/all`,
  DASHBOARD_TO_LIVE: `http://${wsHost}:1880/ui/`,
}

export default Currents;