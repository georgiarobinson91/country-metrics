"use client";

import { useState } from "react";

interface FetchCountriesResult {
  results: string[];
  error: string;
  fetchCountriesData: (value: string) => Promise<void>;
}

const useFetchCountries = (): FetchCountriesResult => {
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const BASE_URL = "http://localhost:3000";
  const headers = {
    "Content-Type": "application/json",
    //hard-coded for simplicity - would need to use login with JWT
    "X-Auth-Token": "SECRET12345",
  };

  const fetchCountriesData = async (value: string) => {
    try {
      const response = await fetch(`${BASE_URL}/countries?prefix=${value}`, {
        method: "GET",
        headers,
      });
      if (response.status === 403) {
        setError(
          "Sorry, it looks like we're having trouble authenticating your login details!"
        );
      }
      if (response.status !== 200 && response.status !== 401) {
        setError("Sorry, it looks like something's gone wrong!");
      } else {
        const data = await response.json();
        setResults(data);
        return;
      }
    } catch (error) {
      setError("Sorry, it looks like something's gone wrong!");
      console.error("Error fetching data", error);
    }
  };

  return { results, error, fetchCountriesData };
};

export default useFetchCountries;
