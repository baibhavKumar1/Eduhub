import { useQuery } from "@apollo/client"
import Topbar from "./Topbar"
import { GET_SINGLE_COURSE } from "../../utils/query"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
const CourseLecture = () => {
  const { id } = useParams()
  const { loading,data } = useQuery(GET_SINGLE_COURSE, {
    variables: { id }
  })
  console.log(data);
  const [course, setCourse] = useState({});
  useEffect(() => {
    if(!loading)
    setCourse(data?.getSingleCourse)
  }, [data,loading])
  return (
    <div>
      <Topbar />
      {!loading && course?.title ? <div className="p-2">
        <p className="text-center text-2xl">{course.title}</p>
        <div className="space-y-4">
          <p className="text-xl font-mono">Lectures:</p>
          {course.lectures.length>0 ? course?.lectures.map((item) => {
            return (
              <div key={item.id} className="flex items-center border border-black rounded p-1 justify-between">
              <p>{item.title}</p>
              <p>Duration : {item.duration}</p>
              </div>)
          }): <p>No Lectures Yet</p>}
        </div>
      </div> : <p>Loading...</p>}
    </div>
  )
}

export default CourseLecture