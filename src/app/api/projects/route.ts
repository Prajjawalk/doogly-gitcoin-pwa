import mongoose from "@/lib/mongodb"; // Adjust the import based on your project structure
import ProjectlistModel from "../models/ProjectList";

// Function to get all projects
export const GET = async () => {
  try {
    const project = await ProjectlistModel(mongoose).find({});
    if (!project) {
      return new Response(JSON.stringify({ error: "Projects not found" }), {
        status: 400,
      });
    }
    return new Response(JSON.stringify(project[0]));
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: "Error retrieving projects" }),
      {
        status: 500,
      }
    );
  }
};
