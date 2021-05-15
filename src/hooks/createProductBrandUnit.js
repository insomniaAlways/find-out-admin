import { useState, useCallback } from "react";
import { toastError } from "../components/toast-helpers";
import { createRecord } from "../store/server";

function useCreateProductBrand(props) {
  const [isLoading, toggleLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const postRequest = useCallback(async (data) => {
    const { payload, actions = {} } = data;
    try {
      toggleLoading(() => true);
      const response = await createRecord("product-brand", payload, {
        baseURL: "https://findoutv1.herokuapp.com/public/v1"
      });
      setData(response.data);
      if (actions.reFetchData) {
        actions.reFetchData(response.data);
      }
      if (actions.dispatch) {
        actions.dispatch({
          type: "product_brand",
          value: response.data
        });
      }
      if (actions.onSuccess) {
        actions.onSuccess(response.data);
      }
    } catch (error) {
      setError(error);
      toastError(error);
      if (actions.onFailed) {
        actions.onFailed(error);
      }
    } finally {
      toggleLoading(() => false);
    }
  });

  return [postRequest, data, isLoading, error];
}

export default useCreateProductBrand;
