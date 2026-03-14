import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>PinClone - Modern Visual Discovery</title>
        <meta name="description" content="A visual discovery engine for finding ideas like recipes, home and style inspiration." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <div className="min-h-screen bg-white">
        <Component {...pageProps} />
      </div>
    </>
  );
}
