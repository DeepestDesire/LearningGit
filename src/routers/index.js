import Main from '@src/pages/HomePage/index.jsx'
import Game from '@src/pages/HomePage/game.jsx'
import Login from '@src/pages/HomePage/login.jsx'

const routers = [
  {
    name: '游戏',
    path: '/game',
    icon: 'iconhome',
    ignoreAuth: true,
    component: Game,
  },
  {
    name: '登录',
    path: '/login',
    icon: 'iconhome',
    ignoreAuth: true,
    component: Login,
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
