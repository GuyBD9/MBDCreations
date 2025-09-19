// _app.js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MyApp({ Component, pageProps }) {
  return (
    <div style={{minHeight: '100vh', display:'flex', flexDirection:'column'}}>
      <Navbar />
      <div style={{flex:1}}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}