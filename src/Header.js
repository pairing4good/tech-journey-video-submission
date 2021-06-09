import './App.css';
import React from 'react';
import { Row, Col, Button, Image} from 'react-bootstrap';
import { Auth} from 'aws-amplify';

const signOut = (e) => {
    e.preventDefault();
    Auth.signOut();
    window.location.reload();
}

function Header(props) {
  return (
    <div>
    <Row>
        <Col>
        <Image src="logo.png" />
        </Col>
        <Col style={{paddingTop: 30}}>
        {props.showSignOut &&
                <Button onClick={signOut} variant="link">
                    Sign Out
                </Button>
        }
        </Col>
    </Row>
    <Row>
        <Col><h3>Video Submission</h3></Col>
    </Row>
    </div>
  );
}

export default Header;
