"use client"
import { categories } from "@data"; // Import the categories array from the data module
import WorkList from "./WorkList";
import { useState } from "react";
import "@styles/Categories.scss";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <>
      <div className="categories">
        {categories?.map((item, index) => (
          <p
            key={index}
            onClick={() => selectedCategory(item)}
            className={`${item === selectedCategory ? "selected" : ""}`}
          >
            {item}
          </p>
        ))}
      </div>
      <WorkList />
    </>
  );
};

export default Feed;
