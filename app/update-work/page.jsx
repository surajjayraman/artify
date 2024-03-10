"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateWork = () => {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const workId = searchParams.get("id");
  const [work, setWork] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    photos: [],
  });
  useEffect(() => {
    const getWorkDetails = async () => {
      if (workId) {
        fetch(`/api/work/${workId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setWork({
              category: data.body.category,
              title: data.body.title,
              description: data.body.description,
              price: data.body.price,
              photos: data.body.workPhotoPaths,
            });
            setLoading(false);
          })
          .catch((error) => {
            console.error("Update Work getWorkDetails failed:", error);
          });
      }
    };
    getWorkDetails();
  }, [workId]);
  return <div>UpdateWork</div>;
};

export default UpdateWork;
