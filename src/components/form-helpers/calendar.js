import React, { useState, useMemo } from "react";
import { ErrorMessage, useField } from "formik";
import { Form } from "semantic-ui-react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";

function Calendar(props) {
  const { field, isSubmitting } = props;
  const { valuePath, placeholder, inputClassNames, width } = field;

  const [ formikField, meta ] = useField({ name: valuePath });

  const hasError = useMemo(() => meta.error && meta.touched, [ meta.error, meta.touched ]);

  const value = useMemo(() => formikField.value, [formikField.value]);

  const [timeCutOff] = useState({
    min: moment()
      .subtract(1, "d")
      .toDate(),
    max: moment()
      .add(100, "y")
      .toDate()
  });

  const handleOnBlur = (e) => {
    e.target = {
      name: "date"
    };
    formikField.onBlur(e);
  };
  const handleOnChange = (date) => {
    formikField.onChange({ target: { name: "date", value: date } });
  };

  return (
    <Form.Field
      width={width}
      className={clsx("text-color-black", inputClassNames, { error: hasError })}
      disabled={isSubmitting}
    >
      <DatePicker
        className={"text-color-black"}
        dateFormat="dd/MM/yyyy"
        selected={value}
        onChange={handleOnChange}
        minDate={timeCutOff.min}
        maxTime={timeCutOff.max}
        onBlur={handleOnBlur}
        placeholderText={placeholder}
      />
      <div className="info placeholder text-size-ten text-color-negative">
        <ErrorMessage name={props.field.valuePath} />
      </div>
    </Form.Field>
  );
}

export default Calendar;

Calendar.propTypes = {
  field: PropTypes.object,
  isSubmitting: PropTypes.bool
};
