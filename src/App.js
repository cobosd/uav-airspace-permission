import { Storage, Amplify } from 'aws-amplify'
import awsconfig from './aws-exports';
import { useState } from "react";
import { Authenticator } from '@aws-amplify/ui-react';
import { Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import "./index.css";

Amplify.configure(awsconfig);

const App = () => {
  const [state, setState] = useState([]);

  function onUpload(e) {
    const file = e.target.files[0];
    console.log(file);

    Storage.put(file.name, file, {
      contentType: 'image/png'
    }).then((result) => {
      setState({file: URL.createObjectURL(file)});
      console.log(result);
    })

  }

  return (
    <Authenticator className="uav-airspace">
      {({ signOut, user }) => (
        <main>
          <Heading variation="primary">Hello {user.username}</Heading>
          <Button onClick={signOut}>Sign out</Button>
          <div>
            <div>
              <p>Please select an image to upload</p>
              <input type="file" onChange={onUpload} />
            </div>
            <div>
              <img alt="" src={state.file} />
            </div>
          </div>
          {/* <Routes>
            <Route path="/" element={<MapView />} />
          </Routes> */}
        </main>
      )}
      
    </Authenticator>
  );
};

export default App;
