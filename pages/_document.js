import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const {html, head} = renderPage()
    const styles = flush()
    return { html, head, styles }
  }

  render () {
    return (
    <html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#FED230" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="white" />
        <style jsx global>{`
          body, html {
            width: 100%;
            height: 100%;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
          }
          body > div:nth-child(1), #__next, #__next > div {
            height: 100%;
          }
          * { box-sizing: border-box }
        `}</style>
        <link type="text/css" rel="stylesheet" href="/static/styles.css" />
        
        <link rel="apple-touch-icon-precomposed" href="/static/icon-152.png" />
        <link rel="icon" href="/static/icon-32.png" sizes="32x32" />

        <title>Ya Llega</title>
        <meta name="description" content="Sabe en cuanto tiempo llega el proximo bondi" />

        <meta name="twitter:card" value="summary" />
        <meta name="twitter:image" content="https://yallega.com.ar/static/social.png" />

        <meta property="og:title" content="Ya Llega" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://yallega.com.ar/" />
        <meta property="og:image" content="https://yallega.com.ar/static/social.png" />
        <meta property="og:description" content="Sabe en cuanto tiempo llega el proximo bondi" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </html>
    )
  }
}
