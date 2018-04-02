import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const List = ({ data, removeItem }) =>
  (data.length > 0 ? (
    data.map(cardInfo => (
      <Card key={cardInfo.id} {...cardInfo} removeItem={removeItem(cardInfo.id)} />
    ))
  ) : (
    <p>Нет объявлений</p>
  ));

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default List;
