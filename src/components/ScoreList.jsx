import React from 'react'
import p_cell from '@images/p_cell.png'
import p_cellMe from '@images/p_cellMe.png'

export default function ScoreList(props) {
  let { data } = props
  const mobile = localStorage.getItem('mobile')
  return (
    <div style={styles.containner}>
      {data.map((cellData, index) => {
        console.log(cellData, mobile)
        if (cellData.mobile === mobile) {
          cellData.isSelf = true
        }
        return <Cell data={cellData} key={index} index={index + 1}></Cell>
      })}
    </div>
  )
}

const styles = {
  containner: {
    width: 270,
    marginTop: 90,
    height: 260,
    overflow: 'auto',
  },
  cell: {
    width: 270,
    backgroundImage: `url(${p_cell})`,
    backgroundSize: '100% 100%',
    fontSize: 14,
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 63,
  },
}

function Cell(props) {
  const { data, index } = props

  return (
    <div
      style={
        data.isSelf
          ? {
              ...styles.cell,
              color: '#9F5114',
              backgroundImage: `url(${p_cellMe})`,
            }
          : styles.cell
      }
    >
      <div style={{ marginLeft: 15 }}>{index}</div>
      <div style={{ marginLeft: 40 }}>
        <div style={{ height: 15, marginBottom: 8 }}>
          {`${data.username}`.replace(/^(.).*(.)$/, '$1**')}
        </div>
        <div>{data.score}</div>
      </div>
    </div>
  )
}
