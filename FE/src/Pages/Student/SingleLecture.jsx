import { useMutation, useQuery } from "@apollo/client"
import Topbar from "./Topbar"
import { Link, useParams } from 'react-router-dom'
import { GET_SINGLE_LECTURE } from "../../utils/query"
import { useEffect, useState } from "react"
import { Button, Input, Modal } from "antd"
import { COMPLETE_LECTURE, CREATE_DISCUSSION } from "../../utils/mutations"
import { socket } from "../../utils/Socket"

const SingleLecture = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams()
  const { loading, data, refetch } = useQuery(GET_SINGLE_LECTURE, {
    variables: { id: id }
  })
  const [lecture, setLecture] = useState()
  useEffect(() => {
    setLecture(data?.getSingleLecture)
    socket.on("sendLecture", (data) => {
      console.log("Received lecture:", data);
      refetch()
    });
  }, [data, refetch])
  const handleCancel = () => {
    setOpen(false)
  }
  const [completeLecture] = useMutation(COMPLETE_LECTURE)
  const handleComplete = async () => {
    try {
      const res = await completeLecture({
        variables: { id }
      })
      if (res?.data) {
        console.log(res.data);
      }
    } catch (err) {
      alert(err)
    }
  }
  const [content, setContent] = useState("")
  const [createDiscussion] = useMutation(CREATE_DISCUSSION, { onCompleted: () => refetch() })
  const handleSubmit = async () => {
    console.log(lecture)
    try {
      const res = await createDiscussion({
        variables: { content, id: lecture.id }
      })
      if (res.data) {
        console.log(res.data);
      }
    } catch (err) {
      console.log(err.message);
    }
    setContent("")
    setOpen(false)
  }
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const suffixes = ['st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st'];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDay = `${day}${suffixes[day - 1]}`;
    const formattedDate = `${formattedDay} ${months[monthIndex]}, ${year} ${hours>9?hours:"0"+hours}:${minutes>9 ? minutes : "0"+minutes}`;
    return formattedDate;
  }
  return (
    <div className="h-screen flex flex-col">
      <Topbar />
      {!loading && lecture?.title &&
        <div className='flex flex-1 flex-col space-y-4 p-2 dark:bg-black dark:text-white '>
          <div className='flex justify-between'>
            <div>
              <p className='text-2xl'>{lecture.title}</p>
              <p>{lecture.course.title}</p>
            </div>
            <button className="border rounded hover:border-blue-400 hover:text-blue-400 h-8 text-sm px-4" onClick={handleComplete}>Mark As Complete</button>
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>{formatTimestamp(+(lecture?.createdAt))}</p>
          <div>
            <p className="text-xl font-mono">Assignments</p>
            {lecture?.assignment?.length > 0 ? lecture.assignment.map((item) =>
              <Link key={item.id} to={`/sassignment/${item.id}`}>
                <div className='border my-2 p-1 border-black dark:border-white rounded'><p>{item.content}</p><p>Deadline: {formatTimestamp(+item.deadline)}</p>
                </div>
              </Link>) : <p>No Assignment Available</p>}
          </div>
          <div>
            <div className="flex justify-between items-center ">
              <p className="text-xl font-mono">Discussions</p>
              <div>
              <button className="border rounded hover:border-blue-400 hover:text-blue-400 h-8 text-sm px-4" onClick={() => setOpen(true)}>Create Discussion</button>
                <Modal open={open} title="Create Discussion"
                  onCancel={handleCancel}
                  footer={(_, { CancelBtn }) => (
                    <>
                      <CancelBtn />
                      <Button onClick={handleSubmit}>Add</Button>
                    </>)}>
                  <div className="flex flex-col gap-4">
                    <Input type="text" placeholder="Issue" value={content} onChange={(e) => { setContent(e.target.value) }} />
                  </div>
                </Modal>
              </div>
            </div>

            {lecture?.discussion?.length > 0 ? lecture.discussion.map((item) =>
              <div className='border my-2 p-1 dark:border-white border-black rounded' key={item.id}><p>{item.content}</p></div>) : <p>No Discussion Available</p>}
          </div>

        </div>}
    </div>
  )
}

export { SingleLecture }