import axios from 'axios';
import { RequestHandler } from 'express';
import {
  CityWeatherAttrs,
  cityWeatherDal,
} from '../../../db/models/CityWeather';
import { BadRequestError } from '../../../errors/bad-request';

export const getCurrentCityWeather: RequestHandler = async (req, res, next) => {
  const { cityName, cityKey } = req.query as {
    [key: string]: string;
  };

  
  const DBcityWeatherData = await checkIfCityWeatherExists(cityKey);

  if (DBcityWeatherData)
    return res
      .status(201)
      .json({ success: true, cityWeather: DBcityWeatherData });

  const APIcityWeatherData = await searchCityWeatherInApi(cityKey);

  const {
    WeatherText,
    Temperature: {
      Metric: { Value: temperatureValue },
    },
  } = APIcityWeatherData[0];

  await saveCityWeatherDataToDB({
    weatherText: WeatherText,
    temperature: temperatureValue,
    cityKey,
    cityName,
  });

  return res.status(201).json({ success: true, cityData: APIcityWeatherData });
};

const checkIfCityWeatherExists = async (cityKey: string) => {
  const cityWeather = await cityWeatherDal.findCityWeatherByCityKey(cityKey);
  return cityWeather;
};

const searchCityWeatherInApi = async (cityKey: string) => {
  const currentWeatherUrl = process.env.ACCU_WEATHER_CURRENT_WEATHER_URL!;
  const currentWeatherKey = process.env.ACCU_WEATHER_KEY!;

  const { data } = await axios(`${currentWeatherUrl}/${cityKey}`, {
    params: {
      apikey: currentWeatherKey,
    },
  });
  return data;
};

const saveCityWeatherDataToDB = async (cityWeatherData: CityWeatherAttrs) => {
  const query = await cityWeatherDal.createCityWeather(cityWeatherData);

  if (!query) {
    throw new BadRequestError('failed save the city to DB');
  }
};
