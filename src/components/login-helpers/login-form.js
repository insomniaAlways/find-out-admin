import React, { useMemo } from "react";
import Form from "../form-helpers/base";
import Input from "../form-helpers/input";
import { requiredCheck } from "../../utils/validations";
import { useHistory } from "react-router";

function LoginForm() {
  const { replace } = useHistory();

  const initialValues = useMemo(
    () => ({
      email: "",
      password: ""
    }),
    []
  );

  const save = (data) => {
    console.log(data);
    // replace("/change-password");
  };
  return (
    <div className="ui segment">
      <Form
        fields={fields}
        submitButtonLabel={"Submit"}
        initialValues={initialValues}
        postRequest={save}
      />
    </div>
  );
}

export default LoginForm;

const fields = [
  {
    type: "email",
    initialValue: { email: "" },
    valuePath: "email",
    label: "email",
    isRequired: true,
    placeholder: "example@example.com",
    Component: Input,
    width: 10,
    validate: (values) => {
      let error = requiredCheck(values, "email");
      return error;
    }
  },
  {
    type: "password",
    initialValue: { password: "" },
    valuePath: "password",
    label: "Password",
    isRequired: true,
    placeholder: "Enter your password",
    Component: Input,
    width: 10,
    validate: (values) => {
      let error = requiredCheck(values, "password");
      return error;
    }
  }
];
