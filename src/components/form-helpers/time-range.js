import React, { useMemo, useEffect } from "react";
import { ErrorMessage, useFormikContext, useField } from "formik";
import { Form } from "semantic-ui-react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";

function TimeRange(props) {
  const { field, isSubmitting } = props;
  const {
    values: { date },
    setFieldValue
  } = useFormikContext();

  const { inputClassNames, valuePath } = field;

  const [ formikField, meta ] = useField({ name: valuePath });

  const value = useMemo(() => formikField.value, [formikField.value]);

  const selectedDate = useMemo(() => date || moment().toDate(), [date]);

  const hasError = useMemo(
    () => meta.error && meta.error.start_at && meta.error.end_at && meta.touched,
    [ meta.error, meta.touched ]
  );

  useEffect(() => {
    let baseValue = selectedDate;
    if (moment(baseValue).isBefore(moment())) {
      baseValue = moment().toDate();
    }
    let start_at = value.start_at;
    let end_at = value.end_at;
    if (start_at) {
      start_at = moment(baseValue)
        .startOf("day")
        .add(moment(value.start_at).hours(), "h")
        .add(moment(value.start_at).minutes(), "m")
        .toDate();
    }
    if (end_at) {
      end_at = moment(baseValue)
        .startOf("day")
        .add(moment(value.end_at).hours(), "h")
        .add(moment(value.end_at).minutes(), "m")
        .toDate();
    }
    if (start_at || end_at) {
      setFieldValue(valuePath, { end_at, start_at });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const handleStartOnBlur = (e) => {
    e.target = {
      name: "timeRange.start_at"
    };
    formikField.onBlur(e);
  };

  const covertDate = (selectedValue) => {
    const selectedHours = moment(selectedValue).hours();
    const selectedMinutes = moment(selectedValue).minutes();
    return moment(selectedDate)
      .startOf("day")
      .add(selectedHours, "h")
      .add(selectedMinutes, "m")
      .toDate();
  };

  const handleStartOnChange = (date) => {
    handleStartOnBlur({});
    formikField.onChange({ target: { name: "timeRange.start_at", value: covertDate(date) } });
  };

  const handleEndOnBlur = (e) => {
    e.target = {
      name: "timeRange.end_at"
    };
    formikField.onBlur(e);
  };

  const handleEndOnChange = (date) => {
    handleEndOnBlur({});
    formikField.onChange({ target: { name: "timeRange.end_at", value: covertDate(date) } });
  };

  const timeClassName = (time) => {
    return "time-row border-bottom text-left text-size-fourteen";
  };

  return (
    <>
      <Form.Field
        className={clsx("text-color-black", inputClassNames, { error: hasError })}
        disabled={isSubmitting}
      >
        <DatePicker
          className="margin-no text-color-black"
          timeClassName={timeClassName}
          dateFormat="h:mm a"
          selected={value.start_at}
          onChange={handleStartOnChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          onBlur={handleStartOnBlur}
          placeholderText="Select start time"
        />
        <div className="info placeholder text-size-ten text-color-negative">
          <ErrorMessage name={valuePath + ".start_at"} />
        </div>
      </Form.Field>
      <Form.Field
        className={clsx("text-color-black", inputClassNames, { error: hasError })}
        disabled={isSubmitting}
      >
        <DatePicker
          className={"text-color-black"}
          selected={value.end_at}
          onChange={handleEndOnChange}
          showTimeSelect
          onBlur={handleEndOnBlur}
          showTimeSelectOnly
          placeholderText="Select end time"
          timeIntervals={60}
          timeClassName={timeClassName}
          dateFormat="h:mm a"
        />
        <div className="info placeholder text-size-ten text-color-negative">
          <ErrorMessage name={valuePath + ".end_at"} />
        </div>
      </Form.Field>
    </>
  );
}

export default TimeRange;

TimeRange.propTypes = {
  field: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool
};
