import { Schema, Types, model } from 'mongoose';
const commentFavoriteSchema = new Schema({
    createdAt: { type: Number, required: true },
    commentId: { type: Types.ObjectId },
    createdBy: { type: String },
    is_deleted: { type: Number, required: true, default: 0 }
});
export const commentFavoriteModel = model('comment', commentFavoriteSchema);