import * as Koa from 'koa';
import * as Router from 'koa-router';

import articleListRoute from './routes/articles';
import commentListRoute from './routes/comments';

const app = new Koa();
const router = new Router();

router.use('/article-list', articleListRoute);
router.use('/comment-list', commentListRoute);

app.use(router.routes());

app.listen(4004, () => {
    console.log('Koa Server running at localhost:4004...');
});