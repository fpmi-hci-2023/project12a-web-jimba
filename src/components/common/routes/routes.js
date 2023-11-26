import { lazy } from 'react';

const routes = [
  {
    path: 'home',
    component: lazy(() => import('../../home/HomePage')),
    exact: true
  }
];

export default routes;