import Topbar from "./Topbar"
import { useEffect, useState } from 'react'
import CourseChooser from "../../Components/CourseChooser";
import Sidebar from "./Sidebar";
import { GET_NOTIFICATION, GET_USER_DATA } from "../../utils/query";
import { useQuery } from "@apollo/client";

const Dashboard = () => {
  const { loading,data } = useQuery(GET_USER_DATA);
  const { loading:loading2,data:data2 } = useQuery(GET_NOTIFICATION);
  useEffect(()=>{
    if(!loading2){
    console.log(data2?.getNotifications);
  }
  },[loading2])
  
  const [loggedIn, setLoggedIn] = useState(true);
  console.log(data?.getUserData?.courses);
  useEffect(() => {
    if (!loading) {
      setLoggedIn(data?.getUserData?.courses.length >= 3);
    }
  }, [loading,data?.getUserData?.courses.length]);

  return (
    <div className="h-screen flex flex-col ">
      <Topbar />
      {loggedIn === false ?
        <CourseChooser setLoggedIn={setLoggedIn} /> :

        <div className="flex-1 flex justify-between *:p-2 dark:bg-black dark:text-white">
          <Sidebar />
          <div className="border-r flex-1 text-4xl flex justify-center items-center">
         <p className="">Welcome to Educator Dashboard</p>
          </div>
          <div className="w-1/5">
            <p className="text-2xl text-center">Recent Updates</p>
            <div>
              {!loading2 && data2?.getNotifications?.map((item)=>(<p className="border rounded  p-1 my-2" key={item.id}>{item.message}</p>))}
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export { Dashboard }