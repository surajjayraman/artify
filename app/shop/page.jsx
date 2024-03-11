"use client";
import Loader from "@components/Loader";
import Navbar from "@components/Navbar";
import WorkList from "@components/WorkList";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "@styles/Shop.scss";

const Shop = () => {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const loggedInUserId = session?.user?._id;

  const searchParams = useSearchParams;
  const [workList, setWorkList] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getWorkList = () => {
      if (loggedInUserId) {
        fetch(`/api/user/${loggedInUserId}/shop`)
          .then((res) => res.json())
          .then((data) => {
            console.log(`Shop data:`, data);
            setUser(data.user);
            setWorkList(data.workList);
            setLoading(false);
          });
      }
    };
    getWorkList();
  }, [loggedInUserId]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      {loggedInUserId && <h1 className="title-list">Your Works</h1>}
      <WorkList data={workList} />
    </>
  );
};

export default Shop;
