import mongoose, { Schema, type Document, models,model } from "mongoose"

export interface IBrand extends Document {
  logo: string
  brandName: string
  createdAt: Date
  updatedAt: Date
}

const brandSchema = new Schema<IBrand>(
  {
    logo: { type: String, required: true, trim: true },
    brandName: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

const Brand = models?.Brand || model<IBrand>("Brand", brandSchema)

export default Brand
