import PropTypes from "prop-types";
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";

import { AsyncPaginate } from "react-select-async-paginate";
import * as searchService from "../../services/searchService";

const cx = classNames.bind(styles);

function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      const response = await searchService.search(inputValue);
      // console.log(response.data);

      if (!response || !Array.isArray(response.data)) {
        console.error("Invalid response data:", response);
        return { options: [] };
      }

      return {
        options: response.data.map((city) => ({
          label: `${city.name}, ${city.countryCode}`,
          value: `${city.latitude} ${city.longitude}`,
        })),
      };
    } catch (error) {
      console.error("Failed to load options:", error);
      return { options: [] };
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
}

Search.propTypes = {
  onSearchChange: PropTypes.func,
};

export default Search;
