import React, { useCallback, useEffect } from "react";
import AsyncSelect from "react-select/async";
import { axiosInstance } from "../../store/server";
import PropTypes from "prop-types";

function AsyncDropdown(props) {
  const {
    elementKey,
    remotePath,
    optionLabel,
    axiosConfig = {},
    isSearchEnabled,
    setSelectedOption,
    selectedOption,
    placeholder,
    handleBlur,
    isDisabled = false,
    query = {}
  } = props;

  const onBlur = (e) => {
    if (handleBlur) {
      handleBlur(e);
    }
  };

  const handleChange = (value, e) => {
    setSelectedOption(value, e);
  };

  const loadOptions = async (s = "") => {
    const response = await axiosInstance.get(remotePath, {
      params: {
        searchText: s.trim(),
        ...query
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
    return searchText;
  };
  return (
    <AsyncSelect
      key={elementKey || remotePath}
      isDisabled={isDisabled}
      getOptionLabel={(option) => option[optionLabel]}
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions
      onInputChange={handleInputChange}
      onChange={handleChange}
      isSearchable={isSearchEnabled}
      isClearable={true}
      defaultValue={selectedOption}
      getOptionValue={(option) => option[optionLabel]}
      value={selectedOption}
      placeholder={placeholder}
      onBlur={onBlur}
    />
  );
}

export default AsyncDropdown;

AsyncDropdown.propTypes = {
  remotePath: PropTypes.string,
  optionLabel: PropTypes.string,
  axiosConfig: PropTypes.object,
  isSearchEnabled: PropTypes.bool,
  setSelectedOption: PropTypes.func,
  selectedOption: PropTypes.any,
  placeholder: PropTypes.string,
  handleBlur: PropTypes.func,
  isDisabled: PropTypes.bool,
  query: PropTypes.object
};
