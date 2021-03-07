import { BaseService } from "../base/base.service";
import { commentModel } from './comment.model';

export class CommentService extends BaseService{
    constructor () {
        super(commentModel);
    }

    async getListForComments (query, uid, lean, projection) {
        query = this._fullQuery(query);
        const model = this.model.find(query, projection);
        let result;
        const favorites = await commentFavoriteModel.find({ createdBy: uid, articleId: query.articleId });
        const favoritesKeyByComment = favorites.reduce((x, y) => {
            x[JSON.stringify(y._id)] = y;
            return x;
        }, {});
        if (lean) {
            result = await model.lean(true);
        } else {
            result = await model;
        }
        const uids = [];
        const comments = result.map(item => {
            const newItem = Object.assign({ isFavorited: !!favoritesKeyByComment[JSON.stringify(item._id)] }, item);
            if (item.createdBy) {
                uids.push(item.createdBy);
            }
            return newItem;
        });
        const users = await UserSchema.find({ uid: { $in: uids } }, 'uid realName');
        const userKeyByUid = users.reduce((x, y) => {
            x[y.uid] = y;
            return x;
        }, {});
        return this._cascaderForComments(comments, [], userKeyByUid);
    }

    _cascaderForComments (comments, result, userKeyByUid) {
        const topComments = comments.filter(item => item.isTop);
        const childrenComments = comments.filter(item => !item.isTop);
        const commentKeyById = comments.reduce((x, y) => {
            x[JSON.stringify(y._id)] = y;
            return x;
        }, {});
        const commentKeyByParent = childrenComments.reduce((x, y) => {
            const replyObj = Object.assign({}, y);
            replyObj.nilName = y.nilName || userKeyByUid[y.createdBy].username || userKeyByUid[y.createdBy].realName;
            replyObj.email = y.email || userKeyByUid[y.createdBy].email;
            if (y.reply && JSON.stringify(y.reply) !== JSON.stringify(y.parent)) {
                replyObj.target = {
                    content: commentKeyById[JSON.stringify(y.reply)].content,
                    nilName: commentKeyById[JSON.stringify(y.reply)].nilName || userKeyByUid[commentKeyById[JSON.stringify(y.reply)].createdBy].username || userKeyByUid[commentKeyById[JSON.stringify(y.reply)].createdBy].realName
                };
            }
            if (x[JSON.stringify(y.parent)]) {
                x[JSON.stringify(y.parent)].push(replyObj);
            } else {
                x[JSON.stringify(y.parent)] = [replyObj];
            }
            return x;
        }, {});
        for (let i = 0; i < topComments.length; i++) {
            const comment = Object.assign({ children: [] }, topComments[i]);
            comment.nilName = comment.nilName || userKeyByUid[comment.createdBy].username || userKeyByUid[comment.createdBy].realName;
            comment.email = comment.email || userKeyByUid[comment.createdBy].email;
            if (commentKeyByParent[JSON.stringify(comment._id)]) {
                comment.children = commentKeyByParent[JSON.stringify(comment._id)];
            }
            result.push(comment);
        }
        return result;
    }
}