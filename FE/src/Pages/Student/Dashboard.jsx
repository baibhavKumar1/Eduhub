import Topbar from "./Topbar"

const Dashboard = () => {
    return (
        <div>
            <Topbar/>
            <div className="flex">
            <div className="w-4/5 border-r " >
            <div>
              <p className="text-2xl">Upcoming Lectures</p>
              <div className="h-max border p-2 flex flex-col gap-2">
              <div className="border">
              <p>Title: Lecture 1</p>
              <div className="flex justify-between"><p>John doe</p><p>Uploaded at: 12th March 2024</p></div>
              </div>
              <div>
              <p>Title: Lecture 2</p>
              <div className="flex justify-between"><p>John doe</p><p>Uploaded at: 12th March 2024</p></div>
              </div>
              <div>
              <p>Title: Lecture 3</p>
              <div className="flex justify-between"><p>John doe</p><p>Uploaded at: 12th March 2024</p></div>
              </div>
              </div>
            </div>
            <div>
                <p className="text-2xl">Pending Assignments</p>
                <div className="h-max border p-2 flex flex-col gap-2">
                <div className="border">
                    <p>Title: Assignment 1</p>
                    <div className="flex justify-between"><p>John doe</p><p>Uploaded at: 12th March 2024</p></div>
                </div>
                <div className="border">
                    <p>Title: Assignment 1</p>
                    <div className="flex justify-between"><p>John doe</p><p>Uploaded at: 12th March 2024</p></div>
                </div>
                <div className="border">
                    <p>Title: Assignment 1</p>
                    <div className="flex justify-between"><p>John doe</p><p>Uploaded at: 12th March 2024</p></div>
                </div>
                </div>
            </div>
            </div>
            <div className="w-1/5">
                <p className="text-2xl text-center">Recent Updates</p>
            </div>
                
            </div>
        </div>
    )
}

export { Dashboard }