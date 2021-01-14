import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import ReactTimeAgo from 'react-timeago';
import { useDispatch } from 'react-redux';
import { selectImage } from '../features/appSlice';
import { db } from '../firebase';
import { useHistory } from 'react-router-dom';

function Chat({ id, profilePic, username, timestamp, imageUrl, read}) {

    const dispatch = useDispatch();
    const history = useHistory();

    const open = () => {
        if(!read) {
            dispatch(selectImage(imageUrl))
            db.collection('posts').doc(id).set({
                read: true,
            }, {merge: true})
        };

        history.push('/chats/view')
    }

    return (
        <Div onClick={open}>
            <Avatar clasname="chat_avatar" src={profilePic} />
            <div className="chat_info">
                <h4>{username}</h4>
                <p> Tap to view - <ReactTimeAgo date={new Date(timestamp?.toDate()).toUTCString()} /></p>
            </div>

            {!read && <StopRoundedIcon className="chat_readIcon"/>}
        </Div>
    )
}

export default Chat;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid whitesmoke;
  cursor: pointer;

.chat_avatar{
    height: 35px !important;
    width: 35px !important;
}

.chat_readIcon{
    color: red;
}

.chat_info{
    padding-left: 5px;
    flex: 1;
}

.chat_info > h4 {
    font-size: 11px;
    font-weight: 500;
}

.chat_info > p {
    font-size: 9px;
}
`