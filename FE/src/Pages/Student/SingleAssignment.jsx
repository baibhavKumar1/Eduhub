import { Button } from "antd"
import Topbar from "./Topbar"


const SingleAssignment = () => {
  return (
    <div>
      <Topbar/>
      <div>
        <p>Assignment</p>
        <p>Deadline</p>
        <Button>Complete</Button>
      </div>
    </div>
  )
}

export {SingleAssignment}