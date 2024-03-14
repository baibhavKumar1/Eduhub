import { useState } from "react";
import Topbar from "./Topbar"
import { Pagination, Tabs } from "antd";

const Lecture = () => {
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
    <div>
      <Topbar/>
      <p className="text-xl">Lectures</p>
        <Tabs
          defaultActiveKey={1}
          centered
          items={items}
          onChange={(e)=>setActive(e)}
        />
        <Pagination></Pagination>
        <div className="flex flex-col p-2 gap-4">
        <div className="border">
          <p>{active==1?"First Lecture":"Second Lecture"}</p>
          <div className="flex justify-between">
            <p>John doe</p>
            <p>Date</p>
          </div>
        </div>
        <div className="border">
          <p>{active==1?"First Lecture":"Second Lecture"}</p>
          <div className="flex justify-between">
            <p>John doe</p>
            <p>Date</p>
          </div>
        </div>
        <div className="border">
          <p>{active==1?"First Lecture":"Second Lecture"}</p>
          <div className="flex justify-between">
            <p>John doe</p>
            <p>Date</p>
          </div>
        </div>
        </div>
    </div>
  )
}

export {Lecture}