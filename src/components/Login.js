import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { auth, provider } from '../firebase';
import { login } from '../features/appSlice';

function Login() {

    const dispatch = useDispatch

    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then((result) => {
            dispatch(
                login({
                username: result.user.displayName,
                profilePic: result.user.photoURL,
                id: result.user.uid,
            })
          );
        })
        .catch(error => alert(error.message));
    };

    return (
        <Div>
            <div className="login_container">
                <img src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
                    alt=""
                />
                <Button variant='outlined' 
                        onClick={signIn} >
                            Sign In 
                </Button>
            </div>
        </Div>
    )
}

export default Login;

const Div = styled.div`
   background-color: #feff00;
   display: grid;
   place-items: center;
   height: 100vh;
   width: 100%;

   .login_container {
       display: flex;
       flex-direction: column;
   }

   .login_container > img {
       height: 300px;
       object-fit: contain;
   }
`
