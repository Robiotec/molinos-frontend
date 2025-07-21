import RangeForm from "@/modules/administration/components/RangeForm";

export default function RangeMill({params}) {

  const { id } = params;

  return (
    <div className="container">
      <RangeForm id={id} />
    </div>
  )
}