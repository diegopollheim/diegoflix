import {SWRConfig} from "swr";
import AppProvider from "../contexts/AppProvider";
import "../styles/globals.css";
require('dotenv').config()


function MyApp({Component, pageProps}) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
      }}
    >
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </SWRConfig>
  );
}

export default MyApp;
