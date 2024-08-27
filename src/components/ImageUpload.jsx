// src/components/ImageUpload.js

import { useState } from 'react';
import { Button, TextField, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const Input = styled('input')({
  display: 'none',
});

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // File size validation (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size exceeds 10MB');
        setSelectedFile(null);
        return;
      }

      // File type validation
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setError('Invalid file type, only JPEG, PNG, and GIF are allowed.');
        setSelectedFile(null);
        return;
      }

      setError('');
      setSelectedFile(file);
    }
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setMessage('');
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('userId', userId);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(`Upload successful: ${response.data.image.url}`);
    } catch (error) {
      setMessage('');
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5">Upload Image</Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          label="User ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userId}
          onChange={handleUserIdChange}
        />
        <label htmlFor="file-upload">
          <Input
            accept="image/*"
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <Button
            variant="contained"
            component="span"
            color="primary"
            style={{ marginTop: '20px' }}
          >
            Choose File
          </Button>
        </label>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: '20px' }}
        >
          Upload
        </Button>
      </form>
      {loading && <CircularProgress style={{ marginTop: '20px' }} />}
      {message && <Typography variant="body1" style={{ marginTop: '20px' }}>{message}</Typography>}
      {error && <Typography variant="body1" color="error" style={{ marginTop: '20px' }}>{error}</Typography>}
    </div>
  );
};

export default ImageUpload;
