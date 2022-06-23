import '../styles/globals.css'

import { MoralisProvider } from 'react-moralis';
import {AmazonProvider} from '../context/amazonContext'
import {ModalProvider} from 'react-simple-hook-modal'

export const envData = {
  appId:process.env.NEXT_PUBLIC_MORALIS_APP_ID,
  serverUrl:process.env.NEXT_PUBLIC_MORALIS_SERVER,


}




function MyApp({ Component, pageProps }) {
  return(

  <MoralisProvider
    serverUrl={envData.serverUrl}
    appId={envData.appId}
    >
      <AmazonProvider>
        <ModalProvider>
         <Component {...pageProps} />
         </ModalProvider>
        </AmazonProvider>   
  </MoralisProvider>
  ) 
}

export default MyApp
