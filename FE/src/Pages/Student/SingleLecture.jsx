import Topbar from "./Topbar"


const SingleLecture = () => {
  return (
    <div>
    <Topbar/>
    <div>
      <p className="text-2xl">Lecture 1</p>
      <p>Course</p>
      <p>URL</p>
      <p>Discussions</p>
      <div className="border">
        <p>Why does this exist</p>
        <p>Johny</p>
      </div>
      <p>

      </p>
      <div>
        <p className="text-2xl">Assignments</p>
        <div>
          <p>Task</p>
          <p>Deadline</p>
        </div>
      </div>

    </div>
    </div>
  )
}

export default SingleLecture