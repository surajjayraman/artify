"use client";
import Loader from "@components/Loader";
import Navbar from "@components/Navbar";
import { Edit, FavoriteBorder } from "@mui/icons-material";
import "@styles/WorkDetails.scss";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const WorkDetails = () => {
  const [loading, setLoading] = useState(true);
  const [work, setWork] = useState({});

  const searchParams = new useSearchParams();
  const workId = searchParams.get("id");
  // get work details
  useEffect(() => {
    const getWorkDetails = async () => {
      const response = await fetch(`/api/work/${workId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(`work details: ${JSON.stringify(data)}`);
      setWork(data.body);
      setLoading(false);
    };
    if (workId) {
      getWorkDetails();
    }
  }, [workId]);
  const { data: session, update } = useSession();

  const userId = session?.user?._id;
  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="work-details">
        <div className="title"></div>
        <h1>{work.title}</h1>
        {work?.creator?._id === userId ? (
          <div className="save">
            <Edit />
            <p>Edit</p>
          </div>
        ) : (
          <div className="save">
            <FavoriteBorder />
            <p>Save</p>
          </div>
        )}
      </div>
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {work.workPhotoPaths?.map((photo, index) => (
            <div className="slide">
              <img key={index} src={photo} alt={work.title} />
              <div className="prev-button" onClick={(e) => goToPrevSlide(e)}>
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div className="next-button" onClick={(e) => goToNextSlide(e)}>
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="info">
        <div>
          <h3>{work.title}</h3>
          <div className="creator">
            <img src={work.creator?.profileImagePath} alt="creator" />
            <span>{work.creator?.username}</span> in{" "}
            <span>{work.category}</span>
          </div>
        </div>
        <div className="price">
          <span>$</span>
          {work.price}
        </div>
      </div>
    </>
  );
};

export default WorkDetails;
