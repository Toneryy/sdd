import React from 'react'
import styles from './Skeleton.module.scss'

interface Props {
  width?: number | string
  height?: number | string
  radius?: number
  className?: string
}

const Skeleton: React.FC<Props> = ({ width = '100%', height = 16, radius = 8, className }) => {
  const style: React.CSSProperties = {
    width,
    height,
    borderRadius: radius,
  }
  return <div className={`${styles.skel} ${className || ''}`} style={style} />
}

export default Skeleton


