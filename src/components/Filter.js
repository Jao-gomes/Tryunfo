import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
  render() {
    const {
      searchName,
      handleSearch,
      searchInputDisabled,
    } = this.props;
    return (
      <div>
        <label htmlFor="searchName">
          Nome:
          <input
            name="searchName"
            type="text"
            data-testid="name-filter"
            placeholder="Search"
            value={ searchName }
            onChange={ handleSearch }
            disabled={ searchInputDisabled }
          />
        </label>

        <label htmlFor="searchRare">
          Raridade:
          <select
            name="searchRare"
            data-testid="rare-filter"
            onChange={ handleSearch }
            disabled={ searchInputDisabled }
          >
            <option value="">todas</option>
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>

        <label htmlFor="trunfo">
          Super trunfo:
          <input
            type="checkbox"
            data-testid="trunfo-filter"
            name="searchInputDisabled"
            onChange={ handleSearch }
          />
        </label>
      </div>
    );
  }
}

Filter.propTypes = {
  handleSearch: PropTypes.func,
  searchName: PropTypes.string,
  searchInputDisabled: PropTypes.bool,
}.isRequired;

export default Filter;
