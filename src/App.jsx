import React, { Component } from 'react';
import Form from './components/Form';
import Filter from './components/Filter';
import List from './components/List';
import Header from './components/Header';
import ErrorMessage from './components/ErrorMessage';

import * as api from './api';
import cities from './data/cities';

export default class App extends Component {
  state = {
    data: [],
    checkedcities: cities.reduce((res, city) => ({ ...res, [city]: false }), {}),
    errors: null,
  };

  componentDidMount = () => {
    api.getAll().then(data => this.setState({ data }));
  };

  onChangeFilter = (event) => {
    const changedcity = event.target.name;
    this.setState(({ checkedcities }) => ({
      checkedcities: {
        ...checkedcities,
        [changedcity]: !checkedcities[changedcity],
      },
    }));
  };

  addNewItem = (item) => {
    api
      .add(item)
      .then(() => api.getAll())
      .then(data => this.setState({ data }))
      .catch((err) => {
        this.setState({ errors: [err.message] });
      });
  };

  removeItem = itemId => () => {
    api
      .remove(itemId)
      .then(() => api.getAll())
      .then(data => this.setState({ data }))
      .catch((err) => {
        this.setState({ errors: [err.message] });
      });
  };

  handleFormError = errors => this.setState({ errors });

  removeError = () => this.setState({ errors: null });

  render() {
    const { data, checkedcities, errors } = this.state;

    const nocitiesSelected = Object.values(checkedcities).every(checked => !checked);
    const filteredData = nocitiesSelected ? data : data.filter(({ city }) => checkedcities[city]);

    return (
      <main className="wrapper">
        <Header />

        <Form
          addNewItem={this.addNewItem}
          cities={cities}
          handleFormError={this.handleFormError}
          removeError={this.removeError}
        />

        {errors && <ErrorMessage errorsList={errors} removeError={this.removeError} />}

        <Filter onChangeFilter={this.onChangeFilter} cities={cities} />

        <List data={filteredData} removeItem={this.removeItem} />
      </main>
    );
  }
}
