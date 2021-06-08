import './App.css';
import React, { useState, useEffect} from 'react';
import { Storage, API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { createSubmission } from './graphql/mutations';
import { Auth } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import { Row, Col, Form, Button } from 'react-bootstrap';

const initialFormState = { 
  firstName: '',
  lastName: '',
  schoolGrade: '',
  videoLink: ''
 }

function App() {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    Auth.currentAuthenticatedUser().then( user => {
      setFormData({ ...formData, 'emailAddress': user.attributes.email})
    });
    
  }, []);

  async function uploadVideo(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    const fileName = (uuidv4() + "-" + file.name).replace(/\s/g, '');
    setFormData({ ...formData, 'videoLink': fileName})
    await Storage.put(fileName, file);
  }


  async function save(){
    await API.graphql({ query: createSubmission, variables: { input: formData } });
    setFormData(initialFormState);
  }

  return (
    <div className="App">
      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Form.Control type="text" onChange={e => setFormData({ ...formData, 'firstName': e.target.value})}
                placeholder="First Name"
                value={formData.firstName}/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" onChange={e => setFormData({ ...formData, 'lastName': e.target.value})}
                placeholder="Last Name"
                value={formData.lastName}/>
            </Form.Group>
            <Form.Group>
            <Form.Control
                as="select"
                value={formData.schoolGrade}
                onChange={e => setFormData({ ...formData, 'schoolGrade': e.target.value})}>
                <option value="">--Select--</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
                <option value="9">9th</option>
                <option value="10">10th</option>
                <option value="11">11th</option>
                <option value="12">12th</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.File onChange={uploadVideo}/>
            </Form.Group>
            <Form.Group>
                <Button onClick={save}>Submit Video</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <AmplifySignOut/>
        </Col>
      </Row>
    </div>
  );
}

export default withAuthenticator(App);
