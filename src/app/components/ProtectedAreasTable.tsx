import { formatPercentage, formatValue } from "@/utils";

export interface ProtectedAreas {
  area_km2: number;
  marine_area_km2: number;
  marine_perc: number;
  terrestrial_area_km2: number;
  terrestrial_perc: number;
  unprotected_area_km2: number;
  unprotected_perc: number;
  [key: string]: number;
}

export const ProtectedAreasTable = (protectedAreas: ProtectedAreas) => {
  return (
    <div className="mb-4 w-full">
      <h2 className="text-xl mb-2">Protected Areas</h2>
      <table className="w-full border-collapse">
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="py-4 px-4">Marine</td>
            <td className="py-4 px-4 border-bottom border-">
              <div className="flex justify-end">
                {formatValue(protectedAreas.marine_area_km2)}
                {protectedAreas.marine_area_km2 !== 0 && (
                  <div>
                    <span className="text-sm flex items-center pl-1 text-gray-600">
                      ({formatPercentage(protectedAreas.marine_perc)})
                    </span>
                  </div>
                )}
              </div>
            </td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="py-4 px-4">Terrestrial</td>
            <td className="py-4 px-4">
              <div className="flex justify-end">
                {formatValue(protectedAreas.terrestrial_area_km2)}
                {protectedAreas.terrestrial_area_km2 !== 0 && (
                  <>
                    <span className="text-sm flex items-center pl-1 text-gray-600">
                      ({formatPercentage(protectedAreas.terrestrial_perc)})
                    </span>
                  </>
                )}
              </div>
            </td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="py-4 px-4">Unprotected</td>
            <td className="py-4 px-4">
              <div className="flex justify-end">
                {formatValue(protectedAreas.unprotected_area_km2)}
                {protectedAreas.unprotected_area_km2 !== 0 && (
                  <>
                    {" "}
                    <span className="text-sm flex items-center pl-1 text-gray-600">
                      ({formatPercentage(protectedAreas.unprotected_perc)})
                    </span>
                  </>
                )}
              </div>
            </td>
          </tr>
          {/* Render Total row */}
          <tr className="">
            <td className="py-4 px-4">Total</td>
            <td className="py-4 px-4">
              <div className="flex justify-end">
                {formatValue(protectedAreas.area_km2)}{" "}
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
