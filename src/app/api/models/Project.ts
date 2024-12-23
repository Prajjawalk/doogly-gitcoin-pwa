import mongoose, { Document, ObjectId, Schema } from "mongoose";

// Define the interface for the Campaign document
export interface IProject extends Document {
  id: ObjectId;
  title: string;
  shortDescription: string;
  description: string;
  bannerImageUrl: string;
  logoImageUrl: string;
  projectWebsite: string;
  projectTwitter: string;
  profileId: string;
}

// Create the Project schema
const ProjectSchema: Schema = new Schema(
  {
    id: { type: Object, required: true },
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    bannerImageUrl: { type: String, required: true },
    logoImageUrl: { type: String, required: true },
    projectWebsite: { type: String, required: true },
    projectTwitter: { type: String, required: true },
    profileId: { type: String, required: true },
  }
  // {
  //   timestamps: true, // Automatically manage createdAt and updatedAt fields
  // }
);

// Create the Campaign model
const createProjectModel = (mongooseInstance: typeof mongoose) => {
  return (
    mongooseInstance.models.projects ||
    mongooseInstance.model("projects", ProjectSchema)
  );
};

export default createProjectModel;
