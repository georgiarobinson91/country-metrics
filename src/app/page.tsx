"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import LandCoverTable, { LandCover } from "./components/LandCoverTable";
import {
  ProtectedAreas,
  ProtectedAreasTable,
} from "./components/ProtectedAreasTable";
import useFetchCountries from "@/hooks/useFetchCountries";
import useFetchCountryMetrics from "@/hooks/useFetchCountryMetricsData";

interface Metric {
  name: string;
  results: LandCover | ProtectedAreas;
}

const Home = () => {
  const [input, setInput] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(true);
  const { results, error, fetchCountriesData } = useFetchCountries();
  const { countryMetrics, fetchCountryMetricsData } = useFetchCountryMetrics();

  useEffect(() => {
    if (results.length === 0 && input) {
      setErrorMessage("You must select a country from the dropdown");
    } else {
      setErrorMessage("");
    }
  }, [input, results]);

  const handleChange = (value: string) => {
    setInput(value);
    setShowResults(true);
    fetchCountriesData(value);
    if (error) {
      setErrorMessage(error);
    }
  };

  const handleSelectCountry = (country: string) => {
    setSelectedCountry(country);
    setInput(country);
    setShowResults(false);
    setErrorMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCountryMetricsData(selectedCountry);
    setErrorMessage("");
    setInput("");
    setSelectedCountry("");
    setShowResults(false);
  };

  const renderMetricsTable = (metrics: Metric[]) => {
    const protectedAreas = metrics.find(
      (metric) => metric.name === "Protected Areas"
    );
    const landCover = metrics.find((metric) => metric.name === "Land Cover");

    return (
      <div className="mt-4 w-full">
        {protectedAreas &&
          ProtectedAreasTable(protectedAreas.results as ProtectedAreas)}
        {landCover && LandCoverTable(landCover.results as LandCover)}
      </div>
    );
  };

  return (
    <div className="flex flex-col px-8 mt-20 mb-10">
      <form onSubmit={handleSubmit} className="flex justify-center">
        <div className="w-full md:w-3/4 lg:w-1/2 grid grid-cols-3 sm:grid-cols-4 gap-4 mb-10">
          <div className="col-span-2 sm:col-span-3 relative">
            <input
              className="w-full py-2 px-2 border rounded"
              placeholder="Search countries..."
              value={input}
              onChange={(e) => handleChange(e.target.value)}
            />
            {showResults && results.length > 0 && (
              <div className="absolute top-full border-b border-x rounded-b left-0 right-0 max-h-[400px] bg-gray-100 overflow-auto">
                {results.map((result: string, id: number) => (
                  <div
                    className="px-4 pt-4 hover:bg-gray-400 cursor-pointer"
                    key={id}
                    onClick={() => handleSelectCountry(result)}
                  >
                    {result}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-span-1 flex justify-end">
            <button
              type="submit"
              className={clsx(
                "bg-blue-200 w-full hover:bg-blue-400 rounded px-4 py-2",
                !selectedCountry && "bg-gray-200 hover:bg-gray-200"
              )}
              disabled={!selectedCountry}
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      <div
        className={clsx(
          "flex items-center justify-center",
          errorMessage && "pt-12"
        )}
      >
        {errorMessage && errorMessage}
      </div>
      {countryMetrics && (
        <div className="flex justify-center items-center">
          <div className="mt-4 w-full md:w-3/4 lg:w-1/2 flex flex-col">
            <h1 className="text-3xl mb-4 w-full flex justify-start border-b border-black">
              {countryMetrics.country}
            </h1>
            <div className="flex justify-center items-center w-full ">
              {renderMetricsTable(countryMetrics.metrics)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
