import "@styles/WorkList.scss";
import WorkCard from "./WorkCard";
import Loader from "./Loader";
const WorkList = ({ data }) => {
  console.log(`data`, data);
  return !data ? (
    <Loader />
  ) : (
    <div className="work-list">
      {data?.map((work) => (
        <WorkCard key={work?._id} work={work} />
      ))}
    </div>
  );
};

export default WorkList;
