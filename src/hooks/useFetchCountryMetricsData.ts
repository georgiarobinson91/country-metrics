"use client";

import { LandCover } from "@/app/components/LandCoverTable";
import { ProtectedAreas } from "@/app/components/ProtectedAreasTable";
import { useState } from "react";

interface CountryMetrics {
  country: string;
  metrics: Metric[];
}

interface Metric {
  name: string;
  results: LandCover | ProtectedAreas;
}

interface FetchCountryMetricsResult {
  countryMetrics: CountryMetrics | null;
  errorMessage: string;
  fetchCountryMetricsData: (country: string) => Promise<void>;
}

const useFetchCountryMetrics = (): FetchCountryMetricsResult => {
  const [countryMetrics, setCountryMetrics] = useState<CountryMetrics | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  const BASE_URL = "http://localhost:3000";
  const headers = {
    "Content-Type": "application/json",
    //hard-coded for simplicity - would need to use login with JWT
    "X-Auth-Token": "SECRET12345",
  };

  const fetchCountryMetricsData = async (country: string): Promise<void> => {
    try {
      const response = await fetch(
        `${BASE_URL}/country-metrics?country=${encodeURIComponent(country)}`,
        {
          method: "GET",
          headers,
        }
      );
      if (response.status !== 200) {
        setErrorMessage("Sorry, it looks like something's gone wrong!");
      } else {
        const data = await response.json();
        setCountryMetrics(data);
        return;
      }
    } catch (error) {
      setErrorMessage("Sorry, it looks like something's gone wrong!");
      console.error("Error fetching country metrics:", error);
    }
  };

  return { countryMetrics, errorMessage, fetchCountryMetricsData };
};

export default useFetchCountryMetrics;
