import React, { useState } from 'react'
import Button, { ButtonGroup } from '@atlaskit/button'
import Textfield from '@atlaskit/textfield'
import { uploadScore } from 'network/index.js'
export default function Index() {
  const [score, setScore] = useState(23)

  return (
    <div style={{ display: 'inline' }}>
      <Textfield name="medium" width="medium" isDisabled={true} value={score} />
      <Button
        appearance="primary"
        onClick={() => {
          setScore(generateScore())
        }}
      >
        Generate Rate
      </Button>
      <Button
        appearance="danger"
        onClick={() => {
          uploadToRemote({ score })
        }}
      >
        send to server
      </Button>
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
