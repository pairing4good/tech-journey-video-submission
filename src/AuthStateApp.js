import React from 'react';
import './App.css';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import Header from './Header';
import App from './App'


const AuthStateApp = () => {
    const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
        <Header showSignOut={true}/>
        <App />
    </div>
    ) : (
    <div>
        <Header showSignOut={false}/>
        <AmplifyAuthenticator>
            <AmplifySignUp
            slot="sign-up"
            formFields={[
                { type: "username" },
                { type: "password" },
                { type: "email" }
            ]}
            />
        </AmplifyAuthenticator>
    </div>
  );
}

export default AuthStateApp;