import React from 'react';
import PropTypes from 'prop-types';
import './Searchbar.css';

const Searchbar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.searchInput.value;
    onSearch(query);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
        <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXFtlXv5usL1KUxKvke1InChTTjcZxFxnLJapzA9GYYAuCQTUfwHcAkIbMSz2qs3nV4AM&usqp=CAU" 
              alt=""
            />
          <span className="SearchForm-button-label">Search</span>
        </button>
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          name="searchInput"
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Searchbar;
