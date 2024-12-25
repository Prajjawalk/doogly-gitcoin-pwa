import mongoose, { Document, ObjectId, Schema } from "mongoose";

// Define the interface for the Shortdescription document
export interface IShortdescription extends Document {
  id: ObjectId;
  shortDescription: string;
  profileId: string;
}

// Create the Shortdescription schema
const ShortdescriptionSchema: Schema = new Schema(
  {
    id: { type: Object, required: true },
    shortDescription: { type: String, required: true },
    profileId: { type: String, required: true },
  }
  // {
  //   timestamps: true, // Automatically manage createdAt and updatedAt fields
  // }
);

// Create the Shortdescription model
const createShortdescriptionModel = (mongooseInstance: typeof mongoose) => {
  return (
    mongooseInstance.models.shortdescriptions ||
    mongooseInstance.model("shortdescriptions", ShortdescriptionSchema)
  );
};

export default createShortdescriptionModel;
