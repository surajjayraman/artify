import Work from "@models/Work";
import User from "@models/User";

import { connectToDatabase } from "@mongodb/database";

export const PATCH = async (req, { params }) => {
  try {
    await connectToDatabase();
    const userId = params.id;
    const workId = params.workid;

    const user = await User.findById(userId);
    const work = await Work.findById(workId).populate("creator");

    const favoriteWork = user?.wishList.find((item) => {
      return item?._id.toString() === workId;
    });

    if (favoriteWork) {
      user.wishList = user.wishList.filter(
        (item) => item?._id.toString() !== workId
      );
      await user.save();
      return new Response(
        JSON.stringify({
          message: "Work removed from wish list",
          wishList: user.wishList,
        }),
        { status: 200 }
      );
    }
    user.wishList.push(work);
    await user.save();
    return new Response(
      JSON.stringify({
        message: "Work added to wish list",
        wishList: user.wishList,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new Response("Failed to patch work to wish list", { status: 500 });
  }
};
