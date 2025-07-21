import SecureRoute from "@/modules/authentication/hooks/SecureRoute";
import DateForm from "@/modules/mills/components/Alarms/DateForm";
import AlarmTable from "@/modules/mills/components/Alarms/AlarmTable";

export default async function AlarmResource({ params }) {

  const route = "/dashboard/alarms";
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
          <AlarmTable id={id} />
        </div>
      </div>
    </div>
  )
}