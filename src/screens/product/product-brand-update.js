import clsx from "clsx";
import React, { useState } from "react";
import { connect } from "react-redux";
import Input from "../../components/elements/input";
import { toastSuccess } from "../../components/toast-helpers";
import { updateSellerProduct } from "../../store/actions/seller-product.action";

function ProductBrandUpdate(props) {
  const { value, column, update, row } = props;
  const { id } = column;
  const {
    original: { id: seller_product_id }
  } = row;
  const [data, updateData] = useState(value);
  const [isEdit, toggleView] = useState(false);
  const [isSaving, toggleSaving] = useState(false);

  const onSuccess = () => {
    toggleSaving(false);
    toggleView(() => false);
    toastSuccess({ title: "Successfully Updated" }, true);
  };
  const onFailed = () => {
    toggleSaving(false);
  };

  const save = () => {
    toggleSaving(true);
    update({ [id]: data }, seller_product_id, { onSuccess, onFailed });
  };

  const handleInputChange = (name, value) => {
    updateData(() => value);
  };

  const reset = () => {
    toggleView(false);
    updateData(value);
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
              min={"0"}
              isDisabled={isSaving}
              setValue={handleInputChange}
              className="width-half"
              inputClassName="padding-vs-top padding-vs-bottom"
            />
            {isSaving ? (
              <span className="float-right cursor-pointer padding-vs-top">
                <span className="ui mini active inline loader"></span>
              </span>
            ) : (
              <>
                <span className="float-right cursor-pointer padding-vs-top" onClick={reset}>
                  <i className="times circle outline red icon"></i>
                </span>
                <span
                  className="float-right cursor-pointer padding-vs-top"
                  onClick={() => !isSaving && save()}>
                  <i className={clsx("save outline icon", { blue: !isSaving })}></i>
                </span>
              </>
            )}
          </div>
        ) : (
          <div className="width-full">
            <div className="padding-vs-top padding-vs-bottom">
              {value}
              <span
                className="float-right cursor-pointer"
                onClick={() => toggleView((prev) => !prev)}>
                <i className="edit outline red icon"></i>
              </span>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  update: (payload, seller_product_id, actions = {}) =>
    dispatch(updateSellerProduct({ seller_product_id, payload, actions }))
});

export default connect(null, mapDispatchToProps)(ProductBrandUpdate);
