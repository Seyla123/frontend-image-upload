import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardMedia, Typography, CircularProgress, Container } from '@mui/material';

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:3000/images');
                setImages(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching images :', error);
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Image Gallery
            </Typography>
            <Grid container spacing={2}>
                {images.map((image) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={image.url}
                                alt={image.filename}
                            />
                            <Typography variant="caption" align="center">
                                {image.filename}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ImageGallery;
