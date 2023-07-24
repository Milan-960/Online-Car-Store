import React from "react";
import Select from "react-select";
import {
  enginePowerFromOptions,
  enginePowerToOptions,
  kilometerFromOptions,
  kilometerToOptions,
  priceFromOptions,
  priceToOptions,
  regYearFromOptions,
  regYearToOptions,
} from "../constants/Filter-constant";
import { FilterProps } from "@/custom-types/Index";

// Define the type for select options
interface SelectOption {
  value: string;
  label: string;
}

const FilterOptions: React.FC<FilterProps> = ({
  models,
  categories,
  fuelTypes,
  climate,
  interiorColors,
  onModelChange,
  onCategoryChange,
  onFuelTypeChange,
  onClimateChange,
  onMinPriceChange,
  onMaxPriceChange,
  onMinRegYearChange,
  onMaxRegYearChange,
  onMinKmChange,
  onMaxKmChange,
  onMinEnginePowerChange,
  onMaxEnginePowerChange,
  onInteriorColorChange,
}) => {
  const modelOptions = models.map((model) => ({ value: model, label: model }));
  const categoryOptions = categories.map((category) => ({
    value: category,
    label: category,
  }));
  const fuelTypeOptions = fuelTypes.map((fuelType) => ({
    value: fuelType,
    label: fuelType,
  }));

  const climateOptions = climate.map((climate) => ({
    value: climate,
    label: climate,
  }));

  const interiorColorOptions = interiorColors.map((color) => ({
    value: color,
    label: color,
  }));

  const handleSelectChange =
    <T extends string | number>(setter: (value: T) => void) =>
    (selectedOption: SelectOption | null) => {
      if (!selectedOption) {
        setter("" as T);
        return;
      }

      if (typeof setter === "function") {
        const value = isNaN(Number(selectedOption.value))
          ? selectedOption.value
          : Number(selectedOption.value);
        setter(value as T);
      }
    };

  return (
    <div className="filter-container">
      <div className="filter-options">
        <label>Models</label>
        <Select
          options={modelOptions}
          isClearable
          onChange={handleSelectChange(onModelChange)}
        />
      </div>

      <div className="filter-options">
        <label>Categories</label>
        <Select
          options={categoryOptions}
          isClearable
          onChange={handleSelectChange(onCategoryChange)}
        />
      </div>

      <div className="filter-options">
        <label>Fuel Type</label>
        <Select
          options={fuelTypeOptions}
          isClearable
          onChange={handleSelectChange(onFuelTypeChange)}
        />
      </div>

      <div className="filter-options">
        <label>Climate</label>
        <Select
          options={climateOptions}
          isClearable
          onChange={handleSelectChange(onClimateChange)}
        />
      </div>

      <div className="filter-options">
        <label>Interior Color</label>
        <Select
          options={interiorColorOptions}
          isClearable
          onChange={handleSelectChange(onInteriorColorChange)}
        />
      </div>

      <div className="filter-options">
        <label>Price:</label>
        <div className="filter-two-options">
          <Select
            options={priceFromOptions}
            isClearable
            onChange={handleSelectChange(onMinPriceChange)}
            placeholder="From"
          />
          <Select
            options={priceToOptions}
            isClearable
            onChange={handleSelectChange(onMaxPriceChange)}
            placeholder="To"
          />
        </div>
      </div>
      <div className="filter-options">
        <label>Registration Year:</label>
        <div className="filter-two-options">
          <Select
            options={regYearFromOptions}
            isClearable
            onChange={handleSelectChange(onMinRegYearChange)}
            placeholder="From"
          />
          <Select
            options={regYearToOptions}
            isClearable
            onChange={handleSelectChange(onMaxRegYearChange)}
            placeholder="To"
          />
        </div>
      </div>

      <div className="filter-options">
        <label>Kilometer:</label>
        <div className="filter-two-options">
          <Select
            options={kilometerFromOptions}
            isClearable
            onChange={handleSelectChange(onMinKmChange)}
            placeholder="From"
          />
          <Select
            options={kilometerToOptions}
            isClearable
            onChange={handleSelectChange(onMaxKmChange)}
            placeholder="To"
          />
        </div>
      </div>

      <div className="filter-options">
        <label>Engine Power:</label>
        <div className="filter-two-options">
          <Select
            options={enginePowerFromOptions}
            isClearable
            onChange={handleSelectChange(onMinEnginePowerChange)}
            placeholder="From"
          />
          <Select
            options={enginePowerToOptions}
            isClearable
            onChange={handleSelectChange(onMaxEnginePowerChange)}
            placeholder="To"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
