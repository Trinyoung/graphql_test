// import {gql} from 'apollo-server-express';
export const commentTypeDef = `{
    nilName: String,
    email: String,
    favoriteNum: Int,
    reply: String,
    parent: String,
    isTop: Int,
    createdAt: Int,
    articleId: String,
    authorUid: String,
    createdBy: String,
    is_deleted: Int
}`
// nilName: { type: String },
// email: { type: String },
// favoriteNum: { type: Number, default: 0 },
// content: { type: String, required: true },
// reply: { type: Types.ObjectId },
// parent: { type: Types.ObjectId },
// isTop: { type: Number, enum: [0, 1], default: 1 },
// createdAt: { type: Number, required: true },
// articleId: { type: Types.ObjectId, required: true },
// authorUid: { type: String, required: true }, // 文章作者的uid
// createdBy: { type: String },
// is_deleted: { type: Number, required: true, default: 0 }