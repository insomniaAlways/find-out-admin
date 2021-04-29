import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import Form from "../../components/form-helpers/base";
import FormDropdown from "../../components/form-helpers/form-dropdown";
import Input from "../../components/form-helpers/input";
import { findAllCategory } from "../../store/actions/category.action";
import { requiredCheck } from "../../utils/validations";

function RegisterStore(props) {
  const { fetchCategory, categories } = props;
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
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <Form
      initialValues={initialValues}
      fields={fields}
      postRequest={save}
      submitButtonLabel={"Register store"}
    />
  );
}

const mapStateToProps = () => {
  return (state) => ({
    categories: Object.values(state.category.data.byId),
    request: state.category.request
  });
};

const mapDispatchToProps = (dispatch) => ({
  fetchCategory: (query) => dispatch(findAllCategory({ actions: {} }))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterStore);

const fields = [
  {
    type: "text",
    initialValue: { name: "" },
    valuePath: "name",
    label: "Store Name",
    isRequired: true,
    placeholder: "Enter here",
    width: 6,
    Component: Input,
    validate: (values) => requiredCheck(values, "name")
  },
  {
    type: "dropdown",
    initialValue: { category: [] },
    valuePath: "category",
    label: "Store type",
    isRequired: true,
    placeholder: "Enter here",
    width: 6,
    Component: FormDropdown,
    validate: (values) => null
  },
  {
    type: "number",
    initialValue: { phone: "" },
    valuePath: "phone",
    label: "Store Phone number",
    isRequired: true,
    placeholder: "Enter here",
    width: 6,
    Component: Input,
    validate: (values) => requiredCheck(values, "phone")
  },
  {
    type: "number",
    initialValue: { alt_phone: "" },
    valuePath: "alt_phone",
    label: "Store Alt. Phone number",
    isRequired: true,
    placeholder: "Enter here",
    width: 6,
    Component: Input,
    validate: (values) => requiredCheck(values, "alt_phone")
  },
  {
    type: "text",
    initialValue: { location: "" },
    valuePath: "location",
    label: "Store location",
    isRequired: true,
    placeholder: "Enter here",
    width: 6,
    Component: Input,
    validate: (values) => requiredCheck(values, "location")
  },
  {
    type: "text",
    initialValue: { gst_number: "" },
    valuePath: "gst_number",
    label: "Store GST number",
    isRequired: true,
    placeholder: "Enter here",
    width: 6,
    Component: Input,
    validate: (values) => requiredCheck(values, "gst_number")
  }
];
