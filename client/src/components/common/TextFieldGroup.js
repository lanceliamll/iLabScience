import React from 'react'
import PropTypes from 'prop-types';

 const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled
 }) => {
  return (
    <div className="form__group">
      <input type={type} 
        className="form__input"
        placeholder = {placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled= {disabled}
      />
       {info && <small className="form-text text-muted">{info}</small>}
    { error && (<label htmlFor ="email" className = "form__label">{error}</label>)}
    </div>
  )
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup;

