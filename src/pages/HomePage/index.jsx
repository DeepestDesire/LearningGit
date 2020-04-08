import React, { useState } from 'react'
import Button, { ButtonGroup } from '@atlaskit/button'
import Textfield from '@atlaskit/textfield'
import { uploadScore } from 'network/index.js'
export default function Index(props) {
  const [score, setScore] = useState(23)

  console.log('props', props)
  return (
    <div style={{ display: 'inline' }}>
      <div>姓名：</div>
      <Textfield name="medium" width="medium" isDisabled={true} value={score} />
      <div>手机号：</div>
      <Textfield name="medium" width="medium" isDisabled={true} value={score} />
      <Button
        appearance="primary"
        onClick={() => {
          console.log(props)
          props.history.push('/game')
        }}
      >
        开始玩游戏
      </Button>
      {/* <Button
        appearance="danger"
        onClick={() => {
          uploadToRemote({ score })
        }}
      >
        send to server
      </Button> */}
    </div>
  )
}

function generateScore() {
  return Math.floor(Math.random() * 100)
}

function uploadToRemote(data) {
  uploadScore(data)
    .then(data => {
      console.log(data)
    })
    .catch(error => console.log(error))
}
