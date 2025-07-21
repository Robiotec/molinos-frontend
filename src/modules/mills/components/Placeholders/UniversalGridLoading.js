import UniversalCardLoading from "@/modules/mills/components/Placeholders/UniversalCardLoading";

export default function UniversalGridLoading() {
  return (
    <div className="container">
      <div className="row my-3">
        {Array(4).fill(null).map((_, index) => (
          <div key={index} className="col-sm-3">
            <UniversalCardLoading />
          </div>
        ))}
      </div>
    </div>
  )
}