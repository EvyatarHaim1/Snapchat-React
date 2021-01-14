import React, { useEffect } from 'react'
import styled from 'styled-components';
import { selectSelectedImage } from '../features/appSlice';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ChatView() {
   
    const selectedImage = useSelector(selectSelectedImage);
    const history = useHistory();

    useEffect(() => {
        if(!selectedImage){
            exit();
        }
        
    }, [selectedImage])

    const exit = () => 
    {
       history.replace('/chats')
    }

    return (
        <Div>
            <img src={selectedImage} alt="" onClick={exit}/>
        </Div>
    )
}

export default ChatView

const Div = styled.div`

`
