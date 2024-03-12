"use client"
import Loader from "@components/Loader";
import Navbar from "@components/Navbar";
import WorkList from "@components/WorkList";
import "@styles/Wishlist.scss";
import { useSession } from "next-auth/react";
const WishList = () => {
  const { data: session } = useSession();
  const wishList = session?.user?.wishList;

  return !session ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Wish List</h1>
      <WorkList data={wishList} />
    </>
  );
};

export default WishList;
