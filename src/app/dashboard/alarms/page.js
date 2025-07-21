import MillsService from "@/modules/mills/services/ServiceMills";
import UniversalGridCard from "@/modules/mills/components/UniversalGridCard";
import SecureRoute from "@/modules/authentication/hooks/SecureRoute";

export default async function Alarms() {

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

  const mills = processToAlarms(await MillsService.fetchAllMills());

  if (!mills) {
    return (
      <div className="container">
        <div className="row my-3">
          <div className="col-sm-12">
            No se encontraron molinos en nuestros registros
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container">
        <div className="my-3">
          <UniversalGridCard
            mills={mills}
          />
        </div>
      </div>
    )
  }
}

function processToAlarms(mills) {
  if (!mills) {
    return [];
  }

  mills.forEach(mill => {
    mill.href = `/dashboard/alarms/${mill.id}`;
    mill.footer = "Click aquí para ver las alarmas de este molino";
  })

  return mills
}