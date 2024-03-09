import Work from "@models/Work";
import { connectToDatabase } from "@mongodb/database";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const work = await Work.findById(params.id).populate("creator");
    if (!work) {
      return NextResponse.json({
        status: 404,
        body: {
          message: "Work not found!",
        },
      });
    }
    return NextResponse.json({
      status: 200,
      body: work,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      body: {
        message: "Work fetch failed!",
      },
    });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    await connectToDatabase();
    const data = await req.formData();
    // extract data from form
    const creator = data.get("creator");
    const category = data.get("category");
    const title = data.get("title");
    const description = data.get("description");
    const price = data.get("price");

    // get photos array
    const photos = data.getAll("workPhotoPaths");
    const workPhotoPaths = [];
    // loop through photos array
    for (let photo of photos) {
      if (photo instanceof Object) {
        const bytes = await photo.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const photoPath = `/Users/lighthouse/artify/public/uploads/${photo.name}`;
        await writeFile(photoPath, buffer);
        workPhotoPaths.push(`uploads/${photo.name}`);
      } else {
        workPhotoPaths.push(photo);
      }
    }
    // find the existing work
    const existingWork = await Work.findById(params.id);
    if (!existingWork) {
      return NextResponse.json({
        status: 404,
        body: {
          message: "Work not found!",
        },
      });
    }
    // update the work
    existingWork.creator = creator;
    existingWork.category = category;
    existingWork.title = title;
    existingWork.description = description;
    existingWork.price = price;
    existingWork.workPhotoPaths = workPhotoPaths;

    await existingWork.save();
  } catch (error) {}
};
