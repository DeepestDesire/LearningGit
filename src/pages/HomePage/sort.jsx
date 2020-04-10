import React, { useState, useEffect } from 'react'
import ScoreList from 'components/ScoreList.jsx'
import { getTopList } from 'network/index'

import p_bg from '@images/p_bg.png'
import p_history from '@images/p_history.png'
import ic_close from '@images/ic_close.png'

export default function Sort(props) {
  const [data, setData] = useState([])

  useEffect(() => {
    if (data.length === 0) {
      getTopList()
        .then(({ data: { data, code } }) => {
          if (code === '000') {
            setData(data)
          }
        })
        .catch(err => console.log(err))
    }
  })

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
          <ScoreList data={data}></ScoreList>
        </div>
        <div style={styles.buttonArray}>
          <div
            style={styles.restart}
            onClick={() => {
              props.history.push('/game')
            }}
          />
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
    height: 370,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${p_history})`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  restart: {
    width: 65,
    height: 65,
    border: 'none',
    backgroundSize: 'contain',
    backgroundImage: `url(${ic_close})`,
    backgroundColor: 'transparent',
  },
}
