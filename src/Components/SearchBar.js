import React from 'react';

class SearchBar extends React.Component {
  render () {
    return (
      <form className="search-box">
        <input type="text" name="search-bar" placeholder="Search" />
        <button type="submit" name="btn-search"><i className="fas fa-search"></i></button>
      </form>
    );
  }
}

export default SearchBar;