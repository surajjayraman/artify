"use client";
import Loader from "@components/Loader";
import Navbar from "@components/Navbar";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Edit,
  Favorite,
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

  // add to wish list
  const currentWishList = session?.user?.wishList;
  const isLiked = currentWishList?.find((item) => item?._id === work?._id);

  const addToWishList = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(`/api/user/${userId}/wishlist/${work._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      update({ user: { wishList: data.wishList } });
    } catch (error) {
      console.error(error);
    }
  };

  // Add to cart
  const cart = session?.user?.cart;
  const isInCart = cart?.find((item) => item?.workId === workId);

  const addToCart = async (e) => {
    const newCartItem = {
      workId,
      image: work.workPhotoPaths[0],
      title: work.title,
      category: work.category,
      creator: work.creator,
      price: work.price,
      quantity: 1,
    };
    if (!isInCart) {
      try {
        const newCart = [...cart, newCartItem];
        await fetch(`/api/user/${userId}/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart: newCart }),
        });
        update({ user: { cart: newCart } });
      } catch (error) {
        console.error(error);
      }
    } else {
      confirm("This item is already in your cart");
      return;
    }
  };

  console.log(`User cart: ${JSON.stringify(cart)}`);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="work-details">
        <div className="title">
          <h1>{work.title}</h1>
          {work?.creator?._id === userId ? (
            <div
              className="save"
              onClick={() => router.push(`/update-work?id=${workId}`)}
            >
              <Edit />
              <p>Edit</p>
            </div>
          ) : (
            <div className="save" onClick={(e) => addToWishList(e)}>
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
          {visiblePhotos < work.workPhotoPaths?.length && (
            <div className="show-more" onClick={loadMorePhotos}>
              <ArrowForwardIos sx={{ fontSize: "40px" }} />
              Show More
            </div>
          )}
        </div>
        <hr />
        <div className="profile">
          <img src={work.creator?.profileImagePath} alt="profile" />
          <h3>Created by {work.creator?.username}</h3>
        </div>
        <hr />
        <h3>About this product</h3>
        <p>{work.description}</p>
        <h1>${work.price}</h1>
        <button type="submit" onClick={addToCart}>
          <ShoppingCart />
          ADD TO CART
        </button>
      </div>
    </>
  );
};

export default WorkDetails;
