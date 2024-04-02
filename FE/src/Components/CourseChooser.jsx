/* eslint-disable react/prop-types */
import { Button } from "antd";
import { useState } from 'react'
import { useMutation, useQuery } from "@apollo/client";
import { ADD_COURSE } from "../utils/mutations";
import { GET_COURSES, GET_SINGLE_USER } from "../utils/query";

const CourseChooser = ({setLoggedIn}) => {
    
    const {data:courseData,refetch} = useQuery(GET_COURSES)
    const {data:userData} = useQuery(GET_SINGLE_USER)
    const [addCourse] = useMutation(ADD_COURSE,{onCompleted:()=>refetch()})
    //console.log(data?.getAllCourses);
    
    const [selectedOptions, setSelectedOptions] = useState(userData?.getSingleUser.courses);

    console.log(userData?.getSingleUser?.courses,courseData?.getAllCourses);
  const handleOptionClick = (option) => {
    if (selectedOptions?.includes(option)) {
      setSelectedOptions(selectedOptions?.filter((selectedOption) => selectedOption !== option));
    } else if (selectedOptions?.length < 3) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSubmit = async () => { 
    console.log(selectedOptions);
    try {
      const mutationResponse = await addCourse({
        variables: {
          courses: selectedOptions
        }
      })
      if (mutationResponse) {
        console.log(mutationResponse);
      setLoggedIn(true)
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex flex-col items-center p-8">
          <p className="text-2xl">Choose your courses (upto 3)</p>
          <div className="flex flex-wrap justify-center *:w-[200px] *:h-[200px] gap-4 m-10">
            {courseData?.getAllCourses.map((option) => (
              <div
                key={option.id}
                className={`p-4 border cursor-pointer ${selectedOptions?.includes(option.id) ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => handleOptionClick(option.id)}
                style={{ pointerEvents: selectedOptions?.length === 3 && !selectedOptions.includes(option.id) ? 'none' : 'auto' }}
              >
                <p>{option.title}</p>
                <p>{option.description}</p>
                <p>{option.duration}</p>
              </div>
            ))}
          </div>
          <Button disabled={selectedOptions?.length < 3} className="bg-blue-500 text-white rounded w-max" onClick={handleSubmit}>
            Print Selected Options
          </Button>
        </div>
  )
}

export default CourseChooser