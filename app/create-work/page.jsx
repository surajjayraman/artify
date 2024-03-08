"use client";
import React, { useState } from "react";
import Form from "@components/Form";
import Navbar from "@components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreateWork = () => {
  const [work, setWork] = useState({
    creator: "",
    category: "",
    title: "",
    description: "",
    price: "",
    photos: [],
  });
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    work.creator = session?.user?._id;
  }

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
      const response = await fetch("/api/work/new", {
        method: "POST",
        body: newWorkForm,
      });
      if (response.ok) {
        router.push("/shop");
      }
    } catch (error) {
      console.error(`Publish work failed: ${error.message}`);
    }
  };

  return (
    <>
      <Navbar />
      <Form
        type="Create"
        work={work}
        setWork={setWork}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default CreateWork;
