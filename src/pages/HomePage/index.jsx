import React, { useState } from 'react'
import Modal from 'react-modal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import bg from '@images/game_home_bg.png'
import game_rule from '@images/game_rule.png'
import ic_play from '@images/ic_play.png'
import p_info from '@images/p_info.png'
import ic_close from '@images/ic_close.png'
import ic_next from '@images/ic_next.png'
import p_input from '@images/p_input.png'

const DIALOGTYPE = {
  RULE: 'RULE',
  INFO: 'INFO',
}

export default props => {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState('')
  let username = ''
  let mobile = ''

  function openGameRule() {
    setOpen(true)
    setType(DIALOGTYPE.RULE)
  }

  function closeGameRule() {
    setOpen(false)
  }

  function goToPlayGame() {
    // 判断用户信息是否已经录入
    const isLogin = judgeUserInfo()

    if (isLogin) {
      //已经录入
      props.history.push('/game')
    } else {
      //没有录入 弹窗
      setOpen(true)
      setType(DIALOGTYPE.INFO)
    }
  }

  function playGame() {
    var username = document.getElementById('username').value
    var mobile = document.getElementById('mobile').value

    if (!username || username.length < 2) {
      toast.info('请输入正确的姓名')
      return
    }

    function checkPhone(phone) {
      return /^1\d{10}$/.test(phone)
    }

    if (!checkPhone(mobile)) {
      toast.info('请输入正确的手机号', { className: 'rotateY animated' })
      return
    }
    saveUserInfo({ username, mobile })
    props.history.push('/game')
  }

  function ruleComponent() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={styles.ruleInfos} />
        <button style={styles.closeButton} onClick={closeGameRule} />
      </div>
    )
  }

  function userInfoComponent() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={styles.userInfo}>
          <input
            id="username"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: 22,
              color: 'rgb(173, 98, 98)',
              marginTop: 90,
              width: 200,
              textAlign: 'center',
            }}
            onChange={value => (username = value)}
            placeholder="请输入姓名"
          ></input>
          <input
            id="mobile"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: 22,
              color: 'rgb(173, 98, 98)',
              width: 200,
              marginTop: 20,
              textAlign: 'center',
            }}
            onChange={value => (mobile = value)}
            placeholder="请输入手机号"
          ></input>
        </div>
        <button style={styles.arrowButton} onClick={playGame} />
        <ToastContainer />
      </div>
    )
  }

  return (
    <div style={styles.containner}>
      <div style={styles.gameRule} onClick={openGameRule} />
      <div style={styles.play} onClick={goToPlayGame} />
      <Modal isOpen={open} style={styles.model} ariaHideApp={false}>
        {type === DIALOGTYPE.RULE ? ruleComponent() : userInfoComponent()}
      </Modal>
    </div>
  )
}

const styles = {
  containner: {
    backgroundSize: 'cover',
    height: window.innerHeight,
    backgroundImage: `url(${bg})`,
  },
  gameRule: {
    width: 90,
    height: 30,
    top: 70,
    right: 10,
    position: 'absolute',
    backgroundSize: 'contain',
    backgroundImage: `url(${game_rule})`,
  },
  play: {
    width: 115,
    height: 115,
    top: window.innerHeight / 2 - 115 / 2,
    right: window.innerWidth / 2 - 115 / 2,
    position: 'absolute',
    backgroundSize: 'contain',
    backgroundImage: `url(${ic_play})`,
  },
  ruleInfos: {
    width: 335,
    height: 247,
    backgroundSize: 'cover',
    backgroundImage: `url(${p_info})`,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 335,
    height: 247,
    backgroundSize: '100% 100%',
    backgroundImage: `url(${p_input})`,
  },
  closeButton: {
    width: 65,
    height: 65,
    border: 'none',
    backgroundSize: 'contain',
    backgroundImage: `url(${ic_close})`,
    backgroundColor: 'transparent',
  },
  arrowButton: {
    width: 65,
    marginTop: 10,
    height: 65,
    border: 'none',
    backgroundSize: 'contain',
    backgroundImage: `url(${ic_next})`,
    backgroundColor: 'transparent',
  },
  model: {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.60)',
    },
    content: {
      padding: 0,
      height: 420,
      position: 'static',
      paddingTop: window.innerHeight / 2 - 420 / 2,
      border: 'none',
      backgroundColor: 'transparent',
    },
  },
}

function saveUserInfo(params) {
  Object.keys(params).forEach(function(key) {
    localStorage.setItem(key, params[key])
  })
}

function judgeUserInfo(params) {
  const name = localStorage.getItem('username')
  const mobile = localStorage.getItem('mobile')
  return name && mobile
}
