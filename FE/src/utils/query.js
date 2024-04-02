import { gql } from '@apollo/client';

export const GET_SINGLE_USER = gql`
    query SpecificUser {
      getSingleUser {
        _id
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
    courses {
      id
      title
      duration
      description
      users {
        _id
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
      _id
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
    _id
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
    _id
    username
    email
    password
    role
  }
}
`;
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
      completedBy
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