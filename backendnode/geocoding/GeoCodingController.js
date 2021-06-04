import axios from "axios";
import querystring from "querystring";
import redis from '../redis.js';

const { HERE_API_KEY, MAPBOX_API_KEY, OPENCAGE_API_KEY } = process.env;

const getMapBoxLocation = async (address) => {
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?` +
      querystring.stringify({ access_token: MAPBOX_API_KEY })
  );
  const [lng, lat] = response.data?.features?.[0]?.center || [null, null];
  return { lng, lat };
};

const getHereLocation = async (address) => {
  const response = await axios.get(
    `https://geocode.search.hereapi.com/v1/geocode?` +
      querystring.stringify({ q: address, apiKey: HERE_API_KEY })
  );
  return response.data?.items?.[0].position || { lat: null, lng: null };
};

const getOpenCageLocation = async (address) => {
  const response = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?` +
      querystring.stringify({ q: address, key: OPENCAGE_API_KEY })
  );
  return response.data?.results?.[0]?.geometry || { lat: null, lng: null };
};

const geoCodeFunctions = [
  getMapBoxLocation,
  getHereLocation,
  getOpenCageLocation,
];

export default (app) => {
  app.get("/geocode", async (req, res) => {
    const { address } = req.query;

    const oldValue = await redis.getAsync(address);
    if(oldValue){
      console.log("Found old value");
      res.json(oldValue);
    }
    try {
      // Wait that previos is completed
      //   const results = [];
      //   for (const func of geoCodeFunctions) {
      //     console.log("REQUEST", func);
      //     const result = await func(address);
      //     console.log("RESPONSE", func);

      //     if (result.lat && result.lng) {
      //       results.push(result);
      //     }
      //   }

      const results = (
        await Promise.allSettled(geoCodeFunctions.map((func) => func(address)))
      )
        .filter(({ status }) => status === "fulfilled")
        .map(({ value }) => value);
      console.log({ results });
      const sums = results.reduce((sums, result) => ({
        lng: sums.lng + result.lng,
        lat: sums.lat + result.lat,
      }));
      const averages = Object.fromEntries(
        Object.entries(sums).map(([key, value]) => [
          key,
          value / results.length,
        ])
      );

      redis.set(address, JSON.stringify(averages));
      console.log("Saved new");
      res.json(averages);
    } catch (error) {
      console.error(error);

      res.end();
    }
  });
};