import React, { useState, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';

const Search = ({ handleSearch, isDark }, ref) => {
  const [name, setName] = useState('');

  const handleInputChange = ({ target }) => setName(target.value);

  const handleSubmit = e => {
    e.preventDefault();
    handleSearch(name);
  };

  useImperativeHandle(ref, () => ({ name, setName }));

  return (
    <Form onSubmit={handleSubmit} isDark={isDark}>
      <Country>KR</Country>
      <Input
        id="search-id"
        type="text"
        placeholder="소환사명"
        onChange={handleInputChange}
        value={name}
        ref={ref}
      />
      <SearchButton>
        <BsSearch color="#ed6767" size="16" />
      </SearchButton>
    </Form>
  );
};

export default forwardRef(Search);

const Form = styled.form`
  background-color: ${({ isDark }) => (isDark ? '#eaeaea' : '#eee9e4')};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: fit-content;
  margin: 0 auto;
`;

const Input = styled.input`
  height: 100%;
  font-size: 1.1rem;
  padding-left: 5px;
  background-color: transparent;
  outline: none;
  border: none;
  &:-webkit-autofill,
  &:-webkit-autofill,
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #eaeaea inset !important;
    -webkit-text-fill-color: black !important;
  }
`;

const Country = styled.div`
  color: #ed6767;
  height: 100%;
  display: flex;
  align-items: center;
  width: 2.5rem;
  display: flex;
  justify-content: center;
  background: transparent;
  font-size: 0.8rem;
`;

const SearchButton = styled.button`
  height: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  width: 2rem;
  cursor: pointer;
  margin-right: 5px;
`;
