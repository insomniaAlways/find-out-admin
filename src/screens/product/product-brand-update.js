import React, { Fragment, useState } from "react";
import Input from "../../components/elements/input";

function ProductBrandUpdate(props) {
  const { value, column } = props;
  const { id } = column;

  const [data, updateData] = useState(value);
  const [isEdit, toggleView] = useState(false);

  const handleInputChange = (name, value) => {
    updateData(() => value);
  };

  return (
    <div className="width-full">
      <>
        {isEdit ? (
          <Input
            name={id}
            type={"number"}
            value={data}
            setValue={handleInputChange}
            className="width-half"
            inputClassName="padding-vs-top padding-vs-bottom"
          />
        ) : (
          <span className="padding-vs-top padding-vs-bottom">{value}</span>
        )}
      </>
      {isEdit ? (
        <span className="float-right cursor-pointer" onClick={() => toggleView((prev) => !prev)}>
          <i class="save outline icon"></i>
        </span>
      ) : (
        <span className="float-right cursor-pointer" onClick={() => toggleView((prev) => !prev)}>
          <i class="edit outline icon"></i>
        </span>
      )}
    </div>
  );
}

export default ProductBrandUpdate;
