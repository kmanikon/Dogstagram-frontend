import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

//import * as mobilenet from "@tensorflow-models/mobilenet";






// this is the main posts page

const Home = () => {

    // userID
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();


    const [breed, setBreed] = useState(null);

    //model.then(console.log('heyo'))

    //if (model != null){
    //    console.log('heyo')
    //}


    // get posts whenever there is a new user
    useEffect(() => {
        //loadModel(setModel);
        dispatch(getPosts());
        //console.log(breed)
    }, [currentId, dispatch]);


    return (
        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} breed={breed}/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId} setBreed={setBreed} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
  )
}

export default Home