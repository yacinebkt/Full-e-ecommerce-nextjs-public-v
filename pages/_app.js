import { SnackbarProvider } from 'notistack';
import {useEffect} from 'react'
import '../styles/globals.css'
import { StoreProvider } from '../utils/store/Store'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'



function MyApp({ Component, pageProps }) {

  useEffect(() => {
    // remove css for server side rendring
    const InitialCssStyles= document.querySelector('#jss-server-side')
    if (InitialCssStyles) {
      InitialCssStyles.parentElement.removeChild(InitialCssStyles)
    }
  }, [])

  return (
    
   
      <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <StoreProvider>
          <PayPalScriptProvider deferLoading={true}>
        

            <Component {...pageProps} />
         

          </PayPalScriptProvider>
        </StoreProvider>
      </SnackbarProvider>


  )
  
}

export default MyApp
