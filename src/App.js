import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
//import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import { Router, Routes ,Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';


import { getPosts } from './actions/posts';

import useStyles from './styles';
import memories from './images/memories.png';
import { render } from 'react-dom';

//import * as mobilenet from "@tensorflow-models/mobilenet";
//import * as tf from '@tensorflow/tfjs';



// main app

const App = () => {

    //const [model, setModel] = useState(null);

    //loadModel(setModel);


    return (
        <Container maxWidth="lg">
            <Navbar/>
            <Routes>
                <Route path="/auth" element={<Auth/>}/>
                <Route exact path="/" element={<Home/>}/>
            </Routes>
        </Container>
    )
}

export default App;