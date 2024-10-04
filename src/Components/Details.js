'use client';
import React from 'react';
import { Box, Grid, Typography, Button, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; 
import { format } from 'date-fns';

export default function Details({ close, checkin }) {
    const getOrdinalSuffix = (day) => {
        const j = day % 10;
        const k = day % 100;
        if (j === 1 && k !== 11) {
            return "st";
        }
        if (j === 2 && k !== 12) {
            return "nd";
        }
        if (j === 3 && k !== 13) {
            return "rd";
        }
        return "th";
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '699px',
                height: '463px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: 24,
                zIndex: 999,
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
                    onClick={close}
                />
            </Typography>
            <Box sx={{ padding: 4 }}>
                <Grid container spacing={2} sx={{ marginY: '40px' }}>
                    <Grid item xs={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6">Booking ID:</Typography>
                                    <Typography variant="body1">123456</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6">Rooms:</Typography>
                                    <Typography variant="body1">2</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6">Number of Guests:</Typography>
                                    <Typography variant="body1">4</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6">Booked Date:</Typography>
                                    <Typography variant="body1">{
                                        (() => {
                                            const date = new Date(checkin.createdAt);
                                            const day = format(date, 'd');
                                            const month = format(date, 'MMMM');
                                            const year = format(date, 'yyyy');
                                            return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
                                        })()
                                    }</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar
                            alt="User Image"
                            src={checkin.imagePath}
                            sx={{ width: 256, height: 136, borderRadius: '18px' }}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                    <Button variant="outlined" color="secondary" sx={{ marginRight: 2 }} onClick={close}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#7B5AFF', '&:hover': { backgroundColor: '#6A4DE7' } }}
                        onClick={close}
                    >
                        OK
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
