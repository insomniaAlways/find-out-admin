import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { connect } from "react-redux";
import {
  createSellerProduct,
  findByIdSellerProduct
} from "../../store/actions/seller-product.action";
import { getDataById } from "../../store/selectors/find-data.selector";
import TableCommon from "../../components/table-helpers/table-common";
import { Button } from "semantic-ui-react";
import ModalView from "../../components/modules/modal-view";
import AddNewProductBrand from "../../components/product-helpers/add-new-product-brand";
import DeleteView from "../../components/product-helpers/delete-view";
import { deleteProductBrand } from "../../store/actions/product-brand.action";

const columns = [
  {
    Header: "Brand Product",
    accessor: "brand_name",
    headerClassName: "text-color-white"
  },
  {
    Header: "",
    accessor: "id",
    triggerDelete: deleteProductBrand,
    item_key: "product_brand_id",
    Cell: DeleteView
  }
];

const ProductDetails = (props) => {
  const { fetchSellerProduct, sellerProduct = {}, create } = props;
  const { seller_product_id } = useParams();
  const [openModal, toggleModal] = useState(false);
  const { push } = useHistory();

  const rowClickHandler = ({ original }) => {
    if (original.id) {
      push("product-brand/" + original.id + "/details");
    }
  };

  const fetchData = () => {
    if (seller_product_id) {
      fetchSellerProduct(seller_product_id);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchSellerProduct, seller_product_id]);

  if (sellerProduct && Object.keys(sellerProduct) && sellerProduct.id) {
    return (
      <div className="ui segments">
        <div className="ui segment padding-no">
          <div className="ui stackable two column grid margin-no">
            <div className="middle aligned column">
              <h3>{sellerProduct.name}</h3>
            </div>
            <div className="column text-right">
              <Button primary className="text-right" onClick={() => toggleModal((prev) => !prev)}>
                Add more Brands
              </Button>
            </div>
          </div>
        </div>
        {sellerProduct && sellerProduct.product_brands.length ? (
          <div className="ui segment">
            <TableCommon
              rowClickHandler={rowClickHandler}
              columns={columns}
              data={sellerProduct.product_brands}
              tableClassName={"ui simple table"}
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
              sellerProduct={sellerProduct}
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
    return <div>Loading...</div>;
  }
};

const mapStateToProps = () => {
  const getData = getDataById();
  return (state, { match }) => ({
    sellerProduct: getData(state, "sellerProduct", match.params.seller_product_id),
    request: state.sellerProduct.request
  });
};

const mapDispatchToProps = (dispatch) => ({
  fetchSellerProduct: (seller_product_id) => {
    dispatch(findByIdSellerProduct({ seller_product_id, actions: {} }));
  },
  create: ({ payload, actions }) => dispatch(createSellerProduct({ payload, actions }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
