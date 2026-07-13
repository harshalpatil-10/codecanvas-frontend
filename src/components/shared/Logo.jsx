import React from 'react'
import logoImg from '../../assets/logonew.png'

export default function Logo({ size = 22, rounded = true }) {
  return (
    <img
      src={logoImg}
      alt="CodeCanvas"
      width={size}
      height={size}
      style={{ borderRadius: rounded ? size * 0.28 : 0, display: 'block', flexShrink: 0 }}
    />
  )
}
