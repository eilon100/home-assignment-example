import { Router } from 'express';
import { weatherRouter } from './weather';
import { userRouter } from './user';

const router = Router();

router.use('/user', userRouter);

router.use('/weather', weatherRouter);

export { router };
