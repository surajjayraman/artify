import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import "@styles/WorkCard.scss";
import { useState } from "react";
const WorkCard = ({ work }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
  return (
    <div className="work-card">
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
          <span>$</span>{work.price}
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
