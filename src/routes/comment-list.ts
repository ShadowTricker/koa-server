import * as Router from 'koa-router';

import readFile from '../lib/read-file';
import { CommentItem } from '../models/comment-data.model';

const router = new Router();

router.post('/', async ctx => {
    const commentListBuffer = await readFile('./assets/data/comment-list.json');
    const commentList = JSON.parse(commentListBuffer.toString());
    const { articleId } = ctx.request.body;
    const filtedCommentList = commentList.find((item: CommentItem) => item.articleId === +articleId).comments;

    ctx.body = {
        status: 'SUCCESS',
        data: filtedCommentList,
        error: null
    };
});

export default router.routes();