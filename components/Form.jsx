import { categories } from "@data";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
import "@styles/Form.scss";

const Form = ({ type, work, setWork }) => {
  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setWork({ ...work, photos: [...work.photos, ...newPhotos] });
  };

  const handleRemovePhotos = (indexToRemove) => {
    const newPhotos = work.photos.filter(
      (_, i) => i !== parseInt(indexToRemove)
    );
    setWork({ ...work, photos: newPhotos });
  };

  return (
    <div className="form">
      <h1>{type} Your Work</h1>
      <form>
        <h3>Which of these categories best describes your work?</h3>
        <div className="category-list">
          {categories?.map((item, index) => (
            <p
              key={index}
              className={`${work.category === item ? "selected" : ""}`}
              onClick={() => setWork({ ...work, category: item })}
            >
              {item}
            </p>
          ))}
        </div>

        <h3>Add some photos of your work</h3>
        {work.photos.length < 1 && (
          <div className="photos">
            <input
              id="image"
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleUploadPhotos}
              multiple
            />
            <label htmlFor="image" className="alone">
              <div className="icon">
                <IoIosImages />
              </div>
              <p>Upload from your device</p>
            </label>
          </div>
        )}
        {work.photos.length > 0 && (
          <div className="photos">
            {work?.photos?.map((photo, index) => (
              <div key={index} className="photo">
                {photo instanceof Object ? (
                  <img src={URL.createObjectURL(photo)} alt="work" />
                ) : (
                  <img src={photo} alt="work" />
                )}
                <button type="button" onClick={() => handleRemovePhotos(index)}>
                  <BiTrash />
                </button>
              </div>
            ))}
            <input
              id="image"
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleUploadPhotos}
              multiple
            />
            <label htmlFor="image" className="together">
              <div className="icon">
                <IoIosImages />
              </div>
              <p>Upload from your device</p>
            </label>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
