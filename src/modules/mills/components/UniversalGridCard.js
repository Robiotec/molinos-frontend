import CardMill from "@/modules/mills/components/CardMill";
import CardMillRealTime from "@/modules/mills/components/CardMillRealTime";

export default function UniversalGridCard(props) {

  const { mills, realTime } = props;

  return (
    <div className="row">
      {mills.map((item) => (
        <div key={item.id} className="col-sm-3">
          {(realTime)? (
            <CardMillRealTime
              mill={item}
            />
          ):(
            <CardMill
              mill={item}
            />
          )}
        </div>
      ))}
    </div>
  )
}