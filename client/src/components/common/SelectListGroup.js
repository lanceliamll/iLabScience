import React from 'react'
import PropTypes from 'prop-types';

const SelectListGroup = ({name, value, error,onChange,options,placeholder}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value = {option.value}>
      {option.label}
    </option>
  ))

  return (
    <div className="form__group">
      <select 
        placeholder={placeholder}
        className="form__input"
        name={name}
        value={value}
        onChange={onChange}
        >
        {selectOptions}
      </select>
    { error && (<label htmlFor ="status" className = "form__label">{error}</label>)}
    </div>
  )
}

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired

}


export default SelectListGroup;

