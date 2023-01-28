import { Routes, Route } from "react-router-dom";
import MapView from "./pages/MapView";
import { Amplify } from 'aws-amplify'
import awsconfig from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig);

const App = () => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
          <Routes>
            <Route path="/" element={<MapView />} />
          </Routes>
        </main>
      )}
    </Authenticator>
  );
};

export default App;
