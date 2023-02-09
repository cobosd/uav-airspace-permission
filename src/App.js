import { Storage, Amplify } from 'aws-amplify'
import awsconfig from './aws-exports';
import { useState, useEffect } from "react";
import { Authenticator } from '@aws-amplify/ui-react';
import {
  Button,
  Heading,
  Flex,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './index.css';

Amplify.configure(awsconfig);

const App = () => {
  const [state, setState] = useState([]);
  const [refreshCounter, setRefreshCounter] = useState([]);


  function onUpload(e) {
    const file = e.target.files[0];

    Storage.put(file.name, file, {
      contentType: 'image/png'
    }).then(async (result) => {
      setState({file: URL.createObjectURL(file)});
      setRefreshCounter(1);
      const data = await Storage.list('', { level: 'public' });
        const results = data['results'];
        if (results[0].key === '') {
          results.shift();
        }
        setObjects(results);
      console.log(result);
    });
  }

  async function handleDelete(imageKey) {
    try {
      await Storage.remove(imageKey);
      setRefreshCounter(0);
      alert('Image deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete image');
    }
  };

  async function handleShowMedia(imageKey) {
    try {
      const signedURL = await Storage.get(imageKey, { level: 'public' });
      setState({file: signedURL});
      setRefreshCounter(1);
    } catch (error) {
      console.error(error);
      alert('Failed to show images');
    }
  };

  const [objects, setObjects] = useState([]);

  useEffect(() => {
    async function getAllObjects() {
      try {
        const data = await Storage.list('', { level: 'public' });
        const results = data['results'];
        if (results[0].key === '') {
          results.shift();
        }
        setObjects(results);
      } catch (error) {
        console.error(error);
      }
    }

    getAllObjects();
  }, [refreshCounter]);

  return (
    <Authenticator className="uav-airspace">
      {({ signOut, user }) => (
        <main>
          <div className='u-mar-top-32'>
            <Heading variation="primary">Hello {user.username}</Heading>
            <Button onClick={signOut}>Sign out</Button>
          </div>
          <div>
            { objects.length > 0 && <Flex direction="column">
              <Table variation="bordered" highlightOnHover={true}>
                <TableHead>
                  <TableRow>
                    <TableCell as="th">
                      Stored Media Lists
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {objects.map(obj => (
                    <TableRow key={obj.key}>
                      <TableCell>{obj.key}</TableCell>
                      <TableCell>
                        <Link
                          href="#"
                          color="#007EB9"
                          onClick={() => handleShowMedia(obj.key)}
                          >
                          show
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          href="#"
                          color="#007EB9"
                          onClick={() => handleDelete(obj.key)}
                          >
                          Delete
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Flex> }
            <div className='u-mar-top-32'>
              <p>Please select an image to upload</p>
              <input type="file" onChange={onUpload} />
              { objects.length > 0 && <div>
                <img alt="" src={state.file} />
              </div> }
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
