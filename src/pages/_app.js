import '../../styles/globals.css'
import '../../styles/desktop.css'
import '../../styles/mobile.css'
import '../../styles/style.css'

import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress

import AppContext from '../utils/context/AppContext'

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return <>
    <AppContext>
      <Component {...pageProps} />
    </AppContext>
  </>
}

export default MyApp
