import { Provider } from "next-auth/client";
import classes from "./app.module.css";

import Layout from "../components/layout/layout";

function MyApp({ Component, pageProps }) {
  return (
    <div className={classes.main}>
      <head>
        <meta
          name="viewport"
          content="target-densitydpi=device-dpi, width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <style jsx global>{`
        html,
        body {
          height: 100vh;
          overflow-x: hidden;
          overflow-y: auto;
          background-color: #becae6;
          padding: 0;
          margin: 0;
        }
      `}</style>
      <Provider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </div>
  );
}

export default MyApp;
