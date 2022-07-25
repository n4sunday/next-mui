import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import Head from 'next/head'

import { GlobalStyle } from 'GlobalStyle'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import ProgressBar from '@badrap/bar-of-progress'

import { theme } from '../src/theme'
import createEmotionCache from '../src/createEmotionCache'
import '../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const progress = new ProgressBar({
  size: 4,
  className: 'bar-of-progress',
  color: '#00CDDA',
  delay: 100,
})

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  Router.events.on('routeChangeStart', progress.start)
  Router.events.on('routeChangeComplete', progress.finish)
  Router.events.on('routeChangeError', progress.finish)

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Next MUI</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
