Country Metrics Search

This project is a web application built with Next.js for the frontend using TypeScript and React, and an Express backend. The purpose of the project is to allow users to search for a country, select it, and retrieve metric data for land cover and protected areas.

## Features

Search for a country by name
Select a country to view detailed metrics
Display data on land cover and protected areas
Responsive and user-friendly interface

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## After making changes to the server

```bash
npm run dev
```

## Technologies used

Next.js
React
TypeScript
TailwindCSS
Express
Node.js
npm

## Data

As instructed, I didn't include the country-metrics json file in the submission. However, for simplicity I have put it into a module and then imported the data versus using readFiles. Clearly, this isn't how you would do it in production code, where the application would be getting the data from a database.

## Consider how you might make an API to edit the dataset

The API would have a set of CRUD endpoints

- Create country
- Get country
- Update country
- Delete country

Initial thoughts are that we wouldn't want to give the server a complete country definition with all the metrics and then expect the server to determine what has changed, and so it is likely that we would have some metric endpoints.

- Create metric
- Get metric
- Delete metric
- Update metric

To be discussed
