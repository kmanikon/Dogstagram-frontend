import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';


// model
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from '@tensorflow/tfjs';


//import * as tf from '@tensorflow/tfjs-core';
//import * as tflite from '@tensorflow/tfjs-tflite';

//simport * as tflite from '@tensorflow/tfjs-tflite';

//import dogimg from '../../images/dog.jpg';


// this form handles post creation and updates


async function usModel(model, img, setResults){

  //const c = await tflite.loadTFLiteModel('../../../model.tflite');

  const c = await model.classify(img)//imageRef.current)
  //const c = await model.predict(img);
  //console.log(c)
  setResults(c)
  
  //return c
}


const Form = ({ currentId, setCurrentId, setBreed }) => {

  const imageRef = useRef();

  // tracking load model
  //const [model, setModel] = useState(null);


  const [results, setResults] = useState(['other']);
  const [model, setModel] = useState(null);


  //const canvas = document.createElement('canvas');

  //const imgRef = useRef();



  const loadModel = async () => {



    //await tf.ready()
    //const model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json')
    

    //const mobilenet = require('@tensorflow-models/mobilenet');


    const model = await mobilenet.load();

    //const model = await tflite.loadModel('../../../model.tflite');

    setModel(model);
    //console.log(model)
    if (model != null){
        console.log('loaded')
    }
    else {
        console.log('not loaded')
    }
  };

  useEffect(() => {
    loadModel();
    
  }, [])




  const identify = async () => {

    // base64 string
    //const imgstr = postData.selectedFile.split(',')[1]

    

    if (model != null){
      console.log('good model')


      var img = document.createElement('img');
      img.src = postData.selectedFile;
      img.ref = imageRef;

      img.onload = () => {
        usModel(model, img, setResults);
        
      }
      
    }
    else if (model == null){
      console.log('bad model')
    }
  };



  

  // state for post data
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  
  // whether user has selected a post
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  
  const classes = useStyles();
  
  // keep user id
  const user = JSON.parse(localStorage.getItem('profile'));

  const dispatch = useDispatch();
  



  useEffect(() => {
    identify();
    //console.log("Results: " + results)
  }, [postData.selectedFile, model])



  
  // if user selects a new post, show it in form
  useEffect(() => {
    if(post) setPostData(post);
  }, [post])

  // clear form data
  const clear = () => {
    setCurrentId(0); // might change back to null
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  }
 
  // send form data to actions
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) { // create

      setBreed([]);
      const r = results[0]['className'].split(',')

      setBreed(r);
      postData.tags = r


 
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else { // update
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));

      //const r = results[0]['className'].split(',')
      //setBreed(r)
      setBreed(postData.tags)
      clear();
    }
  };


  // form if user is not logged in
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own posts and like other's posts.
        </Typography>
      </Paper>
    );
  }


  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
      <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Post</Typography>
      
      <TextField 
        name="title" 
        variant="outlined" 
        label="Title" 
        fullWidth 
        value={postData.title}
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
      />
      <TextField 
        name="message" 
        variant="outlined" 
        label="Message" 
        fullWidth 
        value={postData.message}
        onChange={(e) => setPostData({ ...postData, message: e.target.value })}
      />


      <div className={classes.fileInput}>
        <FileBase
          type="file"
          multiple={false}
          onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}
        />
      </div>

      <Button 
        className={classes.buttonSubmit} 
        variant="contained" 
        color="primary" 
        size="large" 
        type="submit" 
        fullWidth>
          Submit
      </Button>

      <Button 
        variant="contained" 
        color="secondary" 
        size="small" 
        onClick={clear}
        fullWidth>
          Clear
      </Button>

      </form>
    </Paper>
  )
};

export default Form;