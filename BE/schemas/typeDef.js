const { gql } = require('apollo-server-express');


const typeDefs = gql`
type User {
  _id: ID!
  username:String!
  email: String!
  password: String!
  role:String!
}

type Course {
    id:ID!
   title:String!
   duration:String
   description:String!
   lectures:[Lecture]
   users:[User!]
}

type Lecture {
    id: ID!
    title: String!
    creator: ID!
    course: Course
    url: String!
    duration: String!
    createdAt: String!
    assignment: [Assignment]
    discussion: [Discussion]
    completedBy: [ID!]!
  }
  
  type Discussion{
    id:ID
    lecture:String!
    creator:String!
    content:String
  }
  type Assignment{
    id:ID
    lecture:String!
    creator:String!
    content:String!
    deadline:String!
    completedBy:[String!]
  }
type Auth {
  token: ID!
  user: User
} 

type UserData {
  courses:[Course]
  lectures:[Lecture]
  assignments:[Assignment]
  discussions:[Discussion]
}
type Message {
  message:String!
}
type Query {
  getSingleUser: User
  getSingleLecture(id:ID!):Lecture
  getAllCourses: [Course]!
  getStudents: [User]!
  getEducators: [User]!
  getSingleAssignment:Assignment
  getSingleDiscussion:Discussion
  getUserData:UserData
}

type Mutation {
  createUser(username:String!,email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth 
  addCourse(courses:[ID!]!):[Course]
  createCourse(title:String!,duration:String!,description:String!):Course
  updateCourse(id:ID!,title:String,duration:String,description:String):Course
  deleteCourse(id:ID!):Message
  createLecture(title:String!, url:String!, duration:String!,course:ID! ):Lecture
  updateLecture(url:String,duration:String,id:ID!,title:String):Lecture
  deleteLecture(id:ID!):Message
  createAssignment(content:String!, deadline:String!,lecture:ID!):Assignment
  updateAssignment(content:String, deadline:String,id:ID!):Assignment
  deleteAssignment(id:ID!):Message
  createDiscussion(content:String!,id:ID!):Discussion
  updateDiscussion(content:String,id:ID!):Discussion
  deleteDiscussion(id:ID!):Message  
  completeAssignment(id:ID!):Assignment
  completeLecture(id:ID!):Lecture
}
`;

module.exports = typeDefs;