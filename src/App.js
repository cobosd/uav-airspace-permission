import { Amplify } from 'aws-amplify'
import awsconfig from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import { Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import "./index.css";

Amplify.configure(awsconfig);

const App = () => {
  return (
    <Authenticator className="uav-airspace">
      {({ signOut, user }) => (
        <main>
          <Heading variation="primary">Hello {user.username}</Heading>
          <Button onClick={signOut}>Sign out</Button>
          {/* <Routes>
            <Route path="/" element={<MapView />} />
          </Routes> */}
        </main>
      )}
      
    </Authenticator>
  );
};

export default App;
