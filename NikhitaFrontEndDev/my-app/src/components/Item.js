import { Grid, Typography } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import store from '../store';
import { Dialog, DialogContent, DialogTitle, Button, Box, DialogActions} from '@mui/material';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CircularProgress from '@mui/material/CircularProgress';
const Item = ({pageNumber}) => {
    const [id, setId] = useState(false)
    const [data, setData] = useState(null)
    useEffect(() => {
        let state = store.getState();
        var values = state?.data?.result;
        if(values)  {
            if(pageNumber == '1') {
                values = values.slice(0, 10)
            }
            else if (pageNumber == '2') {
                values = values.slice(10, 20)
            }
            else if (pageNumber == 3) {
                values = values.slice(20,30)
            }
            setData(values)
        }
        else {
            setData(values)
        }
    }, [store.getState(), pageNumber])

    const handleCancel = () => {
        setId(null)
    }
    
    return (
    <>
        {data ?
            (data.length > 0 && data.map((obj, idx)  => {
                return (
                <>
                <Card
                    key={idx}
                    variant="outlined"
                    orientation="horizontal"
                    sx={{
                        padding: '5%',
                        marginTop: '4%',
                        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                    }}
                    item
                    lg = {6}
                    md = {6}
                    sm = {6}
                    xs = {6}
                >
                    <div>
                        <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
                            Type: {obj.type}
                        </Typography>
                        <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
                            <Link
                                overlay
                                underline="none"
                                key={obj.id}
                                onClick={() => {setId(obj.id)}}
                                sx={{ color: 'text.tertiary' }}
                            >
                            Status: {obj.status}
                            </Link>
                        </Typography>
                        <Typography>Click me for more detials</Typography>
                    </div>
                </Card>
                <Dialog
                    anchorOrigin={{horizontal:"center", vertical:"center"}} 
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    aria-labelledby="modal-title" 
                    aria-describedby="modal-description"
                    open={id === obj.id}>
                    <DialogTitle>Details for {obj.type} ({obj.status}) </DialogTitle>
                    <DialogContent id="modal-description">
                        <Typography sx={{ p: 1 }}>{obj.last_update}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel}>Close</Button>
                    </DialogActions>
                </Dialog> 
                </>
            )})) :
            <Box style={{width:'100%', position: 'relative', alignContent: 'center',transform: 'translate(0, 50%)'}}>
                    {<CircularProgress></CircularProgress>}    
            </Box>
        }
    </>
    );
}

export default Item;