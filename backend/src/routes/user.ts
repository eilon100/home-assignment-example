import { Router } from 'express';
import {
  createUser,
  deleteFavoriteCity,
  getAllFavoriteCities,
  loginUser,
  saveFavoriteCity,
} from '../controllers/user';
import { validateRequest } from '../middleware/validate-request';
import { UserSignUpValidation } from '../validation/UserSignInValidation';

const router = Router();

router.post('/create', UserSignUpValidation(), validateRequest, createUser);

router.post('/login', loginUser);

router.delete('/save-favorite-city', saveFavoriteCity);

router.delete('/delete-favorite-city', deleteFavoriteCity);

router.delete('/get-favorite-cities', getAllFavoriteCities);

export { router as userRouter };
