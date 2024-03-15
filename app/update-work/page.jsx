"use client";
import Form from "@components/Form";
import Loader from "@components/Loader";
import Navbar from "@components/Navbar";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Suspense } from "react";

const UpdateWork = () => {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const workId = searchParams.get("id");
  const router = useRouter();
  const { data: session } = useSession();

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
            console.error("In Update Work - getWorkDetails failed:", error);
          });
      }
    };
    getWorkDetails();
  }, [workId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateWorkForm = new FormData();
      for (let key in work) {
        updateWorkForm.append(key, work[key]);
      }
      work.photos.forEach((photo) => {
        updateWorkForm.append("workPhotoPaths", photo);
      });
      const response = await fetch(`/api/work/${workId}`, {
        method: "PATCH",
        body: updateWorkForm,
      });
      if (response.ok) {
        router.push(`/shop?id=${session?.user?._id}`);
      }
    } catch (error) {
      console.error(`Updatework failed: ${error.message}`);
    }
  };
  return loading ? (
    <Loader />
  ) : (
    <>
      <Suspense>
        <Navbar />
        <Form
          type="Edit"
          work={work}
          setWork={setWork}
          handleSubmit={handleSubmit}
        />
      </Suspense>
    </>
  );
};

export default UpdateWork;
