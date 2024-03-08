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
  } catch (error) {
    console.error(error);
  }
}
