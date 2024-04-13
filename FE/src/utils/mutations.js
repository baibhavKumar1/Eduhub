import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
        role
      }
    }
  }
`;

export const CREATE_USER = gql`
    mutation CreateUser($username: String!, $email: String!, $password: String!) {
      createUser(username: $username, email: $email, password: $password) {
        token
        user {
          id
          username
          email
          role
        }
      }
    }
`;
export const ADD_COURSE = gql`
    mutation AddCourse($courses: [ID!]!) {
        addCourse(courses: $courses) {
          id
          role
          courses
        }
    }
`;
export const COMPLETE_ASSIGNMENT= gql`
mutation CompleteAssignment($id: ID!) {
  completeAssignment(id: $id) {
    id
    lecture
    creator
    content
    deadline
    completedBy
  }
}
`
export const COMPLETE_LECTURE= gql`
mutation CompleteLecture($id: ID!) {
  completeLecture(id: $id) {
    id
    title
    creator
    url
    duration
    createdAt
  }
}
`
export const CREATE_LECTURE = gql`
    mutation CreateLecture($title: String!, $duration: String!, $url: String!, $course: ID!) {
      createLecture(title: $title, url: $url, duration: $duration, course: $course) {
        id
        title
        creator
        url
        duration
        createdAt
        completedBy
      }
    }
`;
export const UPDATE_LECTURE = gql`
    mutation UpdateLecture($title: String, $duration: String, $url: String, $id: ID!) {
      updateLecture(title: $title, url: $url, duration: $duration, id:$id) {
        id
        title
        creator
        course
        url
        duration
        createdAt
        completedBy
      }
    }
`;
export const DELETE_LECTURE = gql`
    mutation DeleteLecture($id: ID!) {
      deleteLecture(id:$id) {
        message
      }
    }
`;
export const CREATE_ASSIGNMENT = gql`
mutation CreateAssignment($lecture: ID!, $content: String!, $deadline: String!) {
  createAssignment(content: $content, deadline: $deadline, lecture: $lecture) {
    id
    lecture
    creator
    content
    deadline
    completedBy
  }
}`;
export const UPDATE_ASSIGNMENT = gql`
mutation UpdateAssignment($id: ID!, $content: String, $deadline: String) {
  updateAssignment(content: $content, deadline: $deadline, id: $id) {
    id
    lecture
    creator
    content
    deadline
    completedBy
  }
}`;
export const DELETE_ASSIGNMENT = gql`
mutation DeleteAssignment($id: ID!) {
  deleteAssignment(id: $id) {
    message
  }
}`;
export const CREATE_DISCUSSION = gql`
mutation CreateDiscussion($content: String!, $id: ID!) {
  createDiscussion(content: $content, id: $id) {
    id
    lecture
    creator
    content
  }
}`;
export const UPDATE_DISCUSSION = gql`
mutation UpdateAssignment($id: ID!, $content: String) {
  updateAssignment(content: $content, id: $id) {
    id
    lecture
    creator
    content
  }
}`;
export const DELETE_DISCUSSION = gql`
mutation DeleteDiscussion($id: ID!) {
  deleteDiscussion(id: $id) {
    message
  }
}`;

export const CREATE_COURSE= gql`
mutation CreateCourse($title: String!, $description: String!, $duration: String!) {
  createCourse(title: $title, description: $description, duration: $duration) {
    id
    title
    duration
    description
  }
}`
export const UPDATE_COURSE= gql`
mutation UpdateCourse($id: ID!, $duration: String, $title: String, $description: String) {
  updateCourse(id: $id, duration: $duration, title: $title, description: $description) {
    id
    title
    duration
    description
  }
}`
export const DELETE_COURSE = gql`
mutation DeleteCourse($id: ID!) {
  deleteCourse(id: $id) {
    message
  }
}`;

export const EDIT_PROFILE= gql`
mutation EditProfile{
  editProfile{
    name
  }
}`