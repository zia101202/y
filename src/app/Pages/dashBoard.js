'use client';
import React, { useState } from 'react';
import GetCheckin from '../../Components/GetCheckin';
import AddCheckin from '../../Components/AddCheckin';
import { AppBar, Toolbar, Typography, Button, Box, Card, CardMedia } from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [reload, setreloaddata] = useState(false);
  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <Box sx={{ mx: 10 }}>
        <AppBar sx={{ background: 'white', marginTop: '26px', borderRadius: '18px', boxShadow: '14px 17px 40px 0px #7090B014' }} position="static">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              MyLogo
              <Box component="img" src="/images/logo.png" alt="My Image" sx={{ width: '47.5px', height: '38px', marginX: '10px', borderRadius: '16px' }} />
            </Typography>
            <Box>
              <Button color="inherit" sx={{ background: '#7B5AFF', borderRadius: '18px', paddingX: '15px', marginBottom: '14px', textTransform: 'none' }}>
                Feedback
              </Button>
              <Box component="img" src="/images/b.jpg" alt="My Image" sx={{ width: '23px', height: '24px', marginX: '10px', marginBottom: '5px' }} />
              <Box component="img" src="/images/c.jpg" alt="My Image" sx={{ width: '23px', height: '24px', marginX: '0px', marginBottom: '5px' }} />
              <Box component="img" src="/images/d.jpg" alt="My Image" sx={{ width: '47.5px', height: '32px', marginX: '10px' }} />
              <Box component="img" src="/images/a.jpg" alt="My Image" sx={{ width: '10px', height: '10px', marginX: '1px', marginBottom: '10px' }} />
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ position: 'relative', marginBottom: 5, marginTop: 3 }}>
          <Card sx={{ borderRadius: '20px', boxShadow: '14px 17px 40px 0px #00000021' }}>
            <CardMedia
              component="img"
              image="/uploads/zia.jpg"
              alt="Full Width Image"
              sx={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                position: 'relative',
              }}
            />
          </Card>

          <Typography
            variant="contained"
            onClick={handleToggleForm}
            sx={{
              position: 'absolute',
              top: 110,
              left: 16,
              borderRadius: '20px',
              padding: '10px 20px',
              textTransform: 'none',
              backgroundColor: 'transparent',
              color: 'white',
              fontWeight: '600',
              fontSize: '1.8rem',
              '&:hover': { backgroundColor: 'rgba(106, 77, 231, 0.8)' }
            }}
          >
            Hi! James Doe
          </Typography>

          <Typography
            variant="contained"
            onClick={handleToggleForm}
            sx={{
              position: 'absolute',
              top: 160,
              left: 16,
              borderRadius: '20px',
              padding: '10px 20px',
              textTransform: 'none',
              backgroundColor: 'transparent',
              color: 'white',
              fontWeight: '300',
              fontSize: '0.9rem',
              '&:hover': { backgroundColor: 'rgba(106, 77, 231, 0.8)' }
            }}
          >
            Hi James Doe lorem term you nop nutm ui
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleToggleForm}
            sx={{
              position: 'absolute',
              top: 220,
              left: 26,
              borderRadius: '20px',
              padding: '10px 20px',
              textTransform: 'none',
              backgroundColor: '#7B5AFF',
              '&:hover': { backgroundColor: '#6A4DE7' }
            }}
          >
            Add Check-In
          </Button>

          <Box sx={{ marginTop: 3 }}>
            <GetCheckin />
          </Box>

          {showForm && (
            <Box sx={{ marginTop: 3 }}>
              <AddCheckin setShowForm={setShowForm} setreloaddata={setreloaddata} />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
