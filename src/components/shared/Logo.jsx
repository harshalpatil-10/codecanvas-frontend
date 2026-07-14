import React from 'react'
import logoImg from '../../assets/logo1.png'

export default function Logo({ size = 22 }) {
  return (
    <img
      src={logoImg}
      alt="CodeCanvas"
      style={{ height: size, width: 'auto', display: 'block', flexShrink: 0 }}
    />
  )
}
