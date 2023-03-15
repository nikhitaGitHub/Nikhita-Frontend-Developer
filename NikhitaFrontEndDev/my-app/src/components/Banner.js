import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const Banner = () => {
    return(
    <Card sx={{ display: 'flex'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%'}}>
            <CardContent sx={{ flex: '1 0 auto'}}>
                <Typography component="div" variant="h2">
                    Space Exploration
                </Typography>
                <Typography variant="h4" color="text.secondary" component="div" sx={{paddingY:'10%'}}>
                    Spacex's Capsules
                </Typography>
                <Typography variant="h5" color="text.secondary" component="div" sx={{paddingY:'10%'}}>
                    Best in class and quality
                </Typography>
            </CardContent>   
        </Box>
        <CardMedia
            component="img"
            sx={{ width: '50% '}}
            image="capsule1.jpg"
            alt="Live from space album cover"
        />
    </Card>);
}

export default Banner;