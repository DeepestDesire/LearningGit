const routers = [
  {
    name: '首页',
    path: '/dashboard',
    icon: 'iconhome',
    ignoreAuth: true,
    component: () => import('@src/pages/HomePage/index.jsx'),
  },
]

export default routers
