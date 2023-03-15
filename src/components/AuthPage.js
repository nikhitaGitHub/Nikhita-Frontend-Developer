import {useRef, useState, useContext, useEffect} from 'react';
import React from 'react';
import AuthContext from '../store/auth-context';
import { useNavigate } from 'react-router-dom';
import { Button, Popover, FormControl, Box, TextField } from '@mui/material';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";

const AuthPage = () => {
    const authCtx = useContext(AuthContext);
    const [user, setUser] = useState(authCtx.isLoggedIn);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    
    provider.addScope('profile');
    provider.addScope('email');
    auth.languageCode = 'it';
    
    const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result)
        const token = result.user.accessToken;
        const user = result.user;
        setUser(user);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("ERROR #################", error)
      });
    }

    const signUpHandler = () => {
        setPersistence(auth, browserSessionPersistence)
        .then(() => {
            createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode)
            })    
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode)
        });  
    }

    const logInHandler = () => {
        setPersistence(auth, browserSessionPersistence)
        .then(() => {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode)
        }); 
    }

    useEffect(() => {
        if(user != false) {
            authCtx.isLoggedIn = true;
            authCtx.login(user.accessToken, user.stsTokenManager.expirationTime, user.uid);
        }
        else {
            if(authCtx.isLoggedIn == true) {
                authCtx.isLoggedIn = false;
                authCtx.logout();
            }
        }
    }, [user]);
  
    return (
        <>        
        <FormControl variant='outlined' fullWidth required>
            <TextField
                style={{paddingBottom:'15%'}}
                onChange={(e) => {setEmail(e.target.value)}}
                required
                id="outlined-required"
                label="Required"
                defaultValue="Email"
                variant="outlined"
            />
            <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                onChange={(e) => {setPassword(e.target.value)}}
                required
            />
        </FormControl>
        {!user && <div>
            <Button style={{margin:'auto', marginTop:'10%'}} size='large' textsizelarge fullWidth variant='contained' onClick={logInHandler}>Log In</Button>
            <hr></hr>
        </div>}
        {!user && <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop:'1%'}} >
            <Button color="primary" variant="contained" onClick={signIn} fullWidth>Sign In With Google</Button>
        </div>}
        {!user && <Button style={{margin:'auto', marginTop:'5%'}} size='large' textsizelarge fullWidth variant='outlined' color='secondary' onClick={signUpHandler}>Sign Up</Button>}
    </>
    )
} 
export default AuthPage;