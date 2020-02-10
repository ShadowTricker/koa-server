import { Comment } from './comment.model';

export interface CommentItem {
    articleId: number,
    comments: Comment[]
}