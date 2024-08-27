// src/App.js

import { useState } from 'react';
import UploadForm from './components/UploadForm';
import ImageGallery from './components/ImageGallery';
import { CssBaseline, Container, Typography, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
      primary: {
          main: '#1976d2', // Customize your primary color
      },
      secondary: {
          main: '#dc004e', // Customize your secondary color
      },
  },
  typography: {
      fontFamily: 'Arial, sans-serif',
  },
});
function App() {
    const [refresh, setRefresh] = useState(false);

    const handleUpload = () => {
        setRefresh(prev => !prev);
    };

    return (
      <ThemeProvider theme={theme}>
        <div className="App">
            <CssBaseline />
            <Container>
                <Box my={4}>
                    <Typography variant="h3" gutterBottom align="center">
                        Image Upload and Gallery
                    </Typography>
                </Box>
                <UploadForm onUpload={handleUpload} />
                <ImageGallery key={refresh} />
            </Container>
        </div>
      </ThemeProvider>
    );
}

export default App;
