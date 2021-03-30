import React, { memo } from "react";
import { Form } from "semantic-ui-react";
import PropTypes from "prop-types";
import FormField from "./form-field";
import clsx from "clsx";

const FormDefaultLayout = memo((props) => {
  const { field, isSubmitting } = props;
  const {
    isRequired,
    formGroupClassNames,
    formFieldLabelClassNames,
    labelClassNames,
    infoLabelClassNames
  } = field;

  return (
    <Form.Group
      className={clsx("margin-no padding-md-vertical padding-bg-horizontal", formGroupClassNames)}
    >
      <Form.Field
        width={6}
        required={isRequired}
        className={clsx("padding-sm-top", formFieldLabelClassNames)}
      >
        <label className={clsx("text-case-sentence", labelClassNames)}>{field.label}</label>
        <div
          className={clsx("info label text-size-ten text-color-semilightgrey", infoLabelClassNames)}
        >
          {field.infoLabel}
        </div>
      </Form.Field>
      <FormField field={field} isSubmitting={isSubmitting} width={10} />
    </Form.Group>
  );
});

export default FormDefaultLayout;

FormDefaultLayout.propTypes = {
  field: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool
};
