import React, { useContext, useEffect, useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { BsFilterSquare } from "react-icons/bs";
import VehicleTile from "../components/VehicleTile";
import FilterOptions from "../components/FilterOptions";
import useFetchVehicles from "../hooks/useFetchVehicles";
import Modal from "../ui/Modal";
import useWindowSize from "../hooks/useWindowSize";

import { VehicleContext } from "../hooks/VehicleContext";

const ListingPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const { width } = useWindowSize();
  const isMobile = width <= 800;

  // Getting the setScrollPosition function from VehicleContext.
  const { setScrollPosition } = useContext(VehicleContext);

  const {
    vehicles,
    models,
    categories,
    fuelTypes,
    climateTypes,
    interiorColors,
    hasMore,
    filterApplied,
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
  } = useFetchVehicles();

  // Event listener to handle page refresh and store the scroll position
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      setScrollPosition(window.scrollY);
    });

    return () => {
      window.removeEventListener("beforeunload", () => {
        setScrollPosition(window.scrollY);
      });
    };
  }, [setScrollPosition]);

  // If filters are applied, this will move the user to the top of the page
  useEffect(() => {
    if (filterApplied) {
      window.scrollTo(0, 0);
    }
  }, [filterApplied]);

  return (
    <div className="listing-page">
      <div className="filter-section">
        {isMobile ? (
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <FilterOptions
              models={models}
              categories={categories}
              fuelTypes={fuelTypes}
              climate={climateTypes}
              interiorColors={interiorColors}
              onModelChange={handleModelChange}
              onCategoryChange={handleCategoryChange}
              onFuelTypeChange={handleFuelTypeChange}
              onClimateChange={handleClimateChange}
              onMinPriceChange={handleMinPriceChange}
              onMaxPriceChange={handleMaxPriceChange}
              onMinRegYearChange={handleMinRegYearChange}
              onMaxRegYearChange={handleMaxRegYearChange}
              onMinKmChange={handleMinKmChange}
              onMaxKmChange={handleMaxKmChange}
              onMinEnginePowerChange={handleMinEnginePowerChange}
              onMaxEnginePowerChange={handleMaxEnginePowerChange}
              onInteriorColorChange={handleInteriorColorChange}
            />
          </Modal>
        ) : (
          <FilterOptions
            models={models}
            categories={categories}
            fuelTypes={fuelTypes}
            climate={climateTypes}
            interiorColors={interiorColors}
            onModelChange={handleModelChange}
            onCategoryChange={handleCategoryChange}
            onFuelTypeChange={handleFuelTypeChange}
            onClimateChange={handleClimateChange}
            onMinPriceChange={handleMinPriceChange}
            onMaxPriceChange={handleMaxPriceChange}
            onMinRegYearChange={handleMinRegYearChange}
            onMaxRegYearChange={handleMaxRegYearChange}
            onMinKmChange={handleMinKmChange}
            onMaxKmChange={handleMaxKmChange}
            onMinEnginePowerChange={handleMinEnginePowerChange}
            onMaxEnginePowerChange={handleMaxEnginePowerChange}
            onInteriorColorChange={handleInteriorColorChange}
          />
        )}
      </div>

      <div className="vehicle-container">
        <div>
          <h1>Find and buy your new used vehicle online</h1>
          <p>
            Our cars are checked, not older than 5 years and driven less than
            100,000 km.
          </p>
          <p>
            With our online purchase you have a 12-month Allianz guarantee and a
            14-day right of return.
          </p>
        </div>

        {isMobile && (
          <button onClick={() => setModalOpen(true)} className="filter-button">
            <BsFilterSquare />
            Filters
          </button>
        )}

        <InfiniteScroll
          dataLength={vehicles.length}
          next={loadMoreVehicles}
          hasMore={hasMore} // Only Feching 100 for now
          loader={""}
          className="vehicle-listing"
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {vehicles.length > 0 ? (
            vehicles.map((vehicle, index) => (
              <VehicleTile key={`${vehicle.id}-${index}`} vehicle={vehicle} />
            ))
          ) : (
            <div className="no-data-found">
              <h2>No Data found</h2>
            </div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ListingPage;
