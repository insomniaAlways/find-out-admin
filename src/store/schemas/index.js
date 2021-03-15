import { schema } from 'normalizr';
// import mergeData from "../../utils/merge-data";

const categorySchema = new schema.Entity('category');
const categoryArraySchema = new schema.Array(categorySchema);

const itemSchema = new schema.Entity('item');
const itemArraySchema = new schema.Array(itemSchema);

export { categorySchema, categoryArraySchema, itemSchema, itemArraySchema };
