import '../styles/globals.css'
import 'react-simple-hook-modal/dist/styles.css';

import { MoralisProvider } from 'react-moralis';
import {AmazonProvider} from '../context/amazonContext'
import {ModalProvider} from 'react-simple-hook-modal'




function MyApp({ Component, pageProps }) {
  return(

  <MoralisProvider
    appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
    serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER}>
      <AmazonProvider>
        <ModalProvider>
         <Component {...pageProps} />
         </ModalProvider>
        </AmazonProvider>   
  </MoralisProvider>
  ) 
}

export default MyApp
