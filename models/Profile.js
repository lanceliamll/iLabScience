const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//PROFILE SCHEMA FOR EACH USER
const ProfileSchema = new Schema({
  //REFERENCE SA LAHAT NG USER(USERS COLLECTION)
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  fieldofscience: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  scienceinventions: [
    {
      title: {
        type: String
      },
      description: {
        type: String,
      },
      location: {
        type: String
      }
    }  
  ],
  education: [
    {
      school: {
        type: String
      },
      degree: {
        type: String,
      },
      fieldofstudy: {
        type: String,
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    instagram: {
      type: String
    },
    facebook: {
      type: String
    }
  },
  date: {
    type: Date,
    defaut: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);