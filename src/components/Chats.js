import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Chat from './Chat';
import { db, auth } from '../firebase';
import { selectUser } from '../features/appSlice';
import { useSelector, useDispatch } from 'react-redux';
import  RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useHistory } from 'react-router-dom';
import { resetCameraImage } from '../features/cameraSlice';

function Chats() {

    const [ posts, setPosts ] = useState();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
       db.collection('posts')
          .orderBy('timestamp', 'desc')
          .onSnapshot(snapshot => {
              setPosts(snapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data(),
              }))
            )
          })
    }, [])


    const takeSnap = () => {
        dispatch(resetCameraImage());
       history.push('/');

    }

    return (
        <Div>
            <div className="chats_header">
                <Avatar src={user.profilePic} onClick={() => auth.signOut()} className="chats_avatar"/>
                <div className="chats_search">
                    <SearchIcon className="chats_searchIcon"/>
                    <input placeholder="Friends" type="text"/>
                </div>
                <ChatBubbleIcon className="chats_chatIcon"/>
            </div>

            <div className="chats_posts">
                {posts?.map(
                    ({ 
                        id, 
                        data: { profilePic, username, timestamp, imageUrl, read },
                    }) => (
                    <Chat 
                       key={id}
                       id={id}
                       profilePic={profilePic}
                       username={username} 
                       timestamp={timestamp} 
                       imageUrl={imageUrl} 
                       read={read} 
                    />
                )
                )}
            </div>

            <RadioButtonUncheckedIcon 
               className="chat_takePicIcon"
               onClick={takeSnap}
               fontSize='large'
            />
            
        </Div> 
    )
}

export default Chats;

const Div = styled.div`
  position: relative;
  height: 400px;
  width: 250px;

  .chats_header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 10px;
      padding-right: 10px;
      height: 50px;
      background-color: #059ee0;
  }

  .chats_search{
      display: flex;
      align-items: center;
      flex: 1;
      padding-left: 8px;
  }

  .chats_search > input {
      outline: none;
      background-color: transparent;
      border: none;
      font-size: 12px;
      flex: 1;
      color: white;
  }

  .chats_avatar{
      height: 25px !important;
      width: 25px !important;
  }

  .chats_search > input::placeholder {
      color: white;
      opacity: 1;
  }

  .chats_posts{
      box-shadow: 1px -7px 7px -6px rgba(0,0,0,0.44);
      margin-top: -9px;
      height: 359px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background-color: white;
      overflow: scroll;
  }

  .chats_posts::-webkit-scrollbar{
      display: none;
  }

  .chat_takePicIcon {
      position: absolute;
      background-color: white;
      border-radius:2;
      color: gray;
      font-size: 40px !important;
      cursor: pointer;
      bottom: 0;
      left: 50%;
      transform: translate(-50%,-50%);
      :hover{
          opacity: 0.8;
      }
  }

  .chats_searchIcon{
      color: white;
      font-size: 13 !important;
  }
`