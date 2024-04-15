import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
      <div className="w-1/6 *:text-start text-xl flex flex-col justify-between items-center dark:border-white border-r dark:bg-black dark:text-white">
            <div className="flex flex-col gap-4">
              <Link to="/edashboard">Dashboard</Link>
              <Link to="/electure">Lectures</Link>
              <Link to="/eassignment">Assignments</Link>              
              <Link to="/estudent">Students</Link>
            </div>
          </div>
    );
  };
  export default Sidebar;