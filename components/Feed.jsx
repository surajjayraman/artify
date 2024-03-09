"use client";
import { categories } from "@data"; // Import the categories array from the data module
import WorkList from "./WorkList";
import { useEffect, useState } from "react";
import "@styles/Categories.scss";
import Loader from "./Loader";
const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [workList, setWorkList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWorkList = async () => {
      const response = await fetch(`/api/work/list/${selectedCategory}`);
      const data = await response.json();
      setWorkList(data);
      setLoading(false);
    };
    getWorkList();
  }, [selectedCategory]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="categories">
        {categories?.map((item, index) => (
          <p
            key={index}
            onClick={() => setSelectedCategory(item)}
            className={`${item === selectedCategory ? "selected" : ""}`}
          >
            {item}
          </p>
        ))}
      </div>
      <WorkList data={workList} />
    </>
  );
};

export default Feed;
