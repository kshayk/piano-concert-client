import '../styles/globals.css';
import '../styles/Piano.css';
import '../styles/Room.css';
import {Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'

function MyApp({ Component, pageProps }) {
  return <Container style={{display: "flex", alignContent:"center",minHeight: "100vh"}}>
    <Component {...pageProps} />
  </Container>
}

export default MyApp
