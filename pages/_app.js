import Link from "next/link";
import Image from "next/image";
import Logo from "../Images/Logo.png";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import StartingPageContent from "../components/starting-page/starting-page";
import classes from "./app.module.css";

import Layout from "../components/layout/layout";
import NavBarGuest from "../components/layout/navBarGuest";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ClerkProvider>
        <>
          <SignedIn>
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
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </div>
          </SignedIn>
        </>
        <SignedOut>
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
            <div className={classes.headerWrapper}>
              <header className={classes.header}>
                <NavBarGuest />
              </header>
            </div>
            <StartingPageContent />
          </div>
        </SignedOut>
      </ClerkProvider>
    </>
  );
}

export default MyApp;
