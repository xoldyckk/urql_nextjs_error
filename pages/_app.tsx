import "../styles/globals.css";
import type { AppProps } from "next/app";
import { withUrqlClient } from "next-urql";
import { dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { devtoolsExchange } from "@urql/devtools";

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default withUrqlClient(
  (ssrExchange) => ({
    url: "/api/graphql",
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cacheExchange({}),
      ssrExchange,
      fetchExchange,
    ],
  }),
  {
    ssr: false,
  }
)(App);
