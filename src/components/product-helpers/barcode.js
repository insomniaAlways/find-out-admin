import React, { useState } from "react";
import { connect } from "react-redux";
import { findProductByBarcode } from "../../store/actions/seller-product.action";
import { getString } from "../../utils/validations";
import Input from "../elements/input";

function Barcode(props) {
  const {
    isSubmitting = false,
    isDisabled,
    togglePreFillSection,
    fetchProduct,
    dispatch,
    isSearching,
    toggleSearching
  } = props;

  const [barcode, handleInputChange] = useState("");

  const onSuccess = (response) => {
    // console.log("barcode onSuccess", response);
    toggleSearching(() => false);
    togglePreFillSection(true);
    dispatch({
      type: "pre-fill",
      value: {
        // product: {
        //   product_brands: [
        //     {
        //       id: 8,
        //       brand_name: "patanjali"
        //     },
        //     {
        //       id: 9,
        //       brand_name: "tata"
        //     },
        //     {
        //       id: 10,
        //       brand_name: "birla"
        //     },
        //     {
        //       id: 1,
        //       brand_name: "Tata Sampoorna Toor Dal"
        //     }
        //   ],
        //   id: 1,
        //   name: "Toor Dal",
        //   unit: "gm",
        //   description: "Toor Dal",
        //   sub_category_id: 1
        // },
        // product_brand: {
        //   id: 8,
        //   brand_name: "patanjali"
        // },
        // product_brand_unit: { label: "100gm", value: 100 },
        // mrp_price: 100,
        // barcode
      }
    });
  };

  const onFailed = (error) => {
    // console.log("barcode failed", error);
    toggleSearching(() => false);
    togglePreFillSection(false);
  };

  const search = () => {
    if (getString(barcode).length) {
      toggleSearching(() => true);
      // setTimeout(() => onSuccess({ ss: 11 }), 5000);
      fetchProduct(getString(barcode), { onSuccess, onFailed });
    } else {
      alert("Please enter the barcode");
    }
  };

  return (
    <div className="field">
      <label>Pre-fill product details using BARCODE(if available)</label>
      <Input
        name={"barcode"}
        className="text-color-black"
        type={"number"}
        setValue={(key, value) => handleInputChange(value)}
        min="1"
        value={barcode}
        isDisabled={isDisabled || isSearching || isSubmitting}
        placeholder={"Enter barcode"}
        hasAction={true}
        actionLabel={"Search"}
        onActionClick={search}
      />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchProduct: (barcode, actions = {}) => dispatch(findProductByBarcode({ barcode, actions }))
});

export default connect(null, mapDispatchToProps)(Barcode);
