import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { connect } from "react-redux";
import { createSellerProduct } from "../../store/actions/seller-product.action";
import { getDataById } from "../../store/selectors/find-data.selector";
import TableCommon from "../../components/table-helpers/table-common";
import { Button } from "semantic-ui-react";
import ModalView from "../../components/modules/modal-view";
import AddNewProductBrand from "../../components/product-helpers/add-new-product-brand";
import DeleteView from "../../components/product-helpers/delete-view";
import { deleteProductBrand, queryProductBrand } from "../../store/actions/product-brand.action";
import { getListData } from "../../store/selectors/data.selector";
import { findByIdProduct } from "../../store/actions/product.action";

const columns = [
  {
    Header: "Brand Product",
    accessor: "brand_name",
    headerClassName: "text-color-white"
  },
  {
    Header: "",
    accessor: "id",
    headerClassName: "border-none",
    triggerDelete: deleteProductBrand,
    item_key: "product_brand_id",
    Cell: DeleteView
  }
];

const ProductDetails = (props) => {
  const { fetchProduct, product = {}, create, fetchProductBrand, productBrands, request } = props;
  const { product_id } = useParams();
  const [openModal, toggleModal] = useState(false);
  const { push } = useHistory();

  const rowClickHandler = ({ original }) => {
    if (original.id) {
      push("product-brand/" + original.id + "/details");
    }
  };

  const fetchData = () => {
    if (product_id) {
      fetchProduct(product_id);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchProduct, product_id]);

  if (product && Object.keys(product) && product.id) {
    return (
      <div className="ui segments">
        <div className="ui segment padding-no">
          <div className="ui stackable two column grid margin-no">
            <div className="middle aligned column">
              <h3>{product.name}</h3>
            </div>
            <div className="column text-right">
              <Button primary className="text-right" onClick={() => toggleModal((prev) => !prev)}>
                Add more Brands
              </Button>
            </div>
          </div>
        </div>
        {product && product.product_brands.length ? (
          <div className="ui segment table-container">
            <TableCommon
              rowClickHandler={rowClickHandler}
              columns={columns}
              isLoading={request.isLoading}
              data={productBrands}
              containerClassNames={"height-full"}
              tableClassName={"ui simple table"}
              fetchData={fetchProductBrand}
              defaultQuery={{ product_id: product.id }}
            />
          </div>
        ) : (
          <div className="ui segment">No item found</div>
        )}
        <ModalView
          openModal={openModal}
          toggleModal={toggleModal}
          showActions={false}
          content={
            <AddNewProductBrand
              product={product}
              onSave={create}
              toggleModal={toggleModal}
              reFetchData={fetchData}
            />
          }
          headerContent={<h3>Add New Brand</h3>}
        />
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
    product: getData(state, "product", match.params.product_id),
    productBrands: getAllData(state, "productBrand"),
    request: state.productBrand.request
  });
};

const mapDispatchToProps = (dispatch) => ({
  fetchProduct: (product_id) => {
    dispatch(findByIdProduct({ product_id, actions: {} }));
  },
  fetchProductBrand: (query, actions = {}) => dispatch(queryProductBrand({ query, actions })),
  create: ({ payload, actions }) => dispatch(createSellerProduct({ payload, actions }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
