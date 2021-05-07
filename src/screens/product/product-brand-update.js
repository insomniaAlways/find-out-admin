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
          <div className="width-full">
            <Input
              name={id}
              type={"number"}
              value={data}
              setValue={handleInputChange}
              className="width-half"
              inputClassName="padding-vs-top padding-vs-bottom"
            />
            <span
              className="float-right cursor-pointer padding-vs-top"
              onClick={() => toggleView((prev) => !prev)}>
              <i class="save outline blue icon"></i>
            </span>
          </div>
        ) : (
          <div className="width-full">
            <div className="padding-vs-top padding-vs-bottom">
              {value}
              <span
                className="float-right cursor-pointer"
                onClick={() => toggleView((prev) => !prev)}>
                <i class="edit outline red icon"></i>
              </span>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default ProductBrandUpdate;
