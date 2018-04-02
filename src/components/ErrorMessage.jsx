import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ errorsList, removeError }) => (
  <div className="error">
    <p className="error__list">
      {errorsList.map(err => (
        <li className="error__item" key={err}>
          {err}
        </li>
      ))}
    </p>

    <button type="button" onClick={removeError} className="error__button" />
  </div>
);

ErrorMessage.propTypes = {
  errorsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeError: PropTypes.func.isRequired,
};

export default ErrorMessage;
