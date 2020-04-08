import React, { useState } from 'react'
import Button, { ButtonGroup } from '@atlaskit/button'
import Textfield from '@atlaskit/textfield'
import { uploadScore } from 'network/index.js'
export default function Index(props) {
  const [name, setName] = useState(null)
  const [phone, setPhone] = useState(null)

  console.log('props', props)
  return (
    <div style={{ display: 'inline' }}>
      <div>姓名：</div>
      <Textfield
        name="medium"
        width="medium"
        value={name}
        onChange={e => {
          setName(e.target.value)
        }}
      />
      <div>手机号：</div>
      <Textfield
        name="medium"
        width="medium"
        value={phone}
        onChange={e => {
          setPhone(e.target.value)
        }}
      />
      <Button
        appearance="primary"
        onClick={() => {
          props.history.push('/game')
          const [error, data] = validate({ name, phone })
          if (!error) {
            saveUserInfo(data)
          }
        }}
      >
        开始玩游戏
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

/**
 * 校验名字跟手机号
 * name
 * phone
 * @param {*} data
 */
function validate(data) {
  const { name, phone } = data
  if (!name) {
    return [new Error('请填写名称')]
  }
  if (typeof name === 'string' && name.length < 2) {
    return [new Error('请填写正确名称')]
  }

  if (!checkPhone(phone)) {
    return [new Error('请填写正确手机号')]
  }
  return [null, data]
}

function checkPhone(phone) {
  return /^1\d{10}$/.test(phone)
}

function saveUserInfo(params) {
  localStorage.setItem('name', params.name)
  localStorage.setItem('phone', params.phone)
}
