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

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <RecoilRoot>
//       <Component {...pageProps} />
//     </RecoilRoot>
//   )
// }

const _app = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <>
        <Component {...pageProps} />
      </>
    </RecoilRoot>
  )
}

export default _app
