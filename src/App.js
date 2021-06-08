import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Storage, API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { createSubmission } from './graphql/mutations';
import { Auth} from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import { Row, Col, Form, Button, Spinner, FormFile} from 'react-bootstrap';

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
  const [validated, setValidated] = useState(false);

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

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    }else{
      save()
      setValidated(false);
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <div className="App">
      <Row>
        <Col style={{textAlign: 'left'}}>
          <p><b>Video Submission Requirements</b></p> 
          <ol>
            <li>Video should be at least 1 minute long</li>
            <li>Answers the question "How has Tech Camp impacted your own technology journey?"</li>
            <li>Introduce yourself in your video</li>
            <li>Use the phrase "Tech Journey" in your video</li>
          </ol>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control required type="text" onChange={e => setFormData({ ...formData, 'firstName': e.target.value})}
                placeholder="First Name"
                value={formData.firstName}/>
              <Form.Control.Feedback  type="invalid">Please provide your first name.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control required type="text" onChange={e => setFormData({ ...formData, 'lastName': e.target.value})}
                placeholder="Last Name"
                value={formData.lastName}/>
                <Form.Control.Feedback  type="invalid">Please provide your last name.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
            <Form.Control required
                as="select"
                value={formData.schoolGrade}
                onChange={e => setFormData({ ...formData, 'schoolGrade': e.target.value})}>
                <option value="">School Grade</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
                <option value="9">9th</option>
                <option value="10">10th</option>
                <option value="11">11th</option>
                <option value="12">12th</option>
              </Form.Control>
              <Form.Control.Feedback  type="invalid">Please provide your school grade.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <FormFile>
                <FormFile.Input required ref={ videoSubmission }/>
                <Form.Control.Feedback  type="invalid">Please provide a 1 minute video.</Form.Control.Feedback>
              </FormFile>
            </Form.Group>
            <Form.Group>
              {state.isSubmitting ? <Spinner animation="border" variant="primary"/> :
                <Button type="submit">
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
