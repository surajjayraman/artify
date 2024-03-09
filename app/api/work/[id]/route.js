import Work from "@models/Work";
import { connectToDatabase } from "@mongodb/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const work = await Work.findById(params.id).populate("creator");
    if (!work) {
      return {
        status: 404,
        body: {
          message: "Work not found!",
        },
      };
    }
    return {
      status: 200,
      body: work,
    };
  } catch (error) {}
};
