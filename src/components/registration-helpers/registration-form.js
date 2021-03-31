import React, { useMemo } from "react";
import Form from "../form-helpers/base";
import Input from "../form-helpers/input";
import { requiredCheck } from "../../utils/validations";
import { useHistory } from "react-router";

function RegistrationForm() {
  const { replace } = useHistory();

  const initialValues = useMemo(
    () => ({
      email: "",
      name: "",
      phone: "",
      alt_phone: "",
      permanent_address: "",
      pan_card: ""
    }),
    []
  );

  const save = (data) => {
    console.log(data);
    replace("/change-password");
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

export default RegistrationForm;

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
    type: "name",
    initialValue: { name: "" },
    valuePath: "name",
    label: "name",
    isRequired: true,
    placeholder: "Enter your full name",
    Component: Input,
    width: 10,
    validate: (values) => {
      let error = requiredCheck(values, "name");
      return error;
    }
  },
  {
    type: "number",
    initialValue: { phone: "" },
    valuePath: "phone",
    label: "phone no",
    isRequired: true,
    placeholder: "Enter your phone number",
    Component: Input,
    width: 10,
    validate: (values) => {
      let error = requiredCheck(values, "phone");
      return error;
    }
  },
  {
    type: "number",
    initialValue: { alt_phone: "" },
    valuePath: "alt_phone",
    label: "Alt. Phone no",
    isRequired: false,
    placeholder: "Enter your alternate phone number",
    Component: Input,
    width: 10,
    validate: (values) => {
      return null;
    }
  },
  {
    type: "text",
    initialValue: { permanent_address: "" },
    valuePath: "permanent_address",
    label: "Permanent Address",
    isRequired: true,
    placeholder: "Enter your Permanent Address",
    Component: Input,
    width: 10,
    validate: (values) => {
      let error = requiredCheck(values, "permanent_address");
      return error;
    }
  },
  {
    type: "text",
    initialValue: { pan_card: "" },
    valuePath: "pan_card",
    label: "PAN Card number",
    isRequired: true,
    placeholder: "Enter your PAN Card number",
    Component: Input,
    width: 10,
    validate: (values) => {
      let error = requiredCheck(values, "pan_card");
      return error;
    }
  }
];
