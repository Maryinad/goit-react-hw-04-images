import PropTypes from 'prop-types';

import { Component } from 'react';
import { Header, Form, Btn, BtnLabel, Input } from './Searchbar.styled';

import { BsSearch } from 'react-icons/bs';
export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInput = event => {
    this.setState({ query: event.target.value });
    // console.log(event.target.value);
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.props.handleSubmit(this.state.query.trim().toLowerCase());
    this.setState({ query: '' });
  };

  render() {
    return (
      <>
        <Header>
          <Form onSubmit={this.handleFormSubmit}>
            <Btn type="submit">
              <BtnLabel>Search</BtnLabel>
              <BsSearch size="20px" fill="black" />
            </Btn>

            <Input
              name="query"
              value={this.state.query}
              type="text"
              autocomplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleInput}
            />
          </Form>
        </Header>
      </>
    );
  }
}

Searchbar.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};
