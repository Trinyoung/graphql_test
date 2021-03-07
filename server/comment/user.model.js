import { Schema, model } from 'mongoose';
const UserSchema = new Schema({
    username: { type: String, required: true },
    realName: { type: String },
    password: { type: String, required: true },
    birthday: { type: Number },
    gender: { type: String, enum: [0, 1, 2], default: 0 }, // 0 未知， 1-男， 2：
    createdAt: { type: Number, default: moment().unix() },
    updatedAt: { type: Number, default: moment().unix() },
    uid: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, requried: true, unique: true },
    is_deleted: { type: Number, enum: [0, 1], required: true, default: 0 }
});
export const UserModel = model('user', UserSchema);