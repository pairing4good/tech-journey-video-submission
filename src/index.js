import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify from "aws-amplify";
import config from "./aws-exports";
import { Container, Row, Col, Image } from 'react-bootstrap';
import { AmplifySignOut } from '@aws-amplify/ui-react';

Amplify.configure(config);

ReactDOM.render(
  <React.StrictMode>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
      integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
      crossorigin="anonymous"
    />
    <Container>
      <Row>
        <Col>
          <Image src="logo.png" />
        </Col>
        <Col style={{paddingTop: 20}}>
          <AmplifySignOut/>
        </Col>
      </Row>
      <Row>
        <Col>
          <p><b>Create a 1 minute video that answers the following question "How has Tech Camp impacted your own technology journey?"</b></p>
          <p><b>Video Submission Requirements - </b> <b>1)</b> video should be at least 1 minute long <b>2)</b> introduce yourself in your video 
          <b>3)</b> share your year in school in your video <b>4)</b> use the phrase "Tech Journey", at least once, in your video</p>
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
