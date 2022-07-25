import React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
} from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import createEmotionCache from 'createEmotionCache'

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: EmotionJSX.Element[]
}
export default function MyDocument(props: MyDocumentProps) {
  return (
    <Html>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="crossOrigin"
        />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        {props.emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage

  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props: any) {
          return <App emotionCache={cache} {...props} />
        },
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    emotionStyleTags,
  }
}
