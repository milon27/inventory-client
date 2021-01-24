import '../../styles/globals.css'
import '../../styles/desktop.css'
import '../../styles/mobile.css'
import '../../styles/style.css'

import AppContext from '../utils/context/AppContext'

function MyApp({ Component, pageProps }) {


  return <>
    <AppContext>
      <Component {...pageProps} />
    </AppContext>
  </>
}

export default MyApp
