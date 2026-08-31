import mongoose, { Schema, type Document, models, model } from "mongoose"

export interface IService extends Document {
  heading: string
  about: string
  type: "media" | "marketing"
  content: string
  images?: string[]
  createdAt: Date
  updatedAt: Date
}

const serviceSchema = new Schema<IService>(
  {
    heading: { type: String, required: true, trim: true },
    about: { type: String, required: true, trim: true },
    type: { type: String, enum: ["media", "marketing"], required: true },
    content: { type: String, required: true, trim: true },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: (value: string[]) =>
          Array.isArray(value) && value.every((image) => typeof image === "string"),
        message: "Images must be an array of strings",
      },
    },
  },
  { timestamps: true },
)

const Service = models?.Service || model<IService>("Service", serviceSchema)

export default Service
