"use client";
import "@styles/WorkDetails.scss";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
const WorkDetails = () => {
  const [loading, setLoading] = useState(true);
  const [work, setWork] = useState({});

  const searchParams = new useSearchParams();
  const workId = searchParams.get("id");
  return <div>{/* Your component content here */}</div>;
};

export default WorkDetails;
