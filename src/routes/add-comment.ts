import * as Router from 'koa-router';

import readFile from '../lib/read-file';
import writeFile from '../lib/write-file';
import { CommentItem } from '../models/comment-data.model';
import { Article } from '../models/article.model';

const router = new Router();

router.post('/add', async (ctx) => {
    const { author, content, articleId } = ctx.request.body;

    // comments
    const commentsBuffer = await readFile('./assets/data/comment-list.json');
    const commentsData: CommentItem[] = JSON.parse(commentsBuffer.toString());
    const commentIndex = commentsData.findIndex((item: CommentItem) => item.articleId === +articleId);
    
    const nowDate = new Date();
    const updateTime = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1 < 10 ? `0${ nowDate.getMonth() + 1 }`: nowDate.getMonth() + 1,
        date: nowDate.getDate() < 10 ? `0${ nowDate.getDate() }` : nowDate.getDate(),
    };

    commentsData[commentIndex].comments.push({
        updateTime: `${ updateTime.year }-${ updateTime.month }-${ updateTime.date }`,
        comment: content,
        author,
    });
    

    const writeCommentStatus = await writeFile(
        './assets/data/comment-list.json',
        JSON.stringify(commentsData)
    );

    // articles
    const articlesBuffer = await readFile('./assets/data/article-list.json');
    const articleList: Article[] = JSON.parse(articlesBuffer.toString());
    const articleIndex = articleList.findIndex((item: Article) => item.articleId === +articleId);
    articleList[articleIndex].commentsLength = commentsData[commentIndex].comments.length;
    

    const writeArticlesStatus = await writeFile(
        './assets/data/article-list.json',
        JSON.stringify(articleList)
    );

    if (
        (writeCommentStatus as any).status === 'SUCCESS'
        && (writeArticlesStatus as any).status === 'SUCCESS'
    ) {
        console.log('add comment');
        ctx.body = {
            status: 'SUCCESS',
            data: null,
            error: null
        };
    }
});

export default router.routes();