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
import {
  createSellerProduct,
  findByIdSellerProduct
} from "../../store/actions/seller-product.action";
import DeleteView from "../../components/product-helpers/delete-view";

const columns = [
  {
    Header: "Packet",
    accessor: "available_unit",
    headerClassName: "text-color-white"
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
    Header: "Available Quantity (no. of packet)",
    accessor: "quantity",
    headerClassName: "text-color-white text-center",
    cellClassNames: "padding-md-left padding-md-right",
    Cell: ProductBrandUpdate
  },
  {
    Header: "",
    accessor: "id",
    cellClassNames: "ignoreRowClick",
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
    fetchSellerProduct,
    sellerProduct,
    create
  } = props;
  const { product_brand_id, seller_product_id } = useParams();
  const [openModal, toggleModal] = useState(false);

  useEffect(() => {
    if (product_brand_id) {
      fetchProductBrand(product_brand_id);
    }
    if (seller_product_id) {
      fetchSellerProduct(seller_product_id);
    }
  }, [fetchProductBrand, product_brand_id, seller_product_id, fetchSellerProduct]);

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
        <div className="ui segment">
          <TableCommon
            columns={columns}
            data={productBrandUnit}
            fetchData={fetchProductBrandUnit}
            isLoading={productBrandUnitRequest.isLoading}
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
                sellerProduct={sellerProduct}
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
    return <div>Loading...</div>;
  }
};

const mapStateToProps = () => {
  const getData = getDataById();
  const getAllData = getListData();
  return (state, { match }) => ({
    productBrand: getData(state, "productBrand", match.params.product_brand_id),
    sellerProduct: getData(state, "sellerProduct", match.params.seller_product_id),
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
  fetchSellerProduct: (seller_product_id, actions = {}) =>
    dispatch(findByIdSellerProduct({ seller_product_id, actions })),
  create: ({ payload, actions }) => dispatch(createSellerProduct({ payload, actions }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductBrandDetails);
