import MillsService from "@/modules/mills/services/ServiceMills";
import UniversalGridCard from "@/modules/mills/components/UniversalGridCard";
import SecureRoute from "@/modules/authentication/hooks/SecureRoute";

export default async function Home() {

  const route = "/dashboard/home";
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

  const mills = processToHome(await MillsService.fetchAllMills());

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
            realTime={true}
          />
        </div>
      </div>
    )
  }
}

function processToHome(mills) {
  if (!mills) {
    return [];
  }

  mills.forEach(mill => {
    mill.href = `/dashboard/home/live/${mill.id}`;
  })

  return mills
}