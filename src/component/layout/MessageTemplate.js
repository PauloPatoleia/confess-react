import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const MessageTemplate = ({
  label,
  name,
  value,
  placeholder,
  type,
  onChange,
  error,
}) => {
  return (
  <div className="form-group">
      {/* <label htmlFor={name}>{label}</label> */}
      <input type={type} name={name} className={classnames('submit-button border-bottom border-color background-color form-control form-control-lg',{'is-invalid': error})} placeholder={placeholder} value={value} onChange={onChange}/>
      {error && <div className="invalid-feedback ml-2">{error}</div>}
  </div>
  )
}

MessageTemplate.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
}

MessageTemplate.defaultProps = {
  type: 'text',
}

export default MessageTemplate;