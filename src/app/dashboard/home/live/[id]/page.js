import CurrentsPanel from "@/modules/mills/components/Home/CurrentsPanel";
import SecureRoute from "@/modules/authentication/hooks/SecureRoute";
import LivePanel from "@/modules/mills/components/Home/LivePanel";

export default async function LiveResource({params}) {

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

  const {id} = params;

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-sm-12">
          <CurrentsPanel id={id} />
        </div>
      </div>
      <div className="row my-3">
        <div className="col-sm-12">
          <LivePanel id={id} />
        </div>
      </div>
    </div>
  )
}