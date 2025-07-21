import Link from "next/link";

import MillIcon2 from "@/modules/mills/components/MillIcon2";

export default function CardMill({mill}) {
  return (
    <Link className="text-decoration-none" href={mill.href}>
      <span>
        <div className="card card-mill mb-3 text-center ">
          <div className="card-header card-mill-header">
            Molino <span className="fw-bold">#{mill.number}</span>
          </div>
          <div className="card-body card-mill-body py-3">
            <MillIcon2 />
          </div>
          {(mill?.footer)? (
            <div className="card-footer card-mill-footer">
              <span className="small">
                {mill.footer}
              </span>
            </div>
          ): <></> }
        </div>
      </span>
    </Link>
  )
}