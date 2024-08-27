// src/components/CustomFileUpload.js

import { Button, Typography, Box, Input } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

const CustomFileUpload = ({ file, onFileChange }) => {
    return (
        <Box textAlign="center" mt={2}>
            <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
                color="primary"
                style={{ textTransform: 'none' }}
            >
                {file ? file.name : 'Choose File'}
                <Input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    style={{ display: 'none' }}
                />
            </Button>
            <Typography variant="caption" color="textSecondary" mt={1}>
                Supported formats: JPEG, PNG, GIF
            </Typography>
        </Box>
    );
};

export default CustomFileUpload;
