import Topbar from "./Topbar"
import { useEffect, useState } from 'react'
import CourseChooser from "../../Components/CourseChooser";
import Sidebar from "./Sidebar";
import { GET_USER_DATA } from "../../utils/query";
import { useQuery } from "@apollo/client";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { Table } from 'antd';
const dataSet = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  }
]
const columns = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
  },
  {
    title: 'Column 5',
    dataIndex: 'address',
    key: '5',
  },
  {
    title: 'Action',
    key: 'operation',
    width: 100,
    fixed:'right'
  },
];
const dataTable = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  },
  {
    key:'3',
    name:'Joe Rogan',
    age: 56,
    address: 'Manhattan'
  }
];
const Dashboard = () => {
  const { data } = useQuery(GET_USER_DATA);
  const [loggedIn, setLoggedIn] = useState(true);
  console.log(data?.getUserData?.courses);
  useEffect(() => {
    if (data?.getUserData?.courses) {
      setLoggedIn(data?.getUserData?.courses.length >= 3);
    }
  }, [data?.getUserData?.courses]);

  return (
    <div className="h-screen flex flex-col ">
      <Topbar />
      {loggedIn === false ?
        <CourseChooser setLoggedIn={setLoggedIn} /> :

        <div className="flex-1 flex justify-between *:p-2 dark:bg-black dark:text-white">
          <Sidebar />
          <div className="border-r flex-1">
          <div className="w-[800px] m-auto"><Table
              columns={columns}
              dataSource={dataTable}
              scroll={{
                x: 1300,
              }}
            /></div>
            <LineChart width={730} height={250} data={dataSet}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
            
          </div>
          <div className="w-1/5">
            <p className="text-2xl text-center">Recent Updates</p>
            <div>
              <p className="border rounded  p-1 my-2">New lecture created in DSA201</p>
              <p className="border rounded  p-1 my-2">New lecture created in DSA201</p>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export { Dashboard }