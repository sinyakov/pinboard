import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  title, description, number, city, file, removeItem,
}) => (
  <div className="card">
    <div className="card__inner">
      <h2 className="card__title">{title}</h2>
      {description && <p className="card__description">{description}</p>}
      <p className="card__info">
        {number} | {city}
      </p>

      <button type="button" onClick={removeItem} className="card__button">
        Удалить объявление
      </button>
    </div>
    <div className="card__image-wrapper">
      {file ? (
        <img src={file} alt={title} className="card__image" />
      ) : (
        <img src="../img/no-photo.png" alt="Нет изображения" className="card__image" />
      )}
    </div>
  </div>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  file: PropTypes.string,
  removeItem: PropTypes.func.isRequired,
};

Card.defaultProps = {
  file: null,
};

export default Card;
