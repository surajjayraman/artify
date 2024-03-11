"use client";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  return <div>Shop</div>;
};

export default Shop;
