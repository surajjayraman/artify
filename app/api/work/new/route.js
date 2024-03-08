import Work from "@models/Work";
import { connectToDatabase } from "@mongodb/database";

export async function POST(req) {
  try {
    // connect to database
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
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const photoPath = `/Users/lighthouse/artify/public/uploads/${photo.name}`;
      await writeFile(photoPath, buffer);
      workPhotoPaths.push(`uploads/${photo.name}`);
    }
    // create new work
    const newWork = new Work({
      creator,
      category,
      title,
      description,
      price,
      workPhotoPaths,
    });
    await newWork.save();
    return NextResponse.json(
      {
        message: "Work created successfully!",
        work: newWork,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Work creation failed!",
      },
      {
        status: 500,
      }
    );
  }
}
