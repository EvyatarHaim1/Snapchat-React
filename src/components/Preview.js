import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { resetCameraImage, selectCameraImage } from '../features/cameraSlice';
import CloseIcon from '@material-ui/icons/Close';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import { v4 as uuid } from 'uuid';
import { storage, db } from '../firebase';
import firebase from 'firebase';

function Preview() {

    const cameraImage = useSelector(selectCameraImage)
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
      if(!cameraImage){
       history.replace('/');
      }
    },[cameraImage, history])

    const closePreview = () => {
       dispatch(resetCameraImage());
    }

    const sendPost = () => {
       const id = uuid();
       const uploadTask = storage
         .ref(`posts/${id}`)
         .putString(cameraImage, 'data_url');

      uploadTask.on(
          'state_changed',
           null,
          (error) => {
              // error function
          console.log(error);
          },
          () => {
              // complete upload the image the firebase storage
              storage
              .ref('posts')
              .child(id)
              .getDownloadURL()
              .then((url) => {
                  db.collection('posts').add({
                      imageUrl: url,
                      username: 'Evyatar Haim',
                      read: false,
                      //profilePic
                      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  });
                  history.replace('/chats');
              });
          }
       );
    };

    return (
        <Div>
            <CloseIcon 
                      className="preview_close"
                      onClick={closePreview}
            />
            <div className="preview_toolbarRight">
                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>
            <img src={cameraImage} alt="" />
            <div className="preview_footer"
                 onClick={sendPost}>
                <h2>Send Now</h2>
                <SendIcon className="preview_sendIcon"/>
            </div>
        </Div>
    )
}

export default Preview

const Div = styled.div`
   position: relative;

   .preview_close{
       position: absolute;
       top: 0;
       margin: 5px;
       color: white;
       cursor:pointer
   }

   .preview_toolbarRight{
       color: white;
       position: absolute;
       right: 0;
       display: flex;
       flex-direction: column;
   }

   .preview_toolbarRight > .MuiSvgIcon-root {
       font-size: 20px !important;
       margin-bottom: 8px;
       cursor: pointer;
   }

   .preview_footer{
       position: absolute;
       bottom: 0;
       right: -25px;
       transform: translate(-50%,-50%);
       background-color: yellow;
       color: black;
       display: flex;
       justify-content: space-evenly;
       align-items: center;
       border-radius: 30px;
       padding: 7px;
       cursor: pointer;
   }

   .preview_footer > h2 {
       font-size: 8px;
       margin-right: 3px;
   }

   .preview_sendIcon{
       font-size: 10px !important;
   }
`