import { Schema, model, models, type Document } from "mongoose"

export interface IGallerySection extends Document {
  title: string
  description: string
  images: string[]
  createdAt: Date
  updatedAt: Date
}

const gallerySchema = new Schema<IGallerySection>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    images: { type: [String], required: true, validate: (value: string[]) => value.length > 0 },
  },
  { timestamps: true },
)

const GallerySection =
  models?.GallerySection || model<IGallerySection>("GallerySection", gallerySchema)

export default GallerySection
