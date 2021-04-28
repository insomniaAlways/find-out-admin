import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { axiosInstance } from "../../store/server";

function AsyncDropdown(props) {
  const { remotePath, optionLabel, axiosConfig = {} } = props;
  const [state, setState] = useState({
    selectedOption: null,
    searchText: ""
  });

  const handleChange = (selectedOption) => {
    setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  const loadOptions = async (s) => {
    const response = await axiosInstance.get(remotePath, {
      params: {
        searchText: s.trim()
      },
      ...axiosConfig
    });
    if (response.data) {
      return response.data;
    } else {
      return response;
    }
  };

  const handleInputChange = (searchText) => {
    setState((prev) => ({ ...prev, searchText }));
    return searchText;
  };

  return (
    <AsyncSelect
      value={state.selectedOption}
      getOptionLabel={(option) => option[optionLabel]}
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions
      onInputChange={handleInputChange}
      onChange={handleChange}
    />
  );
}

export default AsyncDropdown;
