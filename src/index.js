import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify from "aws-amplify";
import config from "./aws-exports";
import { Auth} from 'aws-amplify';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

Amplify.configure(config);

const signOut = (e) => {
  e.preventDefault();
  Auth.signOut();
  window.location.reload();
}

ReactDOM.render(
  
  <React.StrictMode>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
      integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
      crossorigin="anonymous"
    />
    <Container style={{padding: 20}}>
      <Row>
        <Col>
          <Image src="logo.png" />
        </Col>
        <Col style={{paddingTop: 30}}>
          <Button onClick={signOut} variant="link">
            Sign Out
          </Button>
        </Col>
      </Row>
      <App />
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
