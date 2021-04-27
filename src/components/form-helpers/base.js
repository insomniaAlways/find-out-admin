import React, { useEffect } from "react";
import { Formik } from "formik";
import { Form } from "semantic-ui-react";
import PropTypes from "prop-types";
import FormDefaultLayout from "./form-default-layout";
import clsx from "clsx";
import omitBy from "lodash/omitBy";
import isNil from "lodash/isNil";

const FormBase = (props) => {
  debugger;

  const {
    fields,
    initialValues,
    formClassNames = "",
    FormCustomLayout,
    postRequest,
    submitButtonLabel = "",
    submitButtonClassNames = "",
    submitButtonFieldClassNames = "",
    shouldDisabled = false
  } = props;

  const FormLayout = ({ field, ...rest }) => {
    debugger;
    useEffect(() => {
      if (rest.shouldDisabled) {
        rest.setSubmitting(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const Layout = <FormDefaultLayout field={field} isSubmitting={rest.isSubmitting} />;
    if (FormCustomLayout) {
      return <FormCustomLayout field={field} isSubmitting={rest.isSubmitting} />;
    }
    return Layout;
  };

  const validate = (values) => {
    let errors = {};
    fields.forEach((field) => {
      if (field.validate) {
        errors = { ...errors, [field.valuePath]: field.validate(values) };
      }
    });
    return omitBy(errors, isNil);
  };

  const onSubmit = (values, actions) => {
    if (postRequest) {
      postRequest(values, actions);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
      {({ handleSubmit, status, isSubmitting, setSubmitting }) => (
        <Form onSubmit={handleSubmit} className={clsx("form-container", formClassNames)}>
          {fields.map((field) => (
            <FormLayout
              key={field.valuePath}
              field={field}
              isSubmitting={isSubmitting}
              shouldDisabled={shouldDisabled}
              setSubmitting={setSubmitting}
            />
          ))}
          <div
            className={clsx(
              submitButtonFieldClassNames || "ui segment text-center border-radius-none"
            )}>
            {status && (
              <p className="text-color-negative">Error generating event data. Please try again.</p>
            )}
            <button
              type="submit"
              className={clsx(submitButtonClassNames || "ui positive button padding-md")}
              disabled={isSubmitting}>
              {submitButtonLabel}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormBase;

FormBase.propTypes = {
  fields: PropTypes.array.isRequired,
  FormCustomLayout: PropTypes.func,
  formClassNames: PropTypes.string,
  postRequest: PropTypes.func,
  submitButtonLabel: PropTypes.string,
  submitButtonClassNames: PropTypes.string,
  submitButtonFieldClassNames: PropTypes.string,
  shouldDisabled: PropTypes.bool
};
