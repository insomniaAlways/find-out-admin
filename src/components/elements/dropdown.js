import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

function Dropdown(props) {
  const [state, setState] = useState({
    selectedOption: null
  });
  const handleChange = (selectedOption) => {
    setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  return <Select value={state.selectedOption} onChange={handleChange} options={options} />;
}

export default Dropdown;
