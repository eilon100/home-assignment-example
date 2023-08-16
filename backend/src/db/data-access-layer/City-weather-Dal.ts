import { ClientSession, ProjectionType } from 'mongoose';
import {
  CityWeatherAttrs,
  CityWeatherDoc,
  WeatherModel,
} from '../models/CityWeather';
import { Dal } from './Dal';

export class CityWeatherDal extends Dal<CityWeatherDoc, WeatherModel> {
  async createCityWeather(
    WeatherAttrs: CityWeatherAttrs,
    session?: ClientSession
  ) {
    const cityWeather = this.model.build(WeatherAttrs);

    await cityWeather.save({ ...(session && { session }) });
    return cityWeather;
  }

  async findCityWeatherByCityKey(cityKey: string) {
    return await this.model.findOne({ cityKey });
  }
}
