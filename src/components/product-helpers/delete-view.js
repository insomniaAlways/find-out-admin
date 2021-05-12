import React, { useState } from "react";
import { useDispatch } from "react-redux";

function DeleteView(props) {
  const {
    value,
    column: { triggerDelete, item_key }
  } = props;
  const dispatch = useDispatch();
  const [isLoading, toggleLoading] = useState(false);

  const onSuccess = () => {
    toggleLoading(false);
  };

  const onFailed = () => {
    toggleLoading(false);
  };

  const deleteItem = (e) => {
    e.stopPropagation();
    toggleLoading(true);
    dispatch(triggerDelete({ [item_key]: value, actions: { onFailed, onSuccess } }));
    return false;
  };

  return (
    <div className="text-center ignoreRowClick">
      {isLoading ? (
        <span className="ui mini active inline loader"></span>
      ) : (
        <span onClick={deleteItem} className="cursor-pointer ignoreRowClick">
          <i className="trash alternate outline red icon"></i>
        </span>
      )}
    </div>
  );
}

export default DeleteView;
