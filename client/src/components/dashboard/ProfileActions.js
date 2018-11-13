import React from 'react'
import { Link } from 'react-router-dom';

const ProfileActions = () => {
  return (
    <div>
      <div style = {{ marginTop: '60px' }}>
       <Link to = "/edit-profile" className = "btn btn-white"> Edit Profile </Link>
       <Link to = "/add-invention" className = "btn btn-white"> Add Inventions </Link>
       <Link to = "/add-education" className = "btn btn-white"> Add Education </Link>
      </div>
    </div>
  )
}

export default ProfileActions;