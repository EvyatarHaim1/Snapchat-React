import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Chat from './Chat';
import { db } from '../firebase';

function Chats() {

    const [ posts, setPosts ] = useState();

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

    return (
        <Div>
            <div className="chats_header">
                <Avatar className="chats_avatar"/>
                <div className="chats_search">
                    <SearchIcon />
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
`