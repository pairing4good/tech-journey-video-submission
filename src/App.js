import './App.css';
import React, { useState} from 'react';
import { Storage, API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { createSubmission } from './graphql/mutations';
import { Auth } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';

const initialFormState = { 
  firstName: '',
  lastName: '',
  emailAddress: '',
  schoolGrade: '',
  videoLink: ''
 }

function App() {
  const [formData, setFormData] = useState(initialFormState);

  async function uploadVideo(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    const fileName = (uuidv4() + "-" + file.name).replace(/\s/g, '');
    setFormData({ ...formData, 'videoLink': fileName})
    await Storage.put(fileName, file);
  }


  async function save(){
    const user = await Auth.currentAuthenticatedUser();
    const submission = { ...formData, 'emailAddress': user.attributes.email}
    await API.graphql({ query: createSubmission, variables: { input: submission } });
    setFormData(initialFormState);
  }

  return (
    <div className="App">
      <input type="text" onChange={e => setFormData({ ...formData, 'firstName': e.target.value})}
        placeholder="First Name"
        value={formData.firstName}/>
      <input type="text" onChange={e => setFormData({ ...formData, 'lastName': e.target.value})}
        placeholder="Last Name"
        value={formData.lastName}/>
        <select value={formData.schoolGrade}
          onChange={e => setFormData({ ...formData, 'schoolGrade': e.target.value})}>
          <option value="">--Select--</option>
          <option value="7">7th</option>
          <option value="8">8th</option>
          <option value="9">9th</option>
          <option value="10">10th</option>
          <option value="11">11th</option>
          <option value="12">12th</option>
        </select>
      <input type="file" onChange={uploadVideo}/>
      <button onClick={save}>Submit Video</button>
      <AmplifySignOut/>
    </div>
  );
}

export default withAuthenticator(App);
