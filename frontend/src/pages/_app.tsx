// other imports
import AuthUserProvider from '../components/auth/AuthUserProvider';
import { AppProps } from 'next/app'; // need to install
import { ChakraProvider } from '@chakra-ui/react'; // need to install
// npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion - didn't work because of firebase version

 function App({ Component, pageProps }: AppProps) {
   return (
     <ChakraProvider>
       <AuthUserProvider>
         <Component {...pageProps} />
       </AuthUserProvider>
     </ChakraProvider>
   );
 }

export default App;