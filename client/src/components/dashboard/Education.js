import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteEducation } from '../../actions/profileActions';
import './Education.scss';

class Education extends Component {

  onClickDelete = id => {
    this.props.deleteEducation(id);
  }

  render() {
    const education = this.props.education.map(edu => (
      <tr key = { edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>{edu.fieldofstudy}</td>
        <td>{edu.from}</td>
        <td>{edu.to}</td>
        <td>{edu.description}</td>
        <td><button className = "btn btn-white" onClick = {this.onClickDelete.bind(this)}>Delete</button></td>
      </tr>
    ))
    return (
      <div className = "table-education-margin">
        <h3>Education</h3>
        <table className = "table-education">
          <thead>
            <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Field of Study</th>
            <th>From</th>
            <th>To</th>
            <th>Description</th>
            <th>Action</th>
            </tr>
            {education}
          </thead>
        </table>
      </div>
    )
  }
}



export default connect(null, { deleteEducation })(Education);
