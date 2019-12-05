const routers = [
  {
    name: '首页',
    path: '/dashboard',
    icon: 'iconhome',
    ignoreAuth: true,
    component: () => import('@src/pages/Dashboard'),
  },
]

export default routers
