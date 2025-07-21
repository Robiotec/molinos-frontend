import MillsService from "@/modules/mills/services/ServiceMills";
import UniversalGridCard from "@/modules/mills/components/UniversalGridCard";
import SecureRoute from "@/modules/authentication/hooks/SecureRoute";

export default async function Trend() {

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

  const mills = processToTrend(await MillsService.fetchAllMills());

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

function processToTrend(mills) {
  if (!mills) {
    return [];
  }

  mills.forEach(mill => {
    mill.href = `/dashboard/trend/${mill.id}`;
    mill.footer = "Presiona aquí para visualizar el historial de este molino.";
  })

  return mills
}