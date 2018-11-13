import React from 'react'
import PropTypes from 'prop-types';

 const InputGroup = ({
    name,
    placeholder,
    value,
    error,
    onChange,
    type

 }) => {
  return (
    <div className="form__group">
      <input type={type} 
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

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,

}

InputGroup.defaultProps = {
  type: 'text'
}

export default InputGroup;

