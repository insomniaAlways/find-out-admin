import React, { useEffect } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { getDataById } from "../../store/selectors/find-data.selector";
import TableCommon from "../../components/table-helpers/table-common";
import { queryProductBrandUnit } from "../../store/actions/product-brand-unit.action";
import { findByIdProductBrand } from "../../store/actions/product-brand.action";
import { getListData } from "../../store/selectors/data.selector";
import ProductBrandUpdate from "./product-brand-update";

const columns = [
  {
    Header: "Packet(gm)",
    accessor: "available_unit",
    headerClassName: "text-color-white"
  },
  {
    Header: "MRP",
    accessor: "mrp_price",
    headerClassName: "text-color-white"
  },
  {
    Header: "Price",
    accessor: "price",
    headerClassName: "text-color-white"
  },
  {
    Header: "Available Quantity",
    accessor: "quantity",
    headerClassName: "text-color-white",
    Cell: ProductBrandUpdate
  }
];

const ProductBrandDetails = (props) => {
  const {
    fetchProductBrand,
    productBrand = {},
    productBrandUnitRequest,
    productBrandUnit,
    fetchProductBrandUnit
  } = props;
  const { product_brand_id } = useParams();

  useEffect(() => {
    if (product_brand_id) {
      fetchProductBrand(product_brand_id);
    }
  }, [fetchProductBrand, product_brand_id]);

  if (productBrand && Object.keys(productBrand) && productBrand.id) {
    return (
      <div className="ui segments">
        <div className="ui segment">
          <h3>{productBrand.brand_name}</h3>
        </div>
        <div className="ui segment">
          <TableCommon
            columns={columns}
            data={productBrandUnit}
            fetchData={fetchProductBrandUnit}
            isLoading={productBrandUnitRequest.isLoading}
            tableClassName={"ui simple table"}
            defaultQuery={{ product_brand_id: product_brand_id }}
          />
        </div>
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductBrandDetails);
