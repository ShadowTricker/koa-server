import * as Router from 'koa-router';

import readFile from '../lib/read-file';

const router = new Router();

router.get('/', async (ctx) => {
    const dataList = await readFile('./assets/data/data.json');
    ctx.body = {
        status: 'SUCCESS',
        data: JSON.parse(dataList.toString()),
        error: null
    };
});

export default router.routes();