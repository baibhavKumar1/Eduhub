import { Pagination } from "antd"
import Sidebar from "../../Components/Sidebar"
import Topbar from "../../Components/Topbar"
import {Tabs} from "antd"
import { useState } from "react"
const Course = () => {
  const [active,setActive] = useState(1);
  const items=[{
    label:"Past lectures",
    key:1
  },{
    label:"Today's lectures",
    key:2
  },
  {
    label:"Tomorrow's lectures",
    key:3
  }
]
  return (
    <div className="flex">
      <Sidebar />

      <div className="p-2">
        <Topbar />
        <p className="text-xl">Lectures</p>
        <Tabs
          defaultActiveKey={1}
          centered
          items={items}
          onChange={(e)=>setActive(e)}
        />
        <Pagination></Pagination>
        <div className="border">
          <p>{active==1?"First Lecture":"Second Lecture"}</p>
          <p>Date</p>
          <p>Total Students</p>
        </div>
      </div>
    </div>
  )
}

export default Course