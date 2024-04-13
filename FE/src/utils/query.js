import { gql } from '@apollo/client';

export const GET_SINGLE_USER = gql`
    query SpecificUser {
      getSingleUser {
        id
        username
        email
        password
        role
      }
    }
`;

export const GET_USER_DATA = gql`
query GetUserData {
  getUserData {
    user{
      id
    }
    courses {
      id
      title
      duration
      description
      users {
        id
        username
        email
        password
        role
      }
    }
    lectures {
      id
      title
      creator
      course {
        id
        title
      }
      url
      duration
      createdAt
      completedBy
    }
    assignments {
      id
      lecture
      creator
      content
      deadline
      completedBy
    }
    discussions {
      id
      lecture
      creator
      content
    }
  }
}`
export const GET_COURSES = gql`
query GetAllCourses {
  getAllCourses {
    id
    title
    duration
    description
    lectures {
      id
      title
      creator
      url
      duration
      createdAt
      completedBy
    }
    users {
      id
      username
      email
      password
      role
    }
  }
}`
export const GET_STUDENTS = gql`
query GetStudents {
  getStudents {
    id
    username
    email
    password
    role
  }
}
`;
export const GET_EDUCATORS = gql`
query GetEducators {
  getEducators {
    id
    username
    email
    password
    role
  }
}
`;
export const GET_SINGLE_COURSE = gql`
query GetSingleCourse($id: ID!) {
  getSingleCourse(id: $id) {
    id
    title
    duration
    description
    lectures {
      id
      title
      creator
      url
      duration
      createdAt
    }
  }
}
`
export const GET_SINGLE_LECTURE = gql`
query GetSingleLecture($id: ID!) {
  getSingleLecture(id: $id) {
    id
    title
    creator
    course {
      title
    }
    url
    duration
    createdAt
    completedBy
    assignment {
      id
      lecture
      creator
      content
      deadline
      completedBy
    }
    discussion {
      id
      lecture
      creator
      content
    }
  }
}
`
export const GET_SINGLE_ASSIGNMENT = gql`
query GetSingleAssignment($id: ID!) {
  getSingleAssignment(id: $id) {
      id
      lecture
      creator
      content
      deadline
  }
}
`
export const GET_SINGLE_DISCUSSION = gql`
query GetSingleDiscussion($id: ID!) {
  getSingleDiscussion(id: $id) {
      id
      lecture
      creator
      content
  }
}
`

export const GET_EDUCATORS_TASK= gql`
query GetEducatorsTasks {
  getEducatorsTasks {
    user {
      id
      username
    }
    allLectures {
      educator
      lecture
      title
    }
    allAssignments {
      educator
      lecture
      assignment
      title
    }
  }
}`

export const GET_STUDENTS_TASK = gql`
query GetStudentsTasks {
  getStudentsTasks {
    id
    username
    email
    password
    role
    completedAssignments {
      id
      lecture
      creator
      content
      deadline
      completedBy
    }
    completedLectures {
      id
      title
      creator
      url
      duration
      createdAt
      completedBy
    }
  }
}`