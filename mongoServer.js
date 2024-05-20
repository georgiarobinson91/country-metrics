const express = require("express");
const next = require("next");
const fs = require("fs").promises;
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/WCMCtest";

const client = new MongoClient(uri);

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const authenticate = (req, res, next) => {
    const token = req.get("X-Auth-Token");
    if (token !== "SECRET12345") {
      console.error("Token doesn't match");
      return res
        .status(403)
        .json({ message: "Forbidden: Invalid or missing auth token" });
    }
    next();
  };

  server.get("/countries", authenticate, async (req, res, next) => {
    try {
      //TODO refactor connection out
      await client.connect();
      const database = client.db();
      const collection = database.collection("countries");
      const documents = await collection
        .find({}, { projection: { country: 1, _id: 0 } })
        .toArray();
      const countries = documents.map((entry) => entry.country);

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
      next(error);
    } finally {
      await client.close();
    }
  });

  server.get("/country-metrics", authenticate, async (req, res) => {
    try {
      //TODO refactor connection out
      await client.connect();
      const database = client.db();
      const collection = database.collection("countries");
      const countryName = req.query.country;
      //TODO need to deal with case insensitivity
      const documents = await collection.findOne({ country: countryName });

      res.json(documents);
    } catch (error) {
      next(error);
    } finally {
      await client.close();
    }
  });

  const errorHandler = (err, req, res, next) => {
    res.status(500);
  };

  server.use(errorHandler);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
