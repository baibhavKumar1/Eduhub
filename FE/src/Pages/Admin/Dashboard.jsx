import Sidebar from "../../Components/Sidebar"

const Dashboard = () => {
  return (
    <div className="flex">
    <Sidebar/>
    <div className="border w-5/6 flex justify-center items-center gap-4">
      <div>
        <p>Course Name : MERN-101</p>
        <p>Students :23</p>
      </div>
      <div>
      <p>Course Name : MERN-101</p>
      <p>Students: 32</p>
      </div>
      <div>
      <p>Course Name : MERN-101</p>
      <p>Students: 45</p>
      </div>
    </div>
    </div>
  )
}

export default Dashboard