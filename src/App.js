import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Storage, API } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { createSubmission } from './graphql/mutations';
import { Auth } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';

const initialFormState = { 
  firstName: '',
  lastName: '',
  schoolGrade: '',
  videoLink: ''
 }

function App() {
  const videoSubmission = useRef(null);
  const [state, setState] = useState({isSubmitting: false});
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    Auth.currentAuthenticatedUser().then( user => {
      setFormData({ ...initialFormState, 'emailAddress': user.attributes.email})
    });
    
  }, []);


  async function save(){
    if (!videoSubmission.current.files[0]) return
    setState({isSubmitting: true});
    const file = videoSubmission.current.files[0];
    const fileName = (uuidv4() + "-" + file.name).replace(/\s/g, '');
    await Storage.put(fileName, file);

    await API.graphql({ query: createSubmission, variables: { input: { ...formData, 'videoLink': fileName } } });
    setFormData(initialFormState);
    videoSubmission.current.value = null;
    setState({isSubmitting: false});
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
              <Form.File ref={ videoSubmission }/>
            </Form.Group>
            <Form.Group>
              {state.isSubmitting ? <Spinner animation="border" variant="primary"/> :
                <Button onClick={save}>
                   Submit Video
                </Button>}
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default withAuthenticator(App);
