import { schema } from "normalizr";
// import mergeData from "../../utils/merge-data";

const categorySchema = new schema.Entity("category");
const categoryArraySchema = new schema.Array(categorySchema);

const itemSchema = new schema.Entity("item");
const itemArraySchema = new schema.Array(itemSchema);

const productSchema = new schema.Entity("product");
const productArraySchema = new schema.Array(productSchema);

const productBrandSchema = new schema.Entity("productbrand");
const productBrandArraySchema = new schema.Array(productBrandSchema);

const sellerProductSchema = new schema.Entity("seller-product");
const sellerProductArraySchema = new schema.Array(sellerProductSchema);

export {
  categorySchema,
  categoryArraySchema,
  itemSchema,
  itemArraySchema,
  productSchema,
  productArraySchema,
  productBrandSchema,
  productBrandArraySchema,
  sellerProductSchema,
  sellerProductArraySchema
};
