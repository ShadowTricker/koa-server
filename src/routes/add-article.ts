import * as Router from 'koa-router';

import readFile from '../lib/read-file';
import writeFile from '../lib/write-file';
import { CommentItem } from '../models/comment-data.model';

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

    const writeArticlesStatus = await writeFile(
        './assets/data/article-list.json',
        JSON.stringify(articleList)
    );

    const commentsBuffer = await readFile('./assets/data/comment-list.json');
    const commentsData: CommentItem[] = JSON.parse(commentsBuffer.toString());
    commentsData.push({
        articleId: articleList.length,
        comments: []
    });
    const writeCommentStatus = await writeFile(
        './assets/data/comment-list.json',
        JSON.stringify(commentsData)
    );

    if (
        (writeArticlesStatus as any).status === 'SUCCESS'
        && (writeCommentStatus as any).status === 'SUCCESS'
    ) {
        console.log('add article');
        ctx.body = {
            status: 'SUCCESS',
            data: null,
            error: null
        };
    }
});

export default router.routes();