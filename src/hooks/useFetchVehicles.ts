import { useState, useEffect, useCallback, useContext } from "react";
import { Vehicle } from "../custom-types/Index";
import { getVehicles } from "../api/api";
import { VehicleContext } from "./VehicleContext";

//* PS: This compoent has a lot of filter logic however there are few ways
//* we can refactore the code creating Interface and just one handleFilterChange with all of the filter iterte thought that function
//* and set the state based on the filter name and value. and pass it to the ListingPage filter
//* I was running out of time so I was not able to refactore this :(

const useFetchVehicles = () => {
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]); // All vehicles data
  const [error, setError] = useState(null);
  const { setScrollPosition } = useContext(VehicleContext);

  // Aggregated data for filter values
  const [models, setModels] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [fuelTypes, setFuelTypes] = useState<string[]>([]);
  const [climateTypes, setClimateTypes] = useState<string[]>([]);
  const [interiorColors, setInteriorColors] = useState<string[]>([]);

  // Filter values for each filter field
  const [colorFilter, setColorFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [fuelTypeFilter, setFuelTypeFilter] = useState("");
  const [climateFilter, setClimateFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState(3000);
  const [maxPriceFilter, setMaxPriceFilter] = useState(100000);
  const [minRegYearFilter, setMinRegYearFilter] = useState(2010);
  const [maxRegYearFilter, setMaxRegYearFilter] = useState(2030);
  const [minKmFilter, setMinKmFilter] = useState(5000);
  const [maxKmFilter, setMaxKmFilter] = useState(100000);
  const [minEnginePowerFilter, setMinEnginePowerFilter] = useState(20);
  const [maxEnginePowerFilter, setMaxEnginePowerFilter] = useState(300);

  const [filterApplied, setFilterApplied] = useState(false);

  const [hasMore, setHasMore] = useState(true); // extracting the data state to determine if more data is available to fetch

  // Function to fetch vehicle data, with optional pagination
  const fetchVehicles = useCallback(
    async (page: number = 1, perPage: number = 6) => {
      setLoading(true);
      setError(null);

      // Fetch data from API
      try {
        const response = await getVehicles(page);

        console.log("res", response);

        // If there are records in the response, set hasMore to true
        setHasMore(response.records.length > 0);

        // If the response contains aggregated data, set the state variables
        if (
          response.aggregations?.model &&
          response.aggregations?.category &&
          response.aggregations?.["drivetrain.fuel.type"] &&
          response.aggregations?.climate &&
          response.aggregations?.["interior.interior_color"]
        ) {
          setModels(Object.keys(response.aggregations.model));
          setCategories(Object.keys(response.aggregations.category));
          setFuelTypes(
            Object.keys((response.aggregations as any)["drivetrain.fuel.type"])
          );
          setClimateTypes(Object.keys(response.aggregations.climate));
          setInteriorColors(
            Object.keys(response.aggregations["interior.interior_color"])
          );
        }

        // Apply filters to the fetched vehicles if any filter is selected
        let newVehicles = response.records;

        // Filter by model
        if (modelFilter) {
          newVehicles = newVehicles.filter(
            (vehicle) =>
              vehicle.model.toLowerCase() === modelFilter.toLowerCase()
          );
        }

        // Filter by category
        if (categoryFilter) {
          newVehicles = newVehicles.filter(
            (vehicle) =>
              vehicle.category.toLowerCase() === categoryFilter.toLowerCase()
          );
        }

        // Filter by fuel type
        if (fuelTypeFilter) {
          newVehicles = newVehicles.filter(
            ({
              drivetrain: {
                fuel: { type },
              },
            }: Vehicle) => type.toLowerCase() === fuelTypeFilter.toLowerCase()
          );
        }

        // Filter by climate
        if (climateFilter) {
          newVehicles = newVehicles.filter(
            (vehicle) =>
              vehicle.climate.toLowerCase() === climateFilter.toLowerCase()
          );
        }

        // Filter by color
        if (colorFilter) {
          newVehicles = newVehicles.filter(
            (vehicle) =>
              vehicle.color?.toLowerCase() === colorFilter.toLowerCase()
          );
        }

        // Filter by price range
        if (minPriceFilter || maxPriceFilter) {
          newVehicles = newVehicles.filter(
            (vehicle) =>
              vehicle.price_data.price >= minPriceFilter &&
              vehicle.price_data.price <= maxPriceFilter
          );
        }

        // Filter by registration year range
        if (minRegYearFilter || maxRegYearFilter) {
          newVehicles = newVehicles.filter((vehicle) => {
            if (vehicle.vehicle_history && vehicle.vehicle_history.reg_date) {
              const regYear = Number(
                vehicle.vehicle_history.reg_date.split(".")[1]
              );
              return regYear >= minRegYearFilter && regYear <= maxRegYearFilter;
            }
            return true; // Skip if not available
          });
        }

        // Filter by kilometer range
        if (minKmFilter || maxKmFilter) {
          newVehicles = newVehicles.filter(
            (vehicle) =>
              vehicle.kilometer >= minKmFilter &&
              vehicle.kilometer <= maxKmFilter
          );
        }

        // Filter by engine power range
        if (minEnginePowerFilter || maxEnginePowerFilter) {
          newVehicles = newVehicles.filter(
            (vehicle) =>
              (vehicle.technical_features?.engine_power_max || Infinity) >=
                minEnginePowerFilter &&
              (vehicle.technical_features?.engine_power_max || 0) <=
                maxEnginePowerFilter
          );
        }

        // Add the newly fetched and filtered vehicles to the existing list
        setVehicles((prevVehicles) => [...prevVehicles, ...newVehicles]);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    // The fetchVehicles function will re-run whenever any filter value changes
    [
      modelFilter,
      categoryFilter,
      fuelTypeFilter,
      climateFilter,
      colorFilter,
      minPriceFilter,
      maxPriceFilter,
      minRegYearFilter,
      maxRegYearFilter,
      minKmFilter,
      maxKmFilter,
      minEnginePowerFilter,
      maxEnginePowerFilter,
    ]
  );

  const loadMoreVehicles = () => {
    // Pass the number of items to fetch in the loadMoreVehicles function
    const nextPage = vehicles.length / 6 + 1;
    fetchVehicles(nextPage, 6);
  };

  const resetScrollPosition = () => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  };

  // After each filter change function
  const handleModelChange = (model: string) => {
    setModelFilter(model);
    setFilterApplied(true);
    resetScrollPosition();
  };

  const resetFilters = () => {
    setFilterApplied(false);
    resetScrollPosition();
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
    setFilterApplied(true);
    setScrollPosition(0);
  };

  const handleFuelTypeChange = (fuelType: string) => {
    setFuelTypeFilter(fuelType);
    setScrollPosition(0);
  };

  const handleClimateChange = (climate: string) => {
    setClimateFilter(climate);
    setScrollPosition(0);
  };

  const handleInteriorColorChange = (color: string) => {
    setColorFilter(color);
    setScrollPosition(0);
  };

  const handleMinPriceChange = (price: number) => {
    setMinPriceFilter(price);
    setScrollPosition(0);
  };

  const handleMaxPriceChange = (price: number) => {
    setMaxPriceFilter(price);
    setScrollPosition(0);
  };

  const handleMinRegYearChange = (regYear: number) => {
    setMinRegYearFilter(regYear);
    setScrollPosition(0);
  };

  const handleMaxRegYearChange = (regYear: number) => {
    setMaxRegYearFilter(regYear);
    setScrollPosition(0);
  };

  const handleMinKmChange = (km: number) => {
    setMinKmFilter(km);
    setScrollPosition(0);
  };

  const handleMaxKmChange = (km: number) => {
    setMaxKmFilter(km);
    setScrollPosition(0);
  };

  const handleMinEnginePowerChange = (enginePower: number) => {
    setMinEnginePowerFilter(enginePower);
    setScrollPosition(0);
  };

  const handleMaxEnginePowerChange = (enginePower: number) => {
    setMaxEnginePowerFilter(enginePower);
    setScrollPosition(0);
  };

  // Fetch data initially and whenever filterApplied state changes
  useEffect(() => {
    setVehicles([]);
    fetchVehicles();
  }, [fetchVehicles, filterApplied]);

  // Clear the current vehicles and re-fetch whenever any filter value changes
  useEffect(() => {
    if (filterApplied) {
      setVehicles([]);
      fetchVehicles();
    }
  }, [filterApplied, fetchVehicles]); // Add fetchVehicles as a dependency

  return {
    loading,
    vehicles,
    models,
    categories,
    fuelTypes,
    climateTypes,
    interiorColors,
    colorFilter,
    hasMore,
    error,
    filterApplied,

    resetFilters,
    loadMoreVehicles,
    handleModelChange,
    handleCategoryChange,
    handleFuelTypeChange,
    handleClimateChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleMinRegYearChange,
    handleMaxRegYearChange,
    handleMinKmChange,
    handleMaxKmChange,
    handleMinEnginePowerChange,
    handleMaxEnginePowerChange,
    handleInteriorColorChange,
  };
};

export default useFetchVehicles;
