import { Schema, model, Document } from "mongoose";
interface ICategory extends Document {
  name: string;
  description: string;
}
const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: { type: String },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);
const Category = model<ICategory>("Category", categorySchema);
export default Category;
