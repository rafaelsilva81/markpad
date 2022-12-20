import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='preconnect'
          href='https://fonts.googleapis.com'
        />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&display=swap'
          rel='stylesheet'
        />
        <meta
          name='keywords'
          content='markdown, editor, notes, ideas, share, next.js, tailwindcss, vercel, lock, notepad, dontpad'
        />
        <meta
          name='author'
          content='Rafael Galdino da Silva'
        />
        <meta
          http-equiv='content-type'
          content='text/html; charset=UTF-8'
        />
        <meta
          name='robots'
          content='index,folow'
        />
        <meta
          name='googlebot'
          content='index,folow'
        />
        <meta
          name='rating'
          content='general'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <meta
          property='og:title'
          content='Markpad - Simple Markdown Editor'
        />
        <meta
          property='og:type'
          content='website'
        />
        <meta
          property='og:image'
          content='https://markpad.vercel.app/android-chrome-512x512'
        />
        <link
          rel='canonical'
          href='https://markpad.vercel.app/'
        />
        <meta
          property='og:url'
          content='https://markpad.vercel.app/'
        />
        <meta
          property='og:description'
          content='Markpad is a simple markdown editor, built for sharing notes and ideas.'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
