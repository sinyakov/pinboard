import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileUpload from './FileUpload';

const RUSSIAN_PHONE_NUMBER = /^((\+7|7|8)+([0-9]){10})$/;

export default class Form extends Component {
  static propTypes = {
    addNewItem: PropTypes.func.isRequired,
    handleFormError: PropTypes.func.isRequired,
    removeError: PropTypes.func.isRequired,
    cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  state = {
    title: '',
    description: '',
    number: '',
    city: this.props.cities[0],
    files: [],
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { handleFormError, removeError } = this.props;
    const errors = this.validate();

    if (errors.length > 0) {
      handleFormError(errors);
    } else {
      this.sendData();
      this.clearInputs();
      removeError();
    }
  };

  sendData = () => {
    const { addNewItem } = this.props;
    const {
      title, description, number, city, files,
    } = this.state;

    const reader = new FileReader();

    const data = {
      title,
      description,
      city,
      number,
    };

    if (files[0]) {
      reader.readAsDataURL(files[0]);
      reader.onload = (readerEvent) => {
        const file = readerEvent.target.result;

        addNewItem({ ...data, file });
      };
    } else {
      addNewItem({ ...data });
    }
  };

  clearInputs = () => {
    this.setState({
      title: '',
      description: '',
      number: '',
      files: [],
    });
  };

  validate = () => {
    const errors = [];
    const { title, description, number } = this.state;

    if (title.length === 0 || title.length > 100) {
      errors.push('Название обязательно и не длиннее 100 символов');
    }

    if (description.length > 300) {
      errors.push('Описание не длиннее 300 символов');
    }

    if (!number.toString().match(RUSSIAN_PHONE_NUMBER)) {
      errors.push('Номер обязателен и должен быть записан в формате РФ');
    }

    return errors;
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFileChange = (files) => {
    this.setState({
      files,
    });
  };

  render() {
    const {
      description, number, title, city, files,
    } = this.state;
    const { cities } = this.props;
    return (
      <form onSubmit={this.onSubmit} className="form">
        <FileUpload handleFileChange={this.handleFileChange} files={files} />
        <div className="form__inner">
          <input
            name="title"
            value={title}
            onChange={this.handleInputChange}
            type="text"
            className="form__title"
            placeholder="Название: до 100 знаков"
          />
          <textarea
            name="description"
            value={description}
            onChange={this.handleInputChange}
            rows="5"
            className="form__description"
            placeholder="Описание: до 300 знаков (необязательно)"
          />
          <input
            name="number"
            value={number}
            onChange={this.handleInputChange}
            type="text"
            className="form__number"
            placeholder="Телефон (РФ)"
          />
          <select name="city" onChange={this.handleInputChange} value={city} className="form__city">
            {cities.map(cityName => <option key={cityName}>{cityName}</option>)}
          </select>
          <button type="submit" className="form__button">
            Отправить
          </button>
        </div>
      </form>
    );
  }
}
