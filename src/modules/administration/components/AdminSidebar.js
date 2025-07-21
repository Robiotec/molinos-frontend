'use client';

import Link from "next/link";
import {usePathname} from "next/navigation";
import routesAdmin from "@/common/functions/routesAdmin";

export default function AdminSidebar() {

  const pathname = usePathname();

  return (
    <ul className="list-group">
      {routesAdmin.map((route, index) => {
        const isActive = pathname === route.route;
        const startsWith = pathname.startsWith(route.route);

        return (
          <Link
            key={index}
            href={route.route}
            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-start ${isActive || startsWith ? 'active' : ''}`}>
            <div className="ms-2 me-auto">
              <div className="fw-bold">{route.title}</div>
              <span className="small">
                {route.description}
              </span>
            </div>
            {route?.label && (
              <span className="badge bg-primary rounded-pill">{route.label}</span>
            )}
          </Link>
        )
      })}
    </ul>
  )
}