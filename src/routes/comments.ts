import * as Router from 'koa-router';

import readFile from '../lib/read-file';

const router = new Router();

router.get('/', async ctx => {
    const commentList = await readFile('./assets/data/comment-list.json');

    ctx.body = {
        status: 'SUCCESS',
        data: JSON.parse(commentList.toString()),
        error: null
    };
});

export default router.routes();