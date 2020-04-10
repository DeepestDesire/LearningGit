import Main from '@src/pages/HomePage/index.jsx'
import Game from '@src/pages/HomePage/game.jsx'
import End from '@src/pages/HomePage/end.jsx'
import Sort from '@src/pages/HomePage/sort.jsx'

const routers = [
  {
    name: '游戏',
    path: '/game',
    icon: 'iconhome',
    ignoreAuth: true,
    component: Game,
  },
  {
    name: '游戏结束',
    path: '/end',
    icon: 'iconhome',
    ignoreAuth: true,
    component: End,
  },
  {
    name: '游戏排名',
    path: '/sort',
    icon: 'iconhome',
    ignoreAuth: true,
    component: Sort,
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
