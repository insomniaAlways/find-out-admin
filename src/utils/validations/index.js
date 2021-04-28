export const getString = (value = "") => {
  return (value || "").toString().trim();
};

export const requiredCheck = (values, valuePath) => {
  debugger;
  if (!getString(values[String(valuePath)])) {
    return "Required";
  }
  return null;
};
