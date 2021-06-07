import './App.css';
import { Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';

function App() {

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    const user = await Auth.currentAuthenticatedUser();
    await Storage.put(user.username + "-"  + uuidv4() + "-" + file.name, file);
  }

  return (
    <div className="App">
      <input type="file" onChange={onChange}/>
      <AmplifySignOut/>
    </div>
  );
}

export default withAuthenticator(App);
