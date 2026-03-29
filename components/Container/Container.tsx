'use client'
import css from './Container.module.css'
import React from 'react'

interface ContainerProps {
  children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
  return <div className={css.container}>{children}</div>
}
