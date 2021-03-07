const { Schema, Types, model } = require('mongoose');
const articleSchema = new Schema({
    title: String,
    type: { type: Types.ObjectId, ref: 'articleType' },
    category: { type: Number, enum: [1, 2, 3] }, // 1 代表单篇幅文章， 2 代表系列文章
    published: { type: Number, enum: [0, 1], default: 0 }, // 0- 未发布，1-已发布
    isPublic: { type: Number, enum: [0, 1] }, // 是否公开
    refers: [{ title: String, link: String }],
    tags: [{ type: Types.ObjectId, ref: 'tag' }],
    is_deleted: { type: Number, default: 0 },
    hasReads: { type: Number, default: 0 },
    favoriteNums: { type: Number, default: 0 },
    isMarkdown: { type: Number, enum: [0, 1], default: 1 },
    subtitle: String,
    content: String,
    abstract: String,
    content_html: String,
    createdAt: Number,
    updatedAt: Number,
    createdBy: { type: String }, // uid
    updatedBy: { type: String },
    sourceUrl: String
});
exports.articleModel = model('article', articleSchema);