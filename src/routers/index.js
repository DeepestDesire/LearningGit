import Main from '@src/pages/HomePage/index.jsx'
import Game from '@src/pages/HomePage/game.jsx'

const routers = [
  {
    name: '首页',
    path: '/game',
    icon: 'iconhome',
    ignoreAuth: true,
    component: Game,
  },
  {
    name: '首页',
    path: '/',
    icon: 'iconhome',
    ignoreAuth: true,
    // component: () => import('@src/pages/HomePage/index.jsx'),
    component: Main,
  },
]

export default routers
