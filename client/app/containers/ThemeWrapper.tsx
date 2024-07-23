"use client"

import { useTheme } from 'next-themes'
import React, { useEffect } from 'react'

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
    const { theme } = useTheme()

  useEffect(() => {
    if (theme === 'dark') {
      document.body.setAttribute('data-theme', 'dark')
    } else {
      document.body.setAttribute('data-theme', 'light')
    }
  }, [theme])

  return <>{children}</>
}

export default ThemeWrapper