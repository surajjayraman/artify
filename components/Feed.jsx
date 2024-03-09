import { categories } from "@data"; // Import the categories array from the data module

const Feed = () => {
  return (
    <>
      <div className="categories">
        {categories?.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      <WorkList />
    </>
  );
};

export default Feed;
