import ReactDom from 'react-dom'
import React from 'react'
import Main from './main'
// import MainMD from './main.md'

// console.log(MainMD)

const Root = document.getElementById('app')

if (!Root) {
  throw new Error('当前页面不存在 <div id="app"></div> 入口节点.')
}

ReactDom.render(<Main />, Root)
// Root.innerHTML = MainMD
