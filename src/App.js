import './App.css';
import { Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function App() {

  async function onChange(e) {
    console.log('before if')
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    console.log('file: ' + file)
    await Storage.put(file.name, file);
  }

  return (
    <div className="App">
      <input type="file" onChange={onChange}/>
      <AmplifySignOut/>
    </div>
  );
}

export default withAuthenticator(App);
