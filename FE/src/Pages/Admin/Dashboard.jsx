import Topbar from "./Topbar"
import Sidebar from "./Sidebar";
import { useQuery } from "@apollo/client";
import { GET_NOTIFICATION } from "../../utils/query";
import { useEffect } from "react";
const Dashboard = () => {
  const {loading,data} = useQuery(GET_NOTIFICATION);
  useEffect(()=>{
    if(!loading){
      console.log(data?.getNotifications);
    }
  },[loading])
  return (
    <div className="h-screen flex flex-col dark:bg-black dark:text-white">
      <Topbar />
      <div className="flex-1 flex justify-between *:p-2">
        <Sidebar />
        <div className="border-r flex-1 flex-col flex justify-between">
          <p className="text-2xl">Insights </p>
          <div className="w-full p-2 h-[250px] border rounded">Registrations</div>
          <div className="w-full p-2 h-[250px] border rounded">Users</div>
          <div className="flex border-b dark:border-white border-black justify-center gap-4 mb-6">
            <p>Total Courses: 8</p>
            <p>Total Educators: 5</p>
            <p>Total Students: 89</p>
          </div>
        </div>
        <div className="flex flex-col w-1/5 *:h-1/2 *:m-1 *:p-1 *:border-green-500 *:border *:rounded">
          <div className="text-center">
          <p className="text-2xl text-center">Recent Updates</p>
          <div>
            {!loading && data?.getNotifications?.map((item) => (<p className="border rounded  p-1 my-2" key={item.id}>{item.message}</p>))}
          </div>
          </div>
          <div className="">Announcements</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard