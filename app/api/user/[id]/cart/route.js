import User from "@models/User";
import { connectToDatabase } from "@mongodb/database";

export const POST = async (req, { params }) => {
  try {
    const { cart } = await req.json();
    await connectToDatabase();
    const userId = params.id;
    const user = await User.findById(userId);
    user.cart = cart;
    await user.save();
    return new Response(JSON.stringify(user.cart), {
      status: 200,
    });
  } catch {
    console.error(error);
    return new Response("Error updating cart", { status: 500 });
  }
};
