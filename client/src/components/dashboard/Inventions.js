import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { deleteInvention } from '../../actions/profileActions';
import './Inventions.scss';




class Inventions extends Component {

  onDeleteClick = (id) => {
    this.props.deleteInvention(id);
  }
  render() {
    const scienceinventions = this.props.scienceinventions.map(inv => (
      <tr key ={inv._id}>
        <td>{inv.title}</td>
        <td>{inv.description}</td>
        <td>{inv.location}</td>
        <td><button onClick = {this.onDeleteClick.bind(this, inv._id)} className = "btn btn-white" >Delete</button></td>
      </tr>
    ))
    return (
      
      <div className = "table-inventions">
        <h3>Experience Credentials</h3>
        <table className = "table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Years of Experience</th>
              <th>Action</th>
            </tr>  
              {scienceinventions}
          </thead>

        </table>
      </div>
    )
  }
}

Inventions.propTypes = {
  deleteInvention: PropTypes.func.isRequired
}

export default connect(null, { deleteInvention })(withRouter(Inventions));