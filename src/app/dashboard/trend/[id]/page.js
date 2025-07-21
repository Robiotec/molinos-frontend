import PanelResource from "@/modules/mills/components/Trend/PanelResource";
import DateForm from "@/modules/mills/components/Trend/DateForm";
import SecureRoute from "@/modules/authentication/hooks/SecureRoute";

export default async function TrendResource({ params }) {

  const route = "/dashboard/trend";
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

  const { id } = params;

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 p-3">
          <DateForm id={id} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 p-3">
          <PanelResource id={id} />
        </div>
      </div>
    </div>
  )
}