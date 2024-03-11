import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Delete,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import "@styles/WorkCard.scss";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
const WorkCard = ({ work }) => {
  // slider for photos
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const { data: session, update } = useSession();
  const loggedInUserId = session?.user?._id;

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

  // delete work
  const deleteWork = async (e) => {
    e.stopPropagation();
    const hasConfirmed = confirm("Are you sure you want to delete this work?");
    if (hasConfirmed) {
      try {
        const res = await fetch(`/api/work/${work._id}`, {
          method: "DELETE",
        });
        if (res.status === 200) {
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Add to wish list
  const currentWishList = session?.user?.wishList;
  const isLiked = currentWishList?.find((item) => item?._id === work._id);

  const addToWishList = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(
        `/api/user/${loggedInUserId}/wishlist/${work._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      update({ user: { wishList: data.wishList } });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className="work-card"
      onClick={() => router.push(`/work-details?id=${work._id}`)}
    >
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {work.workPhotoPaths?.map((photo, index) => (
            <div className="slide">
              <img key={index} src={photo} alt={work.title} />
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide(e);
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide(e);
                }}
              >
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

      {loggedInUserId === work.creator?._id ? (
        <div className="icon">
          <Delete
            sx={{
              borderRadius: "50%",
              backgroundColor: "white",
              padding: "5px",
              fontSize: "30px",
            }}
            onClick={(e) => deleteWork(e)}
          />
        </div>
      ) : (
        <div className="icon" onClick={(e) => addToWishList(e)}>
          {isLiked ? (
            <Favorite
              sx={{
                borderRadius: "50%",
                backgroundColor: "white",
                color: "red",
                padding: "5px",
                fontSize: "30px",
              }}
            />
          ) : (
            <FavoriteBorder
              sx={{
                borderRadius: "50%",
                backgroundColor: "white",
                padding: "5px",
                fontSize: "30px",
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default WorkCard;
