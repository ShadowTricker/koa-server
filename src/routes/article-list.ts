import * as Router from 'koa-router';

import readFile from '../lib/read-file';

const router = new Router();

router.get('/', async (ctx) => {
    const articleList = await readFile('./assets/data/article-list.json');
    console.log('get article list');
    ctx.body = {
        status: 'SUCCESS',
        data: JSON.parse(articleList.toString()),
        error: null
    };
});

export default router.routes();