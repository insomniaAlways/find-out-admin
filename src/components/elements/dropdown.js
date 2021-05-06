import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

function DropdownHelper(props) {
  const {
    isSearchEnabled,
    setSelectedOption,
    selectedOption,
    listSource,
    // enableMultipleSelect,
    // allowAdditions,
    // createOption,
    placeholder,
    handleBlur,
    isDisabled,
    optionLabel
  } = props;

  // const handleAddition = (e, data) => {
  //   const { value } = data;
  //   createOption(value);
  // };

  const onBlur = (e) => {
    if (handleBlur) {
      handleBlur(e);
    }
  };

  const handleChange = (value, e) => {
    setSelectedOption(value, e);
  };

  return (
    <Select
      isDisabled={isDisabled}
      isSearchable={isSearchEnabled}
      isClearable={true}
      options={listSource}
      defaultValue={selectedOption}
      value={selectedOption}
      placeholder={placeholder}
      onBlur={onBlur}
      onChange={handleChange}
      getOptionLabel={(option) => option[optionLabel]}
    />
  );
}

export default DropdownHelper;

DropdownHelper.propTypes = {
  isSearchEnabled: PropTypes.bool,
  setSelectedOption: PropTypes.func,
  selectedOption: PropTypes.any,
  listSource: PropTypes.array,
  // enableMultipleSelect: PropTypes.bool,
  // allowAdditions: PropTypes.bool,
  // createOption: PropTypes.func,
  placeholder: PropTypes.string,
  handleBlur: PropTypes.func,
  isDisabled: PropTypes.bool
};
