import React, { useState, useEffect } from 'react'

import { getSortByScore } from 'network/index'

import p_bg from '@images/p_bg.png'
import ic_history from '@images/ic_history.png'
import ic_restart from '@images/ic_restart.png'
import ic_share from '@images/ic_share.png'
import p_count from '@images/p_count.png'

/* 获取hash连接url参数 */
function getQueryString(name, type) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = null
  switch (type) {
    case 'hash':
      r = location.hash.replace(/#.+\?/, '').match(reg)
      break
    case 'search':
      r = location.search.substr(1).match(reg)
      break
    default:
      r = location.search.substr(1).match(reg)
      break
  }
  if (r != null) return unescape(r[2])
  return ''
}

export default function game(props) {
  console.log(props)
  const score = getQueryString('score', 'hash')
  console.log(score)

  const [sort, setSort] = useState('查询中')
  useEffect(() => {
    getSortByScore({ score }).then(data => {
      const { data: sort, code } = data
      setSort(sort)
    })
  })

  const restartGame = () => {
    props.history.push('/game')
  }
  function closeGameRule(params) {}
  return (
    <div style={styles.containner}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 600,
        }}
      >
        <div style={styles.historyBg}>
          <div style={{ ...styles.font, marginTop: 130 }}>{score}</div>
          <div style={{ ...styles.font, marginTop: 20 }}>{sort}</div>
          <div style={{ ...styles.detialFont }}>活动详情</div>
        </div>
        <div style={styles.buttonArray}>
          <div style={styles.restart} onClick={restartGame} />
          <div
            style={styles.history}
            onClick={() => {
              props.history.push('/sort')
            }}
          />
          <div style={styles.share} onClick={closeGameRule} />
        </div>
      </div>
    </div>
  )
}

const styles = {
  containner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    height: window.innerHeight,
    backgroundImage: `url(${p_bg})`,
  },
  historyBg: {
    width: 335,
    height: 350,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${p_count})`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  buttonArray: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 335,
    marginTop: 20,
  },
  share: {
    width: 65,
    height: 65,
    border: 'none',
    backgroundSize: 'contain',
    backgroundImage: `url(${ic_share})`,
    backgroundColor: 'transparent',
  },
  history: {
    width: 65,
    height: 65,
    border: 'none',
    backgroundSize: 'contain',
    backgroundImage: `url(${ic_history})`,
    backgroundColor: 'transparent',
  },
  restart: {
    width: 65,
    height: 65,
    border: 'none',
    backgroundSize: 'contain',
    backgroundImage: `url(${ic_restart})`,
    backgroundColor: 'transparent',
  },
  font: {
    fontSize: 30,
    textAlign: 'center',
    width: 100,
    color: '#9F5114',
    marginRight: 10,
  },
  detialFont: {
    width: '100%',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    textDecoration: 'underline',
  },
}
