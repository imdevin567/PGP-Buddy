import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  FormControlLabel,
  FormGroup,
  Typography,
  Radio,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const App = () => {
  const [message, setMessage] = useState('');
  const [publicKeys, setPublicKeys] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [action, setAction] = useState('Sign'); // Default to 'Sign'

  useEffect(() => {
    fetch('/api/keys/public')
      .then(res => res.json())
      .then(data => setPublicKeys(data.keys))
      .catch(err => console.error('Error fetching public keys:', err));
  }, []);

  const handleRadioChange = (e) => {
    setSelectedKey(e.target.value);
  };

  const handleActionChange = (e) => {
    setAction(e.target.value);
  };

  const performAction = async () => {
    if (action === 'Sign') {
      await signMessage();
    } else if (action === 'Encrypt') {
      await encryptMessage();
    } else if (action === 'Decrypt') {
      await decryptMessage();
    }
  };

  const signMessage = async () => {
    const res = await fetch('/api/sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    setMessage(data.message);
  };

  const encryptMessage = async () => {
    const encryptionKey = publicKeys[parseInt(selectedKey, 10)];
    const res = await fetch('/api/encrypt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, key: encryptionKey })
    });
    const data = await res.json();
    setMessage(data.message);
  };  

  const decryptMessage = async () => {
    const res = await fetch('/api/decrypt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <Container>
      <Typography variant='h4'>PGP Helper</Typography>

      <FormControl fullWidth variant='outlined' style={{ marginBottom: '20px' }}>
        <InputLabel>Action</InputLabel>
        <Select value={action} onChange={handleActionChange} label='Action'>
          <MenuItem value={'Sign'}>Sign</MenuItem>
          <MenuItem value={'Encrypt'}>Encrypt</MenuItem>
          <MenuItem value={'Decrypt'}>Decrypt</MenuItem>
        </Select>
      </FormControl>

      {action === 'Encrypt' && (
        <FormGroup style={{ marginBottom: '20px' }}>
          {publicKeys.map((keyId, index) => (
            <FormControlLabel
              key={keyId}
              control={
                <Radio
                  checked={selectedKey === index.toString()}
                  onChange={handleRadioChange}
                  value={index.toString()}
                  name='publicKeyRadio'
                />
              }
              label={keyId}
            />
          ))}
        </FormGroup>
      )}

      <TextField
        label='Message'
        multiline
        rows={40}
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Button variant='contained' color='primary' onClick={performAction}>
        {action}
      </Button>
    </Container>
  );
};

export default App;
