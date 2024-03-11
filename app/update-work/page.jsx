"use client";
import Loader from "@components/Loader";
import Navbar from "@components/Navbar";
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
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newWorkForm = new FormData();
      for (let key in work) {
        newWorkForm.append(key, work[key]);
      }
      work.photos.forEach((photo) => {
        newWorkForm.append("workPhotoPaths", photo);
      });
      const response = await fetch(`/api/work/${workId}`, {
        method: "PATCH",
        body: newWorkForm,
      });
      if (response.ok) {
        router.push("/shop");
      }
    } catch (error) {
      console.error(`Publish work failed: ${error.message}`);
    }
  };
  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <Form
        type="Edit"
        work={work}
        setWork={setWork}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default UpdateWork;
