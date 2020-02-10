import * as Router from 'koa-router';

import readFile from '../lib/read-file';
import writeFile from '../lib/write-file';

const router = new Router();

router.post('/add', async (ctx) => {
    const articleBuffer = await readFile('./assets/data/article-list.json');
    const articleList = JSON.parse(articleBuffer.toString());
    const { author, title, content } = ctx.request.body;
    const nowDate = new Date();
    const updateTime = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1 < 10 ? `0${ nowDate.getMonth() + 1 }`: nowDate.getMonth() + 1,
        date: nowDate.getDate() < 10 ? `0${ nowDate.getDate() }` : nowDate.getDate(),
    };
    articleList.push({
        articleId: articleList.length + 1,
        commentsLength: 0,
        updateTime: `${ updateTime.year }-${ updateTime.month }-${ updateTime.date }`,
        author,
        title,
        content,
    });

    const writeStatus: any = await writeFile(
        './assets/data/article-list.json',
        JSON.stringify(articleList)
    );
    if (writeStatus.status === 'SUCCESS') {
        ctx.body = {
            status: 'SUCCESS',
            data: null,
            error: null
        };
    }
});

export default router.routes();