import Topbar from "./Topbar"
import { useEffect, useState } from 'react'
import CourseChooser from "../../Components/CourseChooser";
import Sidebar from "./Sidebar";
import { GET_USER_DATA } from "../../utils/query";
import { useQuery } from "@apollo/client";

const Dashboard = () => {
  const { data } = useQuery(GET_USER_DATA);
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    if (data?.getUserData?.courses) {
      setLoggedIn(data.getUserData.courses.length >= 3);
    }
  }, [data?.getUserData?.courses]);
  
  return (
    <div className="h-screen flex flex-col">
      <Topbar />
      {loggedIn === false ?
        <CourseChooser setLoggedIn={setLoggedIn} /> :
        <div className="flex-1 flex justify-between *:p-2">
        <Sidebar/>
          <div className="border-r flex-1">

          </div>
          <div className="w-1/5">
            <p className="text-2xl text-center">Recent Updates</p>
            <div>
              <p className="border rounded border-black p-1 my-2">New lecture created in DSA201</p>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export { Dashboard }