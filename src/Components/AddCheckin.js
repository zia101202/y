"use client"; 
import React, { useState, useRef } from 'react';
import { Box, TextField, Button, Typography, Grid, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

const AddCheckin = ({ setShowForm ,setreloaddata}) => {
    const [title, setTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedImage) {
            setMessage('Please select an image to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('title', title);

        try {
            const res = await fetch('/api/addCheck', {
                method: 'POST',
                body: formData,
            });

            const result = await res.json();

            if (result.success) {
                setMessage(`Check-in added successfully with ID: ${result.id}`);
                setShowForm(false);
                setTitle('');
                setSelectedImage(null);
                setreloaddata(true)
            } else {
                setMessage(`Error: ${result.message}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: 3,
                    maxWidth: 572,
                    width: '90%',
                    position: 'relative',
                    borderRadius: 4,
                }}
            >
                <Typography variant="h6" sx={{ background: '#F8F8F8', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', padding: '10px' }} gutterBottom>
                    Add Check-In
                    <CloseIcon
                        sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            cursor: 'pointer',
                        }}
                        onClick={() => setShowForm(false)}
                    />
                </Typography>
                <Box sx={{ padding: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                        Title
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Enter title"
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            sx={{
                                marginBottom: 2,
                                '& .MuiOutlinedInput-root': {
                                    '& input': {
                                        padding: '8px 14px',
                                        fontSize: '0.875rem',
                                        lineHeight: 1,
                                    },
                                    '& fieldset': {
                                        borderRadius: '5px',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    lineHeight: 0.9,
                                },
                            }}
                        />
                        <Paper
                            elevation={3}
                            sx={{
                                padding: 2,
                                border: '2px dashed #D9D9D9',
                                backgroundColor: selectedImage ? '#f5f5f5' : '#ffffff',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                            }}
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                            onClick={handleIconClick}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                            />
                            {selectedImage ? (
                                <Typography variant="body1">{selectedImage.name}</Typography>
                            ) : (
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <CloudUploadIcon sx={{ color: '#7B5AFF', fontSize: 40, marginBottom: 1 }} />
                                    <Typography variant="body1" fontWeight="bold">
                                        Drag and drop an image here or click to select
                                    </Typography>
                                    <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 1 }}>
                                        Support for single or bulk upload strictly prohibited from uploading company data or other banned files
                                    </Typography>
                                </Box>
                            )}
                        </Paper>
                        <Grid container spacing={2} sx={{ marginTop: 2, justifyContent: 'flex-end' }}>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        color: 'black',
                                        borderColor: '#D3D3D3',
                                        width: 80,
                                        borderRadius: 5,
                                    }}
                                    onClick={() => {
                                        setTitle('');
                                        setSelectedImage(null);
                                        setMessage('');
                                        setShowForm(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        backgroundColor: '#7B5AFF',
                                        '&:hover': { backgroundColor: '#6A4DE7' },
                                        width: 80,
                                        borderRadius: 5,
                                    }}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    {message && (
                        <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
                            {message}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default AddCheckin;
