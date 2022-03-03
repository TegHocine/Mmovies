import React from 'react'

import './buttons.scss'

export default function Buttons({ className, onClick, children }) {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick ? () => onClick() : null}>
      {children}
    </button>
  )
}

export const ButtonsOutline = ({ className, onClick, children }) => {
  return (
    <Buttons
      className={`btn-outline ${className}`}
      onClick={onClick ? () => onClick() : null}>
      {children}
    </Buttons>
  )
}
