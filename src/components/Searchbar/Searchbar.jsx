import PropTypes from 'prop-types';

import { useState } from 'react';
import { Header, Form, Btn, BtnLabel, Input } from './Searchbar.styled';

import { BsSearch } from 'react-icons/bs';
export function Searchbar(props) {
  const [query, setQuery] = useState('');
  // state = {
  //   query: '',
  // };

  const handleInput = event => {
    setQuery(event.target.value);

    // this.setState({ query: event.target.value });
    // console.log(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    props.handleSubmit(query.trim().toLowerCase());
    setQuery('');
    // this.setState({ query: '' });
  };

  return (
    <>
      <Header>
        <Form onSubmit={handleFormSubmit}>
          <Btn type="submit">
            <BtnLabel>Search</BtnLabel>
            <BsSearch size="20px" fill="black" />
          </Btn>

          <Input
            name="query"
            value={query}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleInput}
          />
        </Form>
      </Header>
    </>
  );
}

Searchbar.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};
