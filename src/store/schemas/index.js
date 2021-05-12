import { schema } from "normalizr";
// import mergeData from "../../utils/merge-data";

const categorySchema = new schema.Entity("category");
const categoryArraySchema = new schema.Array(categorySchema);

const productSchema = new schema.Entity("product");
const productArraySchema = new schema.Array(productSchema);

const productBrandSchema = new schema.Entity("product-brand");
const productBrandArraySchema = new schema.Array(productBrandSchema);

const sellerProductSchema = new schema.Entity("seller-product");
const sellerProductArraySchema = new schema.Array(sellerProductSchema);

const productBrandUnitSchema = new schema.Entity("product-brand-unit");
const productBrandUnitArraySchema = new schema.Array(productBrandUnitSchema);

export {
  categorySchema,
  categoryArraySchema,
  productSchema,
  productArraySchema,
  productBrandSchema,
  productBrandArraySchema,
  sellerProductSchema,
  sellerProductArraySchema,
  productBrandUnitSchema,
  productBrandUnitArraySchema
};
