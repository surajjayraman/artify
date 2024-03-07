"use client";
import React from "react";

const CreateWork = () => {
  const [work, setWork] = useState({
    creator: "",
    category: "",
    title: "",
    description: "",
    price: "",
    photos: [],
  });
  return <div>Sell Your Work</div>;
};

export default CreateWork;
