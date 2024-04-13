const { signToken } = require('../Middleware/auth.middleware');
const AssignmentModel = require('../Model/assignment.model');
const CourseModel = require('../Model/course.model');
const DiscussionModel = require('../Model/discussion.model');
const LectureModel = require('../Model/lecture.model');
const UserModel = require('../Model/user.model');
const { io } = require("socket.io-client");
const { AuthenticationError } = require('apollo-server-express');
//const { connectRabbitMQ } = require('../utils/rabbitmq');
const { client } = require('../redis');

//const channel = connectRabbitMQ()
const socket = io.connect("http://localhost:3000");
const resolvers = {

  Query: {
    getSingleUser: async (_, __, req) => {
      try {
        // const cachedUser = await client.get(`SingleUserId ${req.user._id}`);
        // if (cachedUser) {
        //   console.log("User retrieved from cache");
        //   return JSON.parse(cachedUser);
        // } else {
        const user = await UserModel.findById(req.user._id).populate('courses')
        // await client.set(`SingleUserId ${req.user._id}`, JSON.stringify(user));
        // console.log("User saved to cache");
        return user
        //}
      } catch (err) {
        console.log(err);
        return err.message
      }
    },
    getUserData: async (_, __, req) => {
      try {
        console.log(req.user._id);
        // const cachedUserData = await client.get(`UserData ${req.user._id}`);
        // if (cachedUserData) {
        //   console.log("User retrieved from cache");
        //   return JSON.parse(cachedUserData);
        // } else {
          const user = await UserModel.findById(req.user._id).populate({
            path: 'courses',
            populate: [{
              path: 'lectures',
              populate: [
                { path: 'assignment', model: 'Assignment' },
                { path: 'discussion', model: 'Discussion' },
                { path: 'course', model: 'Course' }
              ]
            }, { path: 'users', model: 'User' }]
          }).exec();
          let courses = []; let lectures = []; let assignments = []; let discussions = []; 
          for (let course of user.courses) {
            courses.push(course)
            for (let lecture of course.lectures) {
              lectures.push(lecture)
              for (let assignment of lecture.assignment) {
                assignments.push(assignment)
              }
              for (let discussion of lecture.discussion) {
                discussions.push(discussion)
              }
            }
          }
          // await client.set(`UserData ${req.user._id}`, JSON.stringify({ user, courses, lectures, assignments, discussions }));
          // console.log("User saved to cache");
          return { user, courses, lectures, assignments, discussions }
        
      } catch (err) {
        console.log(err);
      }
    },
    getAllCourses: async (_, __) => {
      // const cachedCourses = await client.get("courses");
      // if (cachedCourses) {
      //   console.log("Courses retrieved from cache",JSON.parse(cachedCourses));
      //   return JSON.parse(cachedCourses);
      // } else {
      const newCourses = await CourseModel.find().populate(['lectures', 'users']).exec();
      // await client.set("courses", JSON.stringify(newCourses));
      // console.log("Courses saved to cache");
      return newCourses;

    },
    getStudents: async (_, __) => {
      return await UserModel.find({ role: "Student" })
    },
    getEducatorsTasks: async (_, __) => {
      try {
        const educators = await UserModel.find({ role: "Educator" }).populate({
          path: 'courses',
          populate: [{
            path: 'lectures',
            populate: [
              { path: 'assignment', model: 'Assignment' }
            ]
          }]
        }).exec();
        const allLectures = [];
        const allAssignments = [];

        for (const educator of educators) {
          for (const course of educator.courses) {
            if (course?.lectures?.length > 0) {
              for (const lecture of course.lectures) {
                allLectures.push({
                  educator: educator._id,
                  lecture: lecture._id,
                  title: lecture.title,
                });
                if (lecture.assignment.length > 0) {
                  for (const assignment of lecture.assignment) {
                    allAssignments.push({
                      educator: educator._id,
                      lecture: lecture._id,
                      assignment: assignment._id,
                      title: assignment.content,
                    });
                  }
                }
              }
            }
          }
        }
        console.log(educators, allLectures, allAssignments);

        return { user: educators, allLectures, allAssignments };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch educators' tasks.");
      }
    },
    getEducators: async (_, __) => {
      return await UserModel.find({ role: "Educator" })
    },
    getSingleCourse: async (_, { id }) => {
      try {
        const course = await CourseModel.findById(id).populate('lectures').exec();
        if (!course) {
          throw new Error('Assignment not found');
        }
        return course
      } catch (err) {
        console.error(err);
        throw new Error('Internal server error');
      }
    },
    getSingleAssignment: async (_, { id }) => {
      try {
        const assignment = await AssignmentModel.findById(id).populate('completedBy').exec();
        if (!assignment) {
          throw new Error('Assignment not found');
        }
        return assignment
      } catch (err) {
        console.error(err);
        throw new Error('Internal server error');
      }
    },
    getSingleLecture: async (_, { id }) => {
      return await LectureModel.findById(id).populate(['assignment', 'discussion', 'course']).exec()
    },
    getSingleDiscussion: async (_, { id }) => {
      return await DiscussionModel.findById(id)
    },
    getStudentsTasks: async (_, __) => {
      try {
        const userData = await UserModel.find()
            .populate(['completedAssignments','completedLectures'])
            .exec();;
        console.log(userData);
        return userData
      } catch (error) {
        console.error(error);
        return new Error(error)
      }
    },
  },
    Mutation: {

      createUser: async (_, args, req) => {
        const userExists = await UserModel.findOne({ email: args.email });
        if (userExists) {
          throw new AuthenticationError('User with that email already exists!');
        }
        if (req?.user) {
          const admin = await UserModel.findById(req.user._id);
          if (admin && admin.role === "Admin") {
            const user = await UserModel({ ...args, role: "Educator" });
            await user.save()
            const token = signToken(user);
            return { token, user };
          }
        } else {
          const user = await UserModel({ ...args });
          await user.save()
          const token = signToken(user);
          return { token, user };
        }
      },
      login: async (_, { email, password }) => {

        const user = await UserModel.findOne({ email });
        if (!user) {
          throw new AuthenticationError('No user found with that email!');
        }

        if (password !== user.password) {
          throw new AuthenticationError('Your password is incorrect!');
        }

        const token = signToken(user);
        return { token, user };
      },
      addCourse: async (_, { courses }, req) => {
        try {
          console.log("hio");
          const user = await UserModel.findById(req.user._id);
          if (!user) {
            throw new Error("User Not Found")
          }
          if (user.courses.length > 0) {
            throw new Error("Course already decided");
          }
          else {
            const update = await UserModel.findByIdAndUpdate(req.user._id, { courses }, { new: true });
            if (user.role === "Student") {
              for (let course of courses) {
                await CourseModel.findByIdAndUpdate(course, { $push: { users: user._id } }, { new: true })
              }
            }
            return update
          }
        } catch (err) {
          console.log(err.message);
        }
      },
      createLecture: async (_, { title, url, duration, course }, req) => {
        try {
          const userData = await UserModel.findById(req.user._id);
          if (!userData || userData.role === "Student") {
            throw new AuthenticationError('Not Authorized');
          }
          const lecture = new LectureModel({
            title, url, duration, course, creator: req.user._id
          });
          await lecture.save();
          await CourseModel.findByIdAndUpdate(course, { $push: { lectures: lecture._id } }, { new: true });
          //(await channel).assertQueue('create-lecture');
          //(await channel).sendToQueue('create-lecture', Buffer.from(JSON.stringify(lecture)));
          socket.emit("newLecture", lecture);
          return lecture;
        } catch (err) {
          console.error(err);
          throw new Error(err.message);
        }
      },
      updateLecture: async (_, args, req) => {
        try {
          const userData = await UserModel.findById(req.user._id);
          if (!userData || userData.role === "Student") {
            throw new AuthenticationError('Not Authorized');
          }
          const lecture = await LectureModel.findByIdAndUpdate(args.id, { ...args }, { new: true });
          await lecture.save();
          return lecture;
        } catch (err) {
          console.error(err);
          throw new Error(err.message);
        }
      },
      deleteLecture: async (_, { id }, req) => {
        try {
          const userData = await UserModel.findById(req.user._id);
          if (!userData || userData.role === "Student") {
            throw new AuthenticationError('Not Authorized');
          }
          const lecture = await LectureModel.findById(id);
          await CourseModel.findByIdAndUpdate(lecture.course, { $pull: { lectures: lecture._id } }, { new: true })
          await DiscussionModel.deleteMany({ lecture: lecture })
          await AssignmentModel.deleteMany({ lecture: lecture })
          await LectureModel.findByIdAndDelete(id);
          return { message: "Deleted" };
        } catch (err) {
          console.error(err);
          throw new Error(err.message);
        }
      },
      createAssignment: async (_, { lecture, content, deadline }, req) => {
        try {
          const userData = await UserModel.findById(req.user._id);
          if (!userData || userData.role === "Student") {
            throw new AuthenticationError('Not Authorized');
          }
          const assignment = new AssignmentModel({
            lecture, content, creator: req.user._id, deadline
          });
          const newLecture = await LectureModel.findById(lecture);
          newLecture.assignment.push(assignment._id);
          await Promise.all([assignment.save(), newLecture.save()]);
          socket.emit("newAssignment", assignment);
          //(await channel).assertQueue('create-assignment');
          //(await channel).sendToQueue('create-assignment', Buffer.from(JSON.stringify(lecture)));
          return assignment;
        } catch (err) {
          console.error(err);
          throw new Error(err.message);
        }
      },
      deleteAssignment: async (_, { id }, req) => {
        try {
          const userData = await UserModel.findById(req.user._id);
          const assignment = await AssignmentModel.findById(id);
          if (!userData || userData._id === assignment.creator) {
            throw new AuthenticationError('Not Authorized');
          }
          await AssignmentModel.findByIdAndDelete(id);
          await LectureModel.findByIdAndUpdate(assignment.lecture, { $pull: { assignment: assignment._id } }, { new: true })
          return { message: "Deleted" };
        } catch (err) {
          console.error(err);
          throw new Error(err.message);
        }
      },
      updateAssignment: async (_, args, req) => {
        try {
          const userData = await UserModel.findById(req.user._id);
          const assignment = await AssignmentModel.findById(args.id);
          if (!userData || userData._id === assignment.creator) {
            throw new AuthenticationError('Not Authorized');
          }
          const update = await AssignmentModel.findByIdAndUpdate(args.id, { ...args }, { new: true });
          return update;
        } catch (err) {
          console.error(err);
          throw new Error(err.message);
        }
      },
      createDiscussion: async (_, { id, content }, req) => {
        try {
          const userData = await UserModel.findById(req.user._id);
          if (!userData) {
            throw new AuthenticationError('User not found');
          }
          const discussion = new DiscussionModel({
            lecture: id, content, creator: req.user._id
          });
          const lecture = await LectureModel.findById(id);
          console.log(lecture);
          lecture.discussion.push(discussion._id);
          await Promise.all([discussion.save(), lecture.save()]);
          return discussion;
        } catch (err) {
          console.error(err);
          throw new Error('Internal server error');
        }
      },
      updateDiscussion: async (_, { id, content }, req) => {
        try {
          const discussion = await DiscussionModel.findById(id);
          if (!discussion) {
            throw new AuthenticationError('Discussion not found');
          }
          const newDiscussion = await DiscussionModel.findByIdAndUpdate(id, { content }, { new: true });
          await newDiscussion.save()
          return newDiscussioniscussion;
        } catch (err) {
          console.error(err);
          throw new Error('Internal server error');
        }
      },
      deleteDiscussion: async (_, { id }, req) => {
        try {
          const user = await UserModel.findById(req.user._id);
          const discussion = await DiscussionModel.findById(id);
          console.log(id, discussion.creator);
          if (discussion.creator === req.user._id || user.role == "Educator") {
            await DiscussionModel.findByIdAndDelete(id);
            return { message: "Deleted" };
          } else {
            return { message: "Not Authorised" };
          }
        } catch (err) {
          console.error(err);
          throw new Error('Internal server error');
        }
      },
      deleteCourse: async (_, { id }, req) => {
        try {
          const user = await UserModel.findById(req.user._id)
          if (!user || user.role !== "Admin") {
            return new Error("User not authorised");
          }
          else {
            const course = await CourseModel.findByIdAndDelete(id)
            return { message: "Deleted" };
          }
        } catch (err) {
          console.log(err.message);
          return err.message
        }
      },
      updateCourse: async (_, args, req) => {
        try {
          const user = await UserModel.findById(req.user._id)
          if (!user || user.role !== "Admin") {
            return new Error("User not authorised");
          }
          else {
            const course = await CourseModel.findByIdAndUpdate(args.id, { ...args }, { new: true })
            await course.save();
            return course
          }
        } catch (err) {
          console.log(err.message);
          return err.message
        }
      },
      createCourse: async (_, { title, duration, description }, req) => {
        try {
          const user = await UserModel.findById(req.user._id)
          if (!user || user.role !== "Admin") {
            return new Error("User not authorised");
          }
          else {
            const course = await CourseModel({ title, description, duration });
            await course.save();
            await user.courses.push(course._id)
            return course
          }
        } catch (err) {
          console.log(err.message);
          return err.message
        }
      },
      completeAssignment: async (_, { id }, req) => {
        try {
          const assignment = await AssignmentModel.findByIdAndUpdate(
            id,
            { $push: { completedBy: req.user._id } },
            { new: true } 
          );
          await UserModel.findByIdAndUpdate(
            req.user._id,
            { $push: { completedAssignments: assignment._id } }
        );
          return assignment;
        } catch (error) {
          console.error('Error completing assignment:', error);
          throw new Error('Internal server error');
        }
      },
      completeLecture: async (_, { id }, req) => {
        try {
          // Update lecture with completion details 
          const lecture = await LectureModel.findByIdAndUpdate(
            id,
            { $push: { completedBy: req.user._id } },
            { new: true }
          );
          await UserModel.findByIdAndUpdate(
            req.user._id,
            { $push: { completedLectures: lecture._id } }
        );
          return lecture;
        } catch (error) {
          console.error('Error completing lecture:', error);
          throw new Error('Internal server error');
        }
      }
    }
  };


  module.exports = resolvers;
