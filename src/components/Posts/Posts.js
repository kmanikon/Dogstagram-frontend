import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

// grid for holding post components

const Posts = ({ setCurrentId, breed }) => {

  // access redux store
  //const posts = useSelector((state) => state.posts);
  const posts = useSelector(state => {
    
    if (breed == null){
      return state.posts
    }
    // a found, b not found
    state.posts.sort(function(a,b) {
      //let tagsa = a.tags
      //console.log(tagsa)
      //let tagsb = b.tags

      let founda = a.tags.some(r=> breed.includes(r))
      let foundb = b.tags.some(r=> breed.includes(r))

      if (founda == true && foundb == false){
        return -1
      }

      return 0
    })

    return state.posts
    /*
    return state.posts.filter((post) => {

      
      if (breed == null){
        return post
      }
      else {
        let found = post.tags.some(r=> breed.includes(r))
        if (found){
          return post
        }
      }

    }) 
    */

      
  
  });

  const classes = useStyles();

  // if (!length), circularprogress (loading)
  // else grid with posts
  
  //console.log('kek')
  //console.log(breed)

  return (
    posts.length === null ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;