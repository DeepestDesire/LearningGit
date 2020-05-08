import React from 'react'

const data = React.createContext({ name: 'daiyao' })
export default function Index(props) {
  return (
    <div>
      <Tree></Tree>
    </div>
  )
}

function Tree(prop) {
  let name = 'daiyao'
  console.log(prop)
  return <div>tree</div>
}
