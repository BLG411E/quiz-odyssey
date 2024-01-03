import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Daily.odyssey</title>  
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></Script>
      
      <Component {...pageProps}/>
    </>
  )
}
