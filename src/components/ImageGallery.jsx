// src/components/ImageGallery.js

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardMedia, CardContent, Typography, Skeleton, Container } from '@mui/material';

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('https://api.seavseyla.store/images');
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom align="center" my={4}>
                Image Gallery
            </Typography>
            <Grid container spacing={3}>
                {loading ? (
                    Array.from(new Array(6)).map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <Skeleton variant="rectangular" width="100%" height={140} />
                                <CardContent>
                                    <Skeleton width="60%" />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    images.map((image) => (
                        <Grid item xs={12} sm={6} md={4} key={image.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={image.url}
                                    alt={image.filename}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {image.filename}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Container>
    );
};

export default ImageGallery;
