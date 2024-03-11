import { connectToDatabase } from "@mongodb/database";
import Work from "@models/Work";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const category = params.category;
    console.log(`Category: ${JSON.stringify(category)}`);
    let workList;
    if (category !== "All") {
      workList = await Work.find({ category }).populate("creator");
    } else {
      workList = await Work.find().populate("creator");
    }
    if (!workList) {
      return NextResponse.json({
        status: 404,
        body: {
          message: "Work List not found!",
        },
      });
    }
    return NextResponse.json({
      status: 200,
      body: workList,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      body: {
        message: "Work List fetch failed!",
      },
    });
  }
};
