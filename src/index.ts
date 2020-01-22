import * as Koa from 'koa';
import * as Router from 'koa-router';

import dataListRoute from './routes/data-list';

const app = new Koa();
const router = new Router();

router.use('/data-list', dataListRoute);

app.use(router.routes());

app.listen(4004, () => {
    console.log('Koa Server running at localhost:4004...');
});