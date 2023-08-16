import { RequestHandler } from 'express';
import axios from 'axios';

export const searchCityAutoComplete: RequestHandler = async (req, res) => {
  const autoCompleteUrl = process.env.ACCU_WEATHER_AUTO_COMPLETE_URL!;
  const autoCompleteKey = process.env.ACCU_WEATHER_KEY!;
  const { cityName } = req.query;

  const { data } = await axios(autoCompleteUrl, {
    params: {
      apikey: autoCompleteKey,
      q: cityName,
    },
  });

  res.status(201).json({ success: true, data });
};
