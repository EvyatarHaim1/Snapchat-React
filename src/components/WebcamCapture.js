import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Webcam from 'react-webcam';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user", 
};


function WebcamCapture() {

    const webcamRef = useRef(null);

    const capture = useCallback(() => {
       const imageSrc = webcamRef.current.getScreenshot();
    },[webcamRef])

    return (
        <Div>
            <Webcam
                audio={false}
                height={videoConstraints.height}
                width={videoConstraints.width}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                />
            <RadioButtonUncheckedIcon 
                className="webcamCapture_btn"
                onClick={capture}
                fontSize="large"
                />
        </Div>
    )
}

export default WebcamCapture

const Div = styled.div``