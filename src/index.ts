import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as BodyParser from 'koa-bodyparser';

import articleListRoute from './routes/article-list';
import commentListRoute from './routes/comment-list';
import addArticleRoute from './routes/add-article';
import addCommentRoute from './routes/add-comment';

const app = new Koa();
const router = new Router();

app.use(BodyParser());

router.use('/article-list', articleListRoute);
router.use('/comment-list', commentListRoute);
router.use('/article', addArticleRoute);
router.use('/comment', addCommentRoute);

app.use(router.routes());

app.listen(4004, () => {
    console.log('Koa Server running at localhost:4004...');
});