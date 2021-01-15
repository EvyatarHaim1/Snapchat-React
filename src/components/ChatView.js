import React, { useEffect } from 'react'
import styled from 'styled-components';
import { selectSelectedImage } from '../features/appSlice';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

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
            <img src={selectedImage} onClick={exit} alt=""/>
            <div className="chatView_timer">
                <CountdownCircleTimer
                isPlaying
                duration={10}
                strokeWidth={6}
                size={50}
                colors={[
                    ["#004777", 0.33],
                    ["#F7b801", 0.33],
                    ["#a30000", 0.33],

                ]}
                >
                    {({ remainingTime }) => {

                        if(remainingTime === 0){
                            exit();
                        }
                        return remainingTime; 
                    }}
                </CountdownCircleTimer>
            </div>
        </Div>
    )
}

export default ChatView

const Div = styled.div`
   position: relative;

   img{
       cursor: pointer;
   }

   .chatView_timer {
      position: absolute;
      top: 0;
      right: 0;
      margin: 10px;
   }
`
