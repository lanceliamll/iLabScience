const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//KEY FILE CONFIG

//IMPORT PROFILE MODEL
const Profile = require('../../models/Profile');

//IMPORT USER MODEL
const User = require('../../models/User');

//IMPORT VALIDATIONS
const validateProfileInput = require('../../validation/profile');


//TEST ONLY
// router.get('/test', (req, res) => {
//   res.json({ msg: 'TEST WORKS'})
// })

///////////////////////////////////////////////////////////////////
//GET REQUESTS

//LOCALHOST:5000/API/PROFILE
//PRIVATE ROUTE
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  //ERROR HANDLING
  const errors = {};

  //KINUKUHA OR NILOLOCATE NYA SA USER COLLECTION
  Profile.findOne({ user: req.user.id})
    //POPULATE MEANS ILALAGAY TONG ARRAY NA TO DUON SA USER ID
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofie = 'There is no profile for this user';
        return res.status(404).json(errors)
      }
        //RETURN A JSON RESPONSE
        res.json(profile)
    })
    .catch(err => console.log(errors.profile))
})

//LOCALHOST:5000/API/PROFILE/HANDLE/:HANDLE
//GET REQUEST
//PUBLIC ROUTE
//SO EVERYONE CAN VIEW THE PROFILE OF THE USER
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  //FIND THE PROFILE IF IT EXISTS THEN IF NOT PASS AN ERROR
  //SHOULD BE FIND BY THE HANDLE PARA MABILIS MA SEARCH
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        //IF HINDI NAG EEXIST
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      //ELSE I SEND YUNG PROFILE VIA JSON RESPONSE
        res.json(profile)
    })
    .catch(error => res.status(404).json({profile: 'There is no profile for this user'}));
})

//LOCALHOST:5000/API/PROFILE/user/:USER_ID
//GET REQUEST
//PUBLIC ROUTE
//SO EVERYONE CAN VIEW THE PROFILE OF THE USER
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  //FIND THE PROFILE IF IT EXISTS THEN IF NOT PASS AN ERROR
  //SHOULD BE FIND BY THE HANDLE PARA MABILIS MA SEARCH
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        //IF HINDI NAG EEXIST
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      //ELSE I SEND YUNG PROFILE VIA JSON RESPONSE
        res.json(profile)
    })
    .catch(error => res.status(404).json({profile: 'There is no profile for this user'}));
})

//LOCALHOST:5000/API/PROFILE/ALL
//GET ALL THE USER PROFILES
//PUBLIC

router.get('/all', (req, res) => {
  //ERRORS
  const errors = {};
  
  //FIND AND GET ALL THE PROFILE
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofie = 'There is no profiles';
        res.status(404).json(errors)
      }
      //ELSE GET ALL THE PROFILES
      res.json(profile);
    })
})




//////////////////////////////////////////////////////////////////

//POST REQUESTS

//LOCALHOST:5000/API/PROFILE
//POST ROUTE
//PRIVATE ROUTE
//CREATE OR UPDATE THE PROFILE
//CREATE IF NOT YET
//UPDATE IF ALREADY

router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
  //VALIDATION OF THE INPUTS
  const { errors, isValid } = validateProfileInput(req.body);

  //CHECK VALIDATION
  if(!isValid) {
    //RETURN VALIDATION ERROR
    return res.status(400).json(errors)
  }

  //GET THE PROFILE FIELDS
  const profileFields = {};
  profileFields.user = req.user.id;
  if(req.body.handle) profileFields.handle = req.body.handle;
  if(req.body.company) profileFields.company = req.body.company;
  if(req.body.website) profileFields.website = req.body.website;
  if(req.body.bio) profileFields.bio = req.body.bio;
  
  //FIELD OF SCIENCE FROM ARRAY TO CSV
  if(typeof req.body.fieldofscience !== 'undefined'){
    profileFields.fieldofscience = req.body.fieldofscience.split(',')
  }
  //SOCIAL FIELDS MODELS

  profileFields.social = {};
  if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
  if(req.body.facebook) profileFields.social.facebook = req.body.facebook;

  //FIND PROFILE TO A USER IF PROFILE IS EXISTED
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if(profile) {
        //IF PROFILE ALREADY EXISTED TO A USER THEN IT MUST BE AN UPDATE REQUEST
        //EDIT
        Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
          .then(profile => res.json(profile));
      } else {
        //CREATE REQUEST
        //CHECK IF THE HANDLE EXISTS OR THE NAME OF THE USERPROFILE(HANDLE) EXISTS
        Profile.findOne({ handle: profileFields.handle })
          .then(profile => {
            //SEND ERROR 
            if(profile) {
              errors.handle = 'This handle already exists';
              res.status(400).json(errors);
            }
            
          })
          //SAVE IF THE HANDLE IS UNIQUE
          new Profile(profileFields).save().then(profile => res.json(profile));
      }
    })
    .catch(err => res.status(404).json({profilenotfound: 'Profilenotfound'}));
})


//LOCALHOST:5000/API/PROFILE/INVENTIONS
//PRIVATE ROUTE
//POST
//OPTIONAL TO BE FILLED OUT

router.post('/inventions', passport.authenticate('jwt', { session: false }), (req, res) => {
  //FIND THE USER LOGGED IN
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newInventions = {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location
      }
      //ADD TO INVENTIONS ARRAY
      profile.scienceinventions.unshift(newInventions);
      //SAVE THE PUSHED REQ
      profile.save().then(profile => res.json(profile));
    })
})


//LOCALHOST:5000/API/PROFILE/EDUCATION
//ADD EDUCATION
//POST
//OPTIONAL TO BE FILLED OUT
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
  //FIND THE LOGGED IN USER BY ID
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newEducation = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        description: req.body.description
      }
      //ADD TO EDUCATIONS ARRAY
      profile.education.unshift(newEducation);
      //SAVE THE PUSHED REQ
      profile.save().then(profile => res.json(profile));
    })
})

//////////////////////////////////////////////////////////


//DELETE REQUEST

//LOCALHOST:5000/API/PROFILE/INVENTIONS/:INVENTION_ID
//PRIVATE
//DELETE THE INDEX OF THE CHOSEN INVENTION

router.delete('/inventions/:invention_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  //FIND THE USER LOGGED IN 
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      //FIND OR GET THE REMOVE INDEX ON THE INVENTIONS ARRAY
      const removeIndex = profile.scienceinventions
        .map(item => item.id)
        .indexOf(req.params.inventions_id)

        //SPLICE OUT OF THE ARRAY
        profile.scienceinventions.splice(removeIndex, 1);

        //SAVE AND PUSH
        profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
})

//LOCALHOST:5000/API/PROFILE/EDUCATION/:EDUCATION_ID
//DELETE
//PRIVATE

router.delete('/education/:education_id', passport.authenticate('jwt', { session: false}), (req, res) => {
  //FIND THE LOGGED IN USER
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      //FIND THE REMOVE INDEX IN THE EDUCATION ARRAY
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.education_id)

        //SPLICE OUT OF THE EDUCATION ARRAY
        profile.education.splice(removeIndex, 1);

        //SAVE AND PUSH
        profile.save().then(profile => res.json(profile))
    })
    .catch(err => res.status(404).json(err));
})


//LOCALHOST:5000/API/PROFILE/
//DELETE A USER AND PROFILE
//PRIVATE

router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  //FIND THE LOGGED IN USER AND REMOVE INCLUDING PROFILE
  Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
      //FIND THE USER BY THE LOGGED IN ID AND REMOVE
      User.findOneAndRemove({ _id: req.user.id })
        .then(() => res.json({ success: true }))
    })
})
module.exports = router;