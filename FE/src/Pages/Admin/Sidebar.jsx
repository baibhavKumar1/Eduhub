import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-1/6 *:text-start text-xl flex flex-col justify-between items-center border-r dark:bg-black dark:text-white">
          <div className="flex flex-col gap-4">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/courses">Courses</Link>
            {/* <Link to="/lectures">Lectures</Link> */}
            <Link to="/educators">Educators</Link>
            <Link to="/students">Students</Link>
          </div>
        </div>
  );
};
export default Sidebar;