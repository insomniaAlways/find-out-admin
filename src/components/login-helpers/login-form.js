import React, { useMemo, useEffect, useState } from "react";
import Form from "../form-helpers/base";
import Input from "../form-helpers/input";
import { requiredCheck } from "../../utils/validations";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { authenticateInitiate } from "../../store/actions/session.action";

const LoginForm = (props) => {
  debugger;
  const { triggerLogin, session } = props;

  const { replace } = useHistory();

  const initialValues = useMemo(
    () => ({
      email: "",
      password: ""
    }),
    []
  );

  const save = (data) => {
    debugger;
    console.log(data);
    const { email, password } = data;
    if (email !== "" && password !== "") {
      debugger;
      triggerLogin(data);
    } else {
      debugger;
      alert("Please enter both email and password");
    }
  };
  useEffect(() => {
    debugger;
    if (session.isAuthenticated) {
      replace("/dashboard");
    }
  }, [session.isAuthenticated]);

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
};
const mapStateToProps = (state) => {
  debugger;
  return {
    session: state.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    triggerLogin: (props) => {
      dispatch(authenticateInitiate(props));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

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
