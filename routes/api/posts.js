const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


//IMPORT THE POST MODEL
const Post = require('../../models/Post');
//IMPORT THE USER MODEL
const Profile =  require('../../models/Profile');
//IMPORT THE VALIDATION FILE
const validatePostInput = require('../../validation/post');

//TEST ONLY
router.get('/test', (req, res) => {
  res.json({ msg: 'TEST WORKS'})
})

//LOCALHOST:5000/API/POSTS
//GET ALL THE POSTS
//PUBLIC ROUTE
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 }) //SORT THE DATE DECREMENTLY
    .then(post => res.json(post)) 
    .catch(err => res.status(404).json({ nopostsfound: 'No posts yet'}));
})

//LOCALHOST:5000/API/POSTS/:ID
//GET A SINGLE POST
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: 'No post found'}));
})



//LOCALHOST:5000/API/POSTS
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { isValid, errors } = validatePostInput(req.body);

  //CHECK VALIDATION
  if(!isValid){
    //IF THERE IS AN ERROR, SEND A 400 ERRORS OBJECT
    return res.status(400).json(errors);
  }

  //CREATE A NEWPOST INSTANCE
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  })
  
  //SAVE THE NEWLY CREATED POST
  newPost.save().then(post => res.json(post));
})


//LOCALHOST:5000/API/POSTS/:ID
//DELETE A POST
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  //FIND A PROFILE FOR THE POST TO BE FOUND FILTER DAPAT BY ID
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      //FIND POST BY ID => CALLBACKq` SYA NI PROFILE FINDONE
      Post.findById(req.params.id) 
        .then(post => { 
          //AFTER MAHANAP NI POST
          //CHECK IF THE USER IS THE OWNER OF THE POST
          if(post.user.toString() !== req.user.id ) {
            //KAPAG HINDI NAG EQUAL => POST !== USER.ID => ERROR
            return res.status(401).json({ notauthorized: 'Unauthorized'})
          }
          //ELSE DELETE THE POST
          post.remove().then(post => res.json({ success: true}))
        })
        //CATCH AN ERROR IF SOMETHING HAPPENED
        .catch(err => res.status(404).json({ postnotfound: 'Post not found'}));
    })
})


//LOCALHOST:5000/API/POSTS/LIKE/:ID
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  //FIND A PROFILE FOR THE POST TO BE FOUND AND FILTERED BY ID
  Profile.findOne({ user: req.params.id })
    .then(profile => {
      //AFTER MAHANAP NI PROFILE HANAPIN SI POST I CALLBACK SI POST
      Post.findById(req.params.id)
        .then(post => {
          //CHECK IF NA LIKE NA NI USER YUNG POST, PARA MA ADD SA ARRAY IF HINDI POP AN ERROR
          if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadyliked: 'You already liked this post'})
          }
          //ADD THE USER TO THE LIKES ARRAY
          post.likes.unshift({ user: req.user.id })
          //SAVE THE POST AND RESPOND
          post.save().then(post => res.json(post))
        })
        .catch(err => res.status(400).json({ postnotfound: 'Post not found' }));
    })
})

//LOCALHOST:5000/API/POSTS/UNLIKE/:ID
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  //FIND A PROFILE FOR THE POST TO BE FOUND AND FILTERED BY ID
  Profile.findOne({ user: req.params.id })
    .then(profile => {
      //AFTER MAHANAP NO PROFILE SI PROFILE I CALLBACK NYA SI POST
        Post.findById(req.params.id)
          .then(post => {
            //CHECK DAPAT NA LIKE NA NI USER YUNG POST PARA MA UNLIKE SO IF THE ID !== LIKES ARRAY
            if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
              return res.status(400).json({ notliked: 'You did not liked this post'})
            }
            //GET THE REMOVE INDEX IF NA LIKE NA NI USER
            const removeIndex = post.likes.map(item => item.user.toString).indexOf(req.user.id);
            //SPLICE OUT OF THE ARRAy
            post.likes.splice(removeIndex, 1);
            //SAVE THE POST AND RESPOND
            post.save().then(post => res.json(post));
          })
    })
})

//LOCALHOST:5000/API/POSTS/COMMENT/:ID
//POST 
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { isValid, errors } = validatePostInput(req.body);

  //CHECK VALIDATION
  if(!isValid){
    //IF THERE IS AN ERROR, SEND A 400 ERRORS OBJECT
    return res.status(400).json(errors);
  }
  
  //FIND A POST BY ID
  Post.findById(req.params.id)
    .then(post => {

      //CREATE A NEW COMMMENT INSTANCE
       const newComment = {
         text: req.body.text,
         name: req.body.name,
         avatar: req.body.avatar,
         user: req.user.id
       }
       //PUSH COMMENTS INTO THE ARRAY UNSHIFT SO IT SHOULD GO TO THE TOP
       post.comments.unshift(newComment);
       //SAVE 
       post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ nopostfound: 'No post found'}));
})


//LOCALHOST:5000/API/POSTS/COMMENT/:ID
//DELETE
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false}), (req, res) => {
  //FIND A POST BY THE LOGGED IN ID
  Post.findById(req.params.id)
    .then(post => {
      //CHECK NYA IF SI POST AY NAG EEXIST IF HINDI ERROR
      if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0 ) {
        return res.status(404).json({ commentnotfound: 'Comment not found'})
      }
      //CREATE A NEW REMOVE INSTANCE
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id)
      //SPLICE OUT OF THE ARRAY
      post.comments.splice(removeIndex, 1)
      //SAVE
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ nopostfound: 'No post found'}))
})

module.exports = router;
