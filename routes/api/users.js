const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//VALIDATION FOR THE REGISTER INPUT
const validateRegisterInput = require('../../validation/register');
//VALIDATION FOR THE LOGIN INPUT
const validateLoginInput = require('../../validation/login');

//IMPORT THE CONFIG KEY FILE
const keys = require('../../config/keys');
//LOAD USER MODEL
const User = require('../../models/User');
//TEST
router.get('/', (req, res) => {
  res.json({ msg: 'TEST WORKS'})
})

//LOCALHOST:5000/API/USERS/REGISTER
//PUBLIC ROUTE
router.post('/register', (req,res) => {
  //GET THE ERRORS AND ISVALID FROM THE VALIDATE REGISTER INPUT VIA DESTRUCTURING
  const { errors, isValid } = validateRegisterInput(req.body);

  //CHECK VALIDATION IF ITS VALID
  if(!isValid){
    return res.status(400).json(errors);
  }
  //FIND ONE USER IN THE DATABASE USING USER MODEL => FILTER EACH EMAIL TO VERIFY THAT THE EMAIL EXISTS OR NOT
  User.findOne({ email: req.body.email })
    .then(user => {
      if(user){
        errors.name = "Email already exists";
        return res.status(400).json(errors)
      } else {
        //GRAVATAR SETTINGS
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm' //DEFAULT AVATAR ICON 
        })

        //CREATING NEW INSTANCE TO MAKE THE VALUES OF THE USER
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        })

        //BCRYPT PASSWORD HASH AND STORE TO THE DB
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt,(err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })
      }
    })
})

//LOCALHOST:5000/API/USERS/LOGIN
//PUBLIC
router.post('/login', (req,res) => {
  //GET THE ERRORS AND ISVALID FROM THE VALIDATE LOGIN INPUT VIA DESTRUCTURING
  const { errors, isValid } = validateLoginInput(req.body);

  //VALIDATION IF NOT VALID
  if(!isValid) {
    return res.status(400).json(errors)
  }

  //INITIALIZE THE FIELDS
  const email = req.body.email;
  const password = req.body.password;
  
  //FIND A USER TO INITIALIZE LOGIN, IF IT DOESN'T EXISTS. ERROR WILL BE CALLED
  User.findOne({email})
    .then(user => {
      //IS THE USER DOESN'T EXISTS? 
      if(!user) {
        errors.name = "User not found";
        return res.status(404).json(errors)
      }

      //CHECK FOR THE PASSWORD
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            //CREATE PAYLOAD
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            }
            //JWT SIGNING 
            jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
              res.json({ 
                success: true,
                token: 'Bearer ' + token
               })
            })
          } else {
            errors.password = "Password Incorrect"
            return res.status(400).json(errors)
          }
        })
    })
})

//LOCALHOST:5000/API/USERS/CURRENT
//PRIVATE ROUTE
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  //SEND THE PROFILE INFORMATION VIA JSON
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})

module.exports = router;