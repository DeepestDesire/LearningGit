import React, { useState, useEffect } from 'react'
import GameScene from './GameScene'

export default function game(props) {
  useEffect(() => {
    GameScene()
  })
  return null
}
