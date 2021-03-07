import { commentMutationResolvers, commentQueryResolvers } from './comment/resolver';
import {} from './comment/comment.type';
export const resolvers = {
    Query: {
        commentQueryResolvers
    },
    Mutation: {
        commentMutationResolvers
    }
}