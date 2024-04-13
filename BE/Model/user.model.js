const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: String,
        email: String,
        password: String,
        avatar: String,
        role: {
            type: String,
            enum: ['Educator', 'Student'],
            default: "Student"
        },
        performance: Number,
        completedAssignments: [{ type: Schema.Types.ObjectId, ref: 'Assignment' }],
        completedLectures: [{ type: Schema.Types.ObjectId, ref: 'Lecture' }],
        courses: { type: [Schema.Types.ObjectId], ref: 'Course' },
        notifications: { type: [Schema.Types.ObjectId], ref: 'Notification' }
    }, { versionKey: false }
)

const UserModel = model('User', userSchema);
module.exports = UserModel;