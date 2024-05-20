import { capitalizeFirstLetter, formatPercentage, formatValue } from "@/utils";
import React from "react";

export interface LandCover {
  area_km2: number;
  data: {
    forest: number;
    shrubland: number;
    sparse_vegetation: number;
    grassland: number;
    wetland: number;
    water: number;
    permanent_snow_and_ice: number;
    bare: number;
    agriculture: number;
    settlements: number;
    no_data: number;
  };
}
const LandCoverTable = (landCover: LandCover) => {
  if (!landCover || !landCover.data) {
    return <div>Error: No land cover data available.</div>;
  }

  const { area_km2, data } = landCover;

  return (
    <div className="mb-4">
      <h2 className="text-xl mb-2">Land Cover</h2>
      <table className="w-full border-collapse">
        <tbody>
          {Object.entries(data).map(([key, value]: [string, number], idx) => {
            if (key === "no_data") {
              return null;
            }
            const percentage = (value / area_km2) * 100;
            return (
              <tr key={idx} className="border-b border-gray-200">
                <td className="py-4 px-4">{capitalizeFirstLetter(key)}</td>
                <td className="py-4 px-4">
                  <div className="flex justify-end">
                    {formatValue(value)}
                    {value !== 0 && (
                      <span className="text-sm flex items-center pl-1 text-gray-600">
                        ({formatPercentage(percentage)})
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
          {/* Total row */}
          <tr className="">
            <td className="py-4 px-4">Total Area</td>
            <td className="px-4">
              <div className="flex justify-end">
                {formatValue(area_km2)}{" "}
                <span className="text-sm flex items-center pl-1 text-gray-600">
                  (100%)
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LandCoverTable;
