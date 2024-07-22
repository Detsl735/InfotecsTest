import React from 'react';

const Input = ({ onSearch }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      onChange={handleSearch}
    />
  );
};

export default Input;
