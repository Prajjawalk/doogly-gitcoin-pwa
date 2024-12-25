import OpenAI from "openai";
import mongoose from "@/lib/mongodb"; // Adjust the import based on your project structure
import ShortdescriptionModel from "../models/ShortDescription";

// Function to get project shortdescription
export const POST = async (req: Request) => {
  try {
    const { profileId, description } = await req.json(); // Get profileId and description from request body
    const project = await ShortdescriptionModel(mongoose).findOne({
      profileId: profileId,
    });

    // If project description does not exist create one from ChatGPT api and add to db
    if (!project) {
      const openai = new OpenAI({
        apiKey: process.env.GPT_API_KEY,
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant. I will give you the description of a project and you need to summarize it in 2-3 lines in the most appealing way possible",
          },
          {
            role: "user",
            content: description as string,
          },
        ],
      });

      const shortDescription = completion.choices[0].message?.content;

      const newShortDescription = await ShortdescriptionModel(mongoose).create({
        shortDescription: shortDescription,
        profileId: profileId,
        id: new mongoose.Types.ObjectId(),
      });
      return new Response(JSON.stringify(newShortDescription));
    }
    return new Response(JSON.stringify(project));
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
