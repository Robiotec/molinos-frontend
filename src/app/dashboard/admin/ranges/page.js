import UniversalGridCard from "@/modules/mills/components/UniversalGridCard";
import MillsService from "@/modules/mills/services/ServiceMills";

export default async function Ranges() {

  const mills = processToRange(await MillsService.fetchAllMills());

  return (
    <div className="container">
      <UniversalGridCard
        mills={mills}
      />
    </div>
  )
}

function processToRange(mills) {
  if (!mills) {
    return [];
  }

  mills.forEach(mill => {
    mill.href = `/dashboard/admin/ranges/${mill.id}`;
    mill.footer = "Presiona aquí para visualizar los rangos de este molino.";
  })

  return mills
}