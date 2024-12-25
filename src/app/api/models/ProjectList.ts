import mongoose, { Document, ObjectId, Schema } from "mongoose";

// Define the interface for the Projectlist document
export interface IProjectlist extends Document {
  id: ObjectId;
  projectids: Array<string>;
}

// Create the Projectlist schema
const ProjectlistSchema: Schema = new Schema(
  {
    id: { type: Object, required: true },
    projectids: { type: Array<string>, required: true },
  }
  // {
  //   timestamps: true, // Automatically manage createdAt and updatedAt fields
  // }
);

// Create the Projectlist model
const createProjectlistModel = (mongooseInstance: typeof mongoose) => {
  return (
    mongooseInstance.models.projectlists ||
    mongooseInstance.model("projectlists", ProjectlistSchema)
  );
};

export default createProjectlistModel;
