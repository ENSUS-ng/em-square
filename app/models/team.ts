import mongoose, { Schema, type Document, models,model } from "mongoose"

export interface ITeam extends Document {
  picture: string
  name: string
  role: string
  createdAt: Date
  updatedAt: Date
}

const teamSchema = new Schema<ITeam>(
  {
    picture: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

const Team = models?.Team || model<ITeam>("Team", teamSchema)

export default Team
