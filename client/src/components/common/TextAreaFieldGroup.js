import React from 'react'
import PropTypes from 'prop-types';

 const TextAreaFieldGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    onChange,
    type

 }) => {
  return (
    <div className="form__group">
      <textarea type={type} 
        className="form__input"
        placeholder = {placeholder}
        name={name}
        value={value}
        onChange={onChange}

      />
    { error && (<label htmlFor ="email" className = "form__label">{error}</label>)}
    </div>
  )
}

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,

}


export default TextAreaFieldGroup;

