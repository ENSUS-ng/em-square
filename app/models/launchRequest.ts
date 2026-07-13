import mongoose, { Schema, type Document, models,model } from "mongoose"

export interface ILaunchRequest extends Document {
  name: string
  email: string
  message: string
  createdAt: Date
  updatedAt: Date
}

const launchRequestSchema = new Schema<ILaunchRequest>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

const LaunchRequest =
  models?.LaunchRequest ||
  model<ILaunchRequest>("LaunchRequest", launchRequestSchema)

export default LaunchRequest
