// src/components/UploadForm.js

import { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Grid, Typography, Container, Snackbar, Alert, CircularProgress, Box } from '@mui/material';
import CustomFileUpload from './CustomFileUpload';

const UploadForm = ({ onUpload }) => {
    const [file, setFile] = useState(null);
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUserIdChange = (event) => {
        setUserId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file || !userId) {
            setSnackbarMessage('Please provide a user ID and select an image.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('image', file);
        formData.append('userId', userId);

        try {
            const response = await axios.post('https://api.seavseyla.store/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSnackbarMessage('Image uploaded successfully!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            onUpload(); // Notify parent component to refresh the image list
        } catch (error) {
            setSnackbarMessage('Error uploading image.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Upload Image
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="User ID"
                            variant="outlined"
                            value={userId}
                            onChange={handleUserIdChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomFileUpload file={file} onFileChange={handleFileChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            style={{ marginTop: '16px' }}
                        >
                            {loading ? (
                                <Box display="flex" alignItems="center">
                                    <CircularProgress size={24} color="inherit" />
                                    <Typography variant="body2" style={{ marginLeft: '8px' }}>
                                        Uploading...
                                    </Typography>
                                </Box>
                            ) : (
                                'Upload'
                            )}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default UploadForm;
