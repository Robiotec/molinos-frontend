import SecureRoute from "@/modules/authentication/hooks/SecureRoute";
import CardToLive from "@/modules/reports/components/CardToLive";
import CardToDownloadReport from "@/modules/reports/components/CardToDownloadReport";
import LivePanelReport from "@/modules/reports/components/LivePanelReport";

export default async function Reports() {

  const route = "/dashboard/reports";
  const isAuthorized = await SecureRoute(route);

  if (!isAuthorized) {
    return (
      <div className="container">
        <div className="row my-3">
          <div className="col-sm-12">
            Acceso no autorizado
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container p-3">
      <div className="row mb-3">
        <div className="col-md-3">
          <CardToLive />
        </div>
        <div className="col-md-9">
          <CardToDownloadReport />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <LivePanelReport />
        </div>
      </div>
    </div>
  )
}