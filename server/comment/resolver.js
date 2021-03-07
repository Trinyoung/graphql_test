import { CommentQueryService, CommentMutationService } from './service';
// const commentService = new CommentService();
export const commentQueryResolvers = new CommentQueryService();
export const commentMutationResolvers = new CommentMutationService();