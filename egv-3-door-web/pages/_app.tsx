import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SnackbarProvider, useSnackbar } from 'notistack'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SnackbarProvider>
        <Component {...pageProps} />
      </SnackbarProvider>
    </RecoilRoot>
  )
}

// const _app = ({ Component, pageProps }: AppProps) => {
//   return (
//     <RecoilRoot>
//       <SnackbarProvider>
//         <Component {...pageProps} />
//       </SnackbarProvider>
//     </RecoilRoot>
//   )
// }

// export default _app
