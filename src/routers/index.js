import Main from '@src/pages/HomePage/index.jsx'

const routers = [
  {
    name: '首页',
    path: '/dashboard',
    icon: 'iconhome',
    ignoreAuth: true,
    // component: () => import('@src/pages/HomePage/index.jsx'),
    component: Main,
  },
]

export default routers
