const routes = [
  {
    name: "Inicio",
    route: "/dashboard/home",
    roles: ['root', 'admin', 'monitor'],
    slug: 'home',
  },
  {
    name: "Tendencia",
    route: "/dashboard/trend",
    roles: ['root', 'admin', 'monitor'],
    slug: 'trend',
  },
  {
    name: "Alarmas",
    route: "/dashboard/alarms",
    roles: ['root', 'admin', 'monitor'],
    slug: 'alarms',
  },
  {
    name: "Reportes",
    route: "/dashboard/reports",
    roles: ['root', 'admin', ],
    slug: 'reports',
  },
  {
    name: "Ajustes",
    route: "/dashboard/settings",
    roles: ['root', 'admin', 'monitor'],
    slug: 'settings',
  },
  {
    name: "Administador",
    route: "/dashboard/admin",
    roles: ['root', 'admin', ],
    slug: 'admin',
  },
];

export default routes;