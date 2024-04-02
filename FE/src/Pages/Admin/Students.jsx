import Topbar from "./Topbar"
import Sidebar from "./Sidebar"
import { useState } from "react";
import { Button, Modal, Input } from "antd"
const Students = () => {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div className="h-screen flex flex-col">
        <Topbar/>
        <div className="flex flex-1 *:p-2">
            <Sidebar/>
            <div className="flex-1 flex flex-col ">
            <div className="flex justify-between ">
              <p className="text-2xl">Students: </p>
              <Button onClick={showModal}>Add Student</Button>
              <Modal open={open} title="Add Student"
                onOk={handleOk} onCancel={handleCancel}
                footer={(_, { CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <Button>Add</Button>
                  </>)}>
                <div className="flex flex-col gap-4">
                  <Input type="text" placeholder="Title" />
                  <Input type="text" placeholder="Description" />
                  <Input type="text" placeholder="Duration" />
                </div>
              </Modal>
            </div>
            <div className="h-56 my-2 border p-1 rounded">
              <p>Trending Students</p>
              <div></div>
            </div>
            <div className="flex flex-wrap gap-8 *:w-[200px] *:h-[200px] *:border *:text-center justify-center p-4 *:flex *:justify-center *:flex-col *:rounded">
              <div className="border ">
                <p>MERN-101</p>
                <p>This is the first batch of MERN stack development</p>
                <p>Courses: 23</p>
              </div>
              <div>
                <p>MERN-102</p>
                <p>This is the second batch of MERN stack development</p>
                <p>Courses: 32</p>
              </div>
              <div>
                <p>MERN-103</p>
                <p>This is the third batch of MERN stack development</p>
                <p>Courses: 45</p>
              </div>
              <div className="border">
                <p>MERN-101</p>
                <p>This is the first batch of MERN stack development</p>
                <p>Courses: 23</p>
              </div>
              <div>
                <p>MERN-102</p>
                <p>This is the second batch of MERN stack development</p>
                <p>Courses: 32</p>
              </div>
              <div>
                <p>MERN-103</p>
                <p>This is the third batch of MERN stack development</p>
                <p>Courses: 45</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Students