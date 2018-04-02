import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ onChangeFilter, cities }) => (
  <form onChange={onChangeFilter} className="filter">
    {cities.map(city => (
      <label key={city} className="filter__item" htmlFor={city}>
        <input type="checkbox" name={city} id={city} className="filter__checkbox" />
        <span className="filter__text">{city}</span>
      </label>
    ))}
  </form>
);

Filter.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
