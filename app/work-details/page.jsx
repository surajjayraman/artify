"use client";
import Loader from "@components/Loader";
import Navbar from "@components/Navbar";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Edit,
  FavoriteBorder,
  ShoppingCart,
} from "@mui/icons-material";
import "@styles/WorkDetails.scss";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
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

  // slider for work photos

  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const goToPrevSlide = (e) => {
    if (currentIndex === 0) {
      setCurrentIndex(work.workPhotoPaths.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNextSlide = (e) => {
    if (currentIndex === work.workPhotoPaths.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // show more photos
  const [visiblePhotos, setVisiblePhotos] = useState(5);
  const loadMorePhotos = () => {
    setVisiblePhotos(work.workPhotoPaths.length);
  };

  // select demo photo
  const selectDemoPhoto = (photo) => {
    setCurrentIndex(work.workPhotoPaths.indexOf(photo));
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="work-details">
        <div className="title">
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
        <div className="photos">
          {work.workPhotoPaths?.slice(0, visiblePhotos).map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt="work-demo"
              onClick={() => selectDemoPhoto(photo)}
              className={`${
                currentIndex === work.workPhotoPaths.indexOf(photo)
                  ? "selected"
                  : ""
              }`}
            />
          ))}
          {visiblePhotos < work.workPhotoPaths.length && (
            <div className="show-more" onClick={loadMorePhotos}>
              <ArrowForwardIos sx={{ fontSize: "40px" }} />
              Show More
            </div>
          )}
        </div>
        <hr />
        <div className="profile">
          <img src={work.creator?.profileImagePath} alt="profile" />
          <h3>Created by {work.creator.username}</h3>
        </div>
        <hr />
        <h3>About this product</h3>
        <p>{work.description}</p>
        <h1>${work.price}</h1>
        <button type="submit">
          <ShoppingCart />
          ADD TO CART
        </button>
      </div>
    </>
  );
};

export default WorkDetails;
