import Topbar from "./Topbar"

const CourseLecture = () => {
  return (
    <div>
        <Topbar/>
        <div></div>
        <div className="p-2">
            <p className="text-center text-2xl">MERN101</p>
            <div>
                <p className="text-xl font-mono">Lectures:</p>
                <div></div>
            </div>
        </div>
    </div>
  )
}

export default CourseLecture