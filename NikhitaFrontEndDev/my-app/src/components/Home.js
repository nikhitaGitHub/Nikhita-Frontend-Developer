import {useContext, useEffect, useState} from 'react';
import AuthContext from '../store/auth-context';
import * as React from 'react';
import Box from '@mui/material/Box';
import SearchBar from './SearchBar';
import Banner from './Banner';
import { Grid } from '@mui/material';
import Item from './Item';
import AuthPage from './AuthPage';
import Stack from '@mui/material/Stack';
import { Button, Dialog, DialogContent, DialogTitle} from '@mui/material';
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home = () => {
    const dispatch = useDispatch();
    const filteredData = useSelector(state => state?.data)
    const authCtx = useContext(AuthContext);
    const [page, setPage] = useState(1);
    const [show, setShow] = useState(true);
    const auth = getAuth();

    const fetchData = async() => {
        const params = {query: { },  options:{"pagination":true, "offset":(page-1)*10,"limit":10}}
        const response = await fetch('https://api.spacexdata.com/v4/capsules?'+ new URLSearchParams(params.options),
         {'Accept': 'application/json', 'Content-type': 'application/json', credentials: "same-origin"})
        const result = await response.json()
        dispatch({type: 'FETCH_SUCCESS', data: {result}})
    }

    const logOut = () => {
        signOut(auth).then(() => {
            authCtx.logout();
        }).catch((error) => {console.log(error)});
    };

    useEffect(() => {
        dispatch({type: 'FETCH_INIT', data:[]})
        let token = window.localStorage.getItem('token');
        if(!!token) {
            fetchData();
            setShow(false)
        }
        else {
            setShow(true)
        }
    }, [authCtx.token])
  
    return (
        <>
        {authCtx.isLoggedIn ? ( 
        <Box
         style={{width:'80%', left: '10%', position: 'absolute', alignContent: 'center',transform: 'translate(0, 0%)', margin: '0 0 0 -50'}}>
            <Button style={{ margin:'auto', padding:'2%'}} size='large' textSizeLarge fullWidth onClick={logOut}>Log Out</Button>
            <Banner></Banner>
            <Box sx={{width:'100%', marginTop:'3%' }}>
                <SearchBar res={filteredData}/>
            </Box>
            <div>
                <Grid style={{'justifyContent': 'space-between', display:'flex', 'flex-direction':'row', flexWrap:'wrap'}}>
                    <Item pageNumber={page} filteredData={filteredData}></Item>
                </Grid>
                <Stack spacing={2} style={{alignContent: 'center',transform: 'translate(35%, 90%)', margin: '0 0 0 -50', paddingBottom:'5%'}}>
                <Pagination 
                    count={Math.floor(filteredData?.length || 20/10) + 1}
                    onChange={((e, v) => {
                        setPage(v)
                    })}
                    renderItem={(item) => (
                    <PaginationItem
                        slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                        {...item}/>)}
                />
                </Stack>
            </div>
        </Box>
        )
        :
        (
            <Dialog
            style={{backgroundColor: !!authCtx.token ? '':'#6495ED'}} 
            anchorOrigin={{horizontal:"center", vertical:"center"}} 
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            aria-labelledby="modal-title" 
            aria-describedby="modal-description"
            open={show}>
                <DialogTitle style={{textAlign:'center'}}>Enter credentials and hit sign up or login</DialogTitle>
                <DialogContent id="modal-description">
                    <AuthPage></AuthPage>
                </DialogContent>
            </Dialog>
        )}
        </>
  );
} 
export default Home;