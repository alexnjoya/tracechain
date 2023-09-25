import "../styles/jank-empty.css";
import "../styles/globals.css";

//internal import
import { TrackingProvider } from "../Conetxt/TrackingContext";

import { NavBar, Footer } from "../Components";

export default function App({ Component, pageProps }) {
  return (
    <>
      <TrackingProvider>
        <NavBar />
        <Component {...pageProps} />
      </TrackingProvider>
      <Footer />
    </>
  );
}
