import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { getDataById } from "../../store/selectors/find-data.selector";
import TableCommon from "../../components/table-helpers/table-common";
import {
  deleteProductBrandUnit,
  queryProductBrandUnit
} from "../../store/actions/product-brand-unit.action";
import { findByIdProductBrand } from "../../store/actions/product-brand.action";
import { getListData } from "../../store/selectors/data.selector";
import ProductBrandUpdate from "./product-brand-update";
import { Button } from "semantic-ui-react";
import ModalView from "../../components/modules/modal-view";
import AddNewProductBrandUnit from "../../components/product-helpers/add-new-product-brand-unit";
import { createSellerProduct } from "../../store/actions/seller-product.action";
import DeleteView from "../../components/product-helpers/delete-view";
import { findByIdProduct } from "../../store/actions/product.action";

const columns = [
  {
    Header: "Packet",
    accessor: "available_unit",
    headerClassName: "text-color-white text-center"
  },
  {
    Header: "MRP",
    accessor: "mrp_price",
    headerClassName: "text-color-white text-center",
    Cell: ProductBrandUpdate,
    cellClassNames: "padding-md-left padding-md-right"
  },
  {
    Header: "Price",
    accessor: "price",
    headerClassName: "text-color-white text-center",
    Cell: ProductBrandUpdate,
    cellClassNames: "padding-md-left padding-md-right"
  },
  {
    Header: (
      <>
        <div>Available Quantity</div>
        <span className="text-size-sm text-weight-normal">(no. of packet)</span>
      </>
    ),
    accessor: "quantity",
    headerClassName: "text-color-white text-center padding-vs",
    cellClassNames: "padding-md-left padding-md-right",
    Cell: ProductBrandUpdate
  },
  {
    Header: "",
    accessor: "id",
    width: 50,
    headerClassName: "border-none",
    triggerDelete: deleteProductBrandUnit,
    item_key: "product_brand_unit_id",
    Cell: DeleteView
  }
];

const ProductBrandDetails = (props) => {
  const {
    fetchProductBrand,
    productBrand = {},
    productBrandUnitRequest,
    productBrandUnit,
    fetchProductBrandUnit,
    fetchProduct,
    product,
    create
  } = props;
  const { product_brand_id, product_id } = useParams();
  const [openModal, toggleModal] = useState(false);

  useEffect(() => {
    if (product_brand_id) {
      fetchProductBrand(product_brand_id);
    }
    if (product_id) {
      fetchProduct(product_id);
    }
  }, [fetchProductBrand, product_brand_id, product_id, fetchProduct]);

  if (productBrand && Object.keys(productBrand) && productBrand.id) {
    return (
      <div className="ui segments">
        <div className="ui segment padding-no">
          <div className="ui stackable two column grid margin-no">
            <div className="middle aligned column">
              <h3>{productBrand.brand_name}</h3>
            </div>
            <div className="column text-right">
              <Button primary className="text-right" onClick={() => toggleModal((prev) => !prev)}>
                Add more packet
              </Button>
            </div>
          </div>
        </div>
        <div className="ui segment table-container">
          <TableCommon
            columns={columns}
            data={productBrandUnit}
            fetchData={fetchProductBrandUnit}
            isLoading={productBrandUnitRequest.isLoading}
            containerClassNames={"height-full"}
            tableClassName={"ui simple celled table"}
            defaultQuery={{ product_brand_id: product_brand_id }}
          />
        </div>
        {openModal ? (
          <ModalView
            openModal={openModal}
            toggleModal={toggleModal}
            showActions={false}
            headerContent={<h3>Add New Packet</h3>}
            content={
              <AddNewProductBrandUnit
                productBrand={productBrand}
                product={product}
                toggleModal={toggleModal}
                onSave={create}
              />
            }
          />
        ) : (
          <></>
        )}
      </div>
    );
  } else {
    return (
      <div className="ui segment" style={{ height: "calc(100% - 40px)" }}>
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
};

const mapStateToProps = () => {
  const getData = getDataById();
  const getAllData = getListData();
  return (state, { match }) => ({
    productBrand: getData(state, "productBrand", match.params.product_brand_id),
    product: getData(state, "product", match.params.product_id),
    productBrandUnit: getAllData(state, "productBrandUnit"),
    productBrandUnitRequest: state.productBrandUnit.request,
    request: state.productBrand.request
  });
};

const mapDispatchToProps = (dispatch) => ({
  fetchProductBrand: (product_brand_id) => {
    dispatch(findByIdProductBrand({ product_brand_id, actions: {} }));
  },
  fetchProductBrandUnit: (query) => {
    dispatch(queryProductBrandUnit({ query, actions: {} }));
  },
  fetchProduct: (product_id, actions = {}) => dispatch(findByIdProduct({ product_id, actions })),
  create: ({ payload, actions }) => dispatch(createSellerProduct({ payload, actions }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductBrandDetails);
