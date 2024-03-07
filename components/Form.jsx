import { categories } from "@data";
import { IoIosImages } from "react-icons/io";
import "@styles/Form.scss";

const Form = ({ type, work, setWork }) => {
  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setWork({ ...work, photos: [...work.photos, ...newPhotos] });
  };

  return (
    <div className="form">
      <h1>{type} Your Work</h1>
      <form>
        <h3>Which of these categories best describes your work?</h3>
        {categories?.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
        <h3>Add some photos of your work</h3>
        {work.photos.length < 1 && (
          <>
            <input
              id="image"
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleUploadPhotos}
              mutiple
            />
            <label htmlFor="image">
              <div className="icon">
                <IoIosImages />
              </div>
              <p>Upload from your device</p>
            </label>
          </>
        )}
      </form>
    </div>
  );
};

export default Form;
