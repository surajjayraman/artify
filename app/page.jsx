"use client";
import Feed from "@components/Feed";
import Navbar from "@components/Navbar";
import { Suspense } from "react";
const Home = () => {
  return (
    <>
      <Suspense>
        <Navbar />
        <Feed />
      </Suspense>
    </>
  );
};

export default Home;
