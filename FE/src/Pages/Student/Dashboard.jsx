import Topbar from "./Topbar"
import { useState } from 'react'
import CourseChooser from "../../Components/CourseChooser";
import { useQuery } from "@apollo/client";
import { GET_USER_DATA } from "../../utils/query";
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
    const { data } = useQuery(GET_USER_DATA)
    const [loggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate();
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const suffixes = ['st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st'];
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const formattedDay = `${day}${suffixes[day - 1]}`;
        const formattedDate = `${formattedDay} ${months[monthIndex]}, ${year}`;
        return formattedDate;
    }
    return (
        <div>
            <Topbar />
            {(loggedIn === false) && (data?.getUserData?.courses?.length < 3) ?
                <CourseChooser setLoggedIn={setLoggedIn} /> :
                <div className="flex">
                    <div className="w-4/5 border-r " >
                        <div>
                            <p className="text-2xl">Upcoming Lectures</p>
                            <div className="h-max border p-2 flex flex-col gap-2">
                                {data?.getUserData.lectures.length > 0 ? (
                                    data?.getUserData.lectures
                                        .map((item) => (
                                            <div className="" key={item.id} onClick={() => navigate(`/slecture/${item.id}`)}>
                                                <p>Title: {item.title}</p>
                                                <div className="flex justify-between">
                                                    <p>John doe</p>
                                                    <p>Uploaded at: {formatTimestamp(+item.createdAt)}</p>
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <p>No Lectures Available</p>
                                )}
                            </div>
                            {/* <Collapse collapsible="icon" accordion items={collapseValue} /> */}
                        </div>
                        <div>
                            <p className="text-2xl">Pending Assignments</p>
                            <div className="h-max border p-2 flex flex-col gap-2">
                                {data?.getUserData?.assignments?.length > 0 && data?.getUserData?.assignments.map((item) => {
                                    return (
                                        <div className="border" key={item.id}>
                                            <p>Title: {item.content}</p>
                                            <div className="flex justify-between"><p>John doe</p><p>Ends in: {item.deadline}</p></div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="w-1/5">
                        <p className="text-2xl text-center">Recent Updates</p>
                    </div>

                </div>
            }
        </div>
    )
}

export { Dashboard }