import cors from 'cors';
import express, {json, Router} from 'express';
import {config} from "./config/config";
import rateLimit from 'express-rate-limit';
import {handleError} from "./utils/errors";
import {baseRouter} from "./routers/base";
import {seedRouter} from "./routers/seed";

const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));

app.use(json());

app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 100,
}));

const router = Router();


router.use('/base', baseRouter);
router.use('/', seedRouter); //localhost:3001 shows list of seeds

app.use('/api', router);


app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port: http://localhost:3001');
});