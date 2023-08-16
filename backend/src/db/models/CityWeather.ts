import { model, Schema, Document, Model } from 'mongoose';
import { CityWeatherDal } from '../data-access-layer/City-weather-Dal';

export interface CityWeatherAttrs {
  cityKey: string;
  cityName: string;
  weatherText: string;
  temperature: string;
}
export interface CityWeatherDoc extends CityWeatherAttrs, Document {}

export interface WeatherModel extends Model<CityWeatherDoc> {
  build(attrs: CityWeatherAttrs): CityWeatherDoc;
}

const cityWeatherSchema = new Schema(
  {
    cityKey: { type: String, required: true, unique: true },
    cityName: { type: String, required: true, unique: true },
    weatherText: { type: String, required: true },
    temperature: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

cityWeatherSchema.statics.build = (attrs: CityWeatherAttrs) =>
  new CityWeather(attrs);

const CityWeather = model<CityWeatherDoc, WeatherModel>(
  'weather',
  cityWeatherSchema
);

const cityWeatherDal = new CityWeatherDal(CityWeather);

export { CityWeather, cityWeatherDal };
