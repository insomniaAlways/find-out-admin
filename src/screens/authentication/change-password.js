import React, { useMemo } from "react";
import { useHistory } from "react-router";
import Form from "../../components/form-helpers/base";
import Input from "../../components/form-helpers/input";
import { requiredCheck } from "../../utils/validations";

function ChangePassword() {
  const { replace } = useHistory();
  const initialValues = useMemo(
    () => ({
      current_password: "",
      new_password: "",
      confirm_password: ""
    }),
    []
  );
  const save = (data) => {
    console.log(data);
    replace("/register-store");
  };
  return (
    <div className="ui container">
      <Form
        fields={fields}
        postRequest={save}
        initialValues={initialValues}
        submitButtonLabel={"Change"}
      />
    </div>
  );
}

export default ChangePassword;

const fields = [
  {
    type: "password",
    initialValue: { current_password: "" },
    valuePath: "current_password",
    label: "Current password",
    isRequired: true,
    placeholder: "Enter here",
    hasIcon: true,
    Component: Input,
    validate: (values) => requiredCheck(values, "current_password")
  },
  {
    type: "password",
    initialValue: { new_password: "" },
    valuePath: "new_password",
    label: "New password",
    isRequired: true,
    placeholder: "Enter here",
    hasIcon: true,
    Component: Input,
    validate: (values) => requiredCheck(values, "new_password")
  },
  {
    type: "password",
    initialValue: { confirm_password: "" },
    valuePath: "confirm_password",
    label: "Confirm password",
    isRequired: true,
    placeholder: "Enter here",
    hasIcon: true,
    Component: Input,
    validate: (values) => {
      let error = requiredCheck(values, "confirm_password");
      if (!error && values.confirm_password !== values.new_password) {
        error = "Passwords do not match";
      }
      return error;
    }
  }
];
