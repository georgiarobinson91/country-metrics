import express from "express";
import next from "next";
import fs from "fs";
import { countryMetrics } from "./country-metrics.js";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const authenticate = (req, res, next) => {
    const token = req.get("X-Auth-Token");
    if (token !== process.env.AUTH_TOKEN) {
      console.error("Token doesn't match");
      return res
        .status(403)
        .json({ error: "Forbidden: Invalid or missing auth token" });
    }
    next();
  };

  server.get("/countries", authenticate, (req, res) => {
    try {
      const countries = countryMetrics.map((entry) => entry.country);
      const prefix = req.query.prefix;

      if (prefix) {
        const regex = new RegExp(`\\b${prefix.toLowerCase()}`, "i");
        const filteredCountries = countries.filter((country) => {
          return regex.test(country.toLowerCase());
        });
        res.json(filteredCountries);
      } else {
        res.json(countries);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  server.get("/country-metrics", authenticate, (req, res) => {
    const country = req.query.country;

    if (!country) {
      return res.status(400).json({ error: "Country name is required" });
    }

    try {
      const countryData = countryMetrics.find(
        (entry) =>
          entry.country.toLowerCase() ===
          decodeURIComponent(country.toLowerCase())
      );

      if (!countryData) {
        return res.status(404).json({ error: "Country not found" });
      }

      res.json({ country, metrics: countryData.metrics });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
