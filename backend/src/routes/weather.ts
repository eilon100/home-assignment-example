import { Router } from 'express';
import {
  getCurrentCityWeather,
  searchCityAutoComplete,
} from '../controllers/city-weather';

const router = Router();
router.get('/get-weather', getCurrentCityWeather);

router.get('/search-city', searchCityAutoComplete);

export { router as weatherRouter };
