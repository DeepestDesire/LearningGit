import React, { useState, useEffect } from 'react'
import GameScene from './GameScene'

export default function game(props) {
  useEffect(() => {
    GameScene(props)
    return () => {
      const canvas = document.getElementsByTagName('canvas')[0]
      document.body.removeChild(canvas)
    }
  })
  return null
}
