import React from 'react';
import {useState} from 'react'
import {auth} from '../firebase.js'

//Context to store logged in user information
const AuthContext = React.createContext({
    token : '',
    isLoggedIn: false,
    login: (token) => {

    },
    logout: () => {

    },
    uid: ''
});

//component to store all login, logout and user log in states
export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token') //unique login in token
    const [token, setToken] = useState(initialToken);
    const [uid, setUid] = useState(null) //uniqe user id for logging in 
    const userIsLoggedIn = !!token; //record user login if token is now genrated
     
    //To log user in 
    const loginHandler = (token, remainingTime, id) => {
        setToken(token);
        setUid(id)
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('uid', id);
        // setTimeout(logoutHandler, remainingTime);
    };

    //Log out a user 
    const logoutHandler = () => {
        setToken(null);
        setUid(null);
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('uid');
        auth.signOut();
    }

    //Use this to allow user to navigate after login
    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        uid: uid
    };
    
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;