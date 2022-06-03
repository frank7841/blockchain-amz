import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis';
import {AmazonProvider} from '../context/amazonContext'



function MyApp({ Component, pageProps }) {
  return(

  <MoralisProvider
    appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
    serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER}>
      <AmazonProvider>
         <Component {...pageProps} />
        </AmazonProvider>   
  </MoralisProvider>
  ) 
}

export default MyApp
