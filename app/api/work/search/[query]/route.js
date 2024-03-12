import Work from "@models/Work";
import { connectToDatabase } from "@mongodb/database";
import { NextResponse } from "next/server";
export const GET = async (req, { params }) => {
  try {
    const { query } = params;
    await connectToDatabase();
    let works = [];
    if (query === "all") {
      works = await Work.find().populate("creator");
    } else {
      works = await Work.find({
        $or: [
          { category: { $regex: query, $options: "i" } },
          { title: { $regex: query, $options: "i" } },
        ],
      }).populate("creator");
    }
    if (!works) {
      return NextResponse.json({
        status: 404,
        body: { message: "No work found" },
      });
    }
    return NextResponse.json({
      status: 200,
      body: { works },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      status: 500,
      body: { message: "Internal server error" },
    });
  }
};
