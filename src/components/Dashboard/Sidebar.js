'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import useAuth from "@/modules/authentication/hooks/useAuth";
import routes from "@/common/functions/routes";

export default function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  const filteredRoutes = routes.filter(route => {
    if (!route.roles || route.roles.length === 0) {
      return true;
    }

    return route.roles.some(role => user?.roles?.some(userRole => userRole.name === role));
  });

  const isLoggedIn = !!user;

  if (isLoggedIn) {
    return (
      <aside className="sidebar vh-100">
        <div className="side-inner py-3 vh-100 overflow-y-scroll">
          <div className="share p-4">
            {isLoggedIn && (
              <p className="lh-base mb-5">Hola, <span className="fw-bold">{user?.name}</span></p>
            )}
            <div className="d-grid gap-2 sidebar-btn-group">
              {filteredRoutes.map((route) => {
                const isActive = pathname === route.route;
                const startsWith = pathname.startsWith(route.route);

                return (
                  <Link key={route.name} href={route.route} className={`btn btn-sidebar ${isActive || startsWith ? 'active' : ''}`}>
                    {route.name}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="share p-4">
            {isLoggedIn && (
              <div className="d-grid gap-2 sidebar-btn-group">
                <Link href="/logout" className="btn btn-sidebar logout">
                  Cerrar sesión
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>
    );
  }

  if (!isLoggedIn) {
    return (
      <aside className="sidebar vh-100">
        <div className="side-inner py-3 vh-100 overflow-y-scroll">
          <div className="share p-4">
            <p className="placeholder-glow">
              <span className="placeholder col-12"></span>
            </p>

            <p className="placeholder-wave">
              <span className="placeholder col-12"></span>
            </p>

            <p className="placeholder-wave">
              <span className="placeholder col-12"></span>
            </p>
          </div>
        </div>
      </aside>
    )
  }


}
