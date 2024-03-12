import Loader from "@components/Loader";
import Navbar from "@components/Navbar";
import WorkList from "@components/WorkList";
import { useParams } from "next/navigation";
import React, { use, useState } from "react";

const SearchPage = () => {
  const { query } = useParams();
  const [loading, setLoading] = useState(true);
  const [workList, setWorkList] = useState([]);

  useEffect(() => {
    const getWorkList = async () => {
      try {
        const response = await fetch(`/api/work/search/${query}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setWorkList(data.body.works);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    getWorkList();
  }, [query]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <WorkList data={workList} />
    </>
  );
};

export default SearchPage;
