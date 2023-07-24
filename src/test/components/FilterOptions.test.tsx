import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterOptions from "../../components/FilterOptions";
import {
  priceFromOptions,
  priceToOptions,
  regYearFromOptions,
  regYearToOptions,
  kilometerFromOptions,
  kilometerToOptions,
  enginePowerFromOptions,
  enginePowerToOptions,
} from "../../constants/Filter-constant";

describe("FilterOptions", () => {
  it("renders the FilterOptions component", async () => {
    const models = ["Golf", "Audi", "BMW"];
    const categories = ["OFFROAD", "SMALLCAR", "VAN"];
    const fuelTypes = ["DIESEL", "PETROL", "ELECTRICITY"];
    const climate = [
      "AUTOMATIC_CLIMATISATION",
      "MANUAL_CLIMATISATION",
      "NO_CLIMATISATION",
    ];
    const interiorColors = ["GREAY", "BLACK", "BLUE"];

    // Mock functions for onChange
    const mockOnModelChange = jest.fn();
    const mockOnCategoryChange = jest.fn();
    const mockOnFuelTypeChange = jest.fn();
    const mockOnClimateChange = jest.fn();
    const mockOnMinPriceChange = jest.fn();
    const mockOnMaxPriceChange = jest.fn();
    const mockOnMinRegYearChange = jest.fn();
    const mockOnMaxRegYearChange = jest.fn();
    const mockOnMinKmChange = jest.fn();
    const mockOnMaxKmChange = jest.fn();
    const mockOnMinEnginePowerChange = jest.fn();
    const mockOnMaxEnginePowerChange = jest.fn();
    const mockOnInteriorColorChange = jest.fn();

    // render the component with test data and mock functions
    render(
      <FilterOptions
        models={models}
        categories={categories}
        fuelTypes={fuelTypes}
        climate={climate}
        interiorColors={interiorColors}
        onModelChange={mockOnModelChange}
        onCategoryChange={mockOnCategoryChange}
        onFuelTypeChange={mockOnFuelTypeChange}
        onClimateChange={mockOnClimateChange}
        onMinPriceChange={mockOnMinPriceChange}
        onMaxPriceChange={mockOnMaxPriceChange}
        onMinRegYearChange={mockOnMinRegYearChange}
        onMaxRegYearChange={mockOnMaxRegYearChange}
        onMinKmChange={mockOnMinKmChange}
        onMaxKmChange={mockOnMaxKmChange}
        onMinEnginePowerChange={mockOnMinEnginePowerChange}
        onMaxEnginePowerChange={mockOnMaxEnginePowerChange}
        onInteriorColorChange={mockOnInteriorColorChange}
      />
    );

    // identify all select elements in the rendered component
    const selectElements = screen.getAllByRole("combobox");
    expect(selectElements).toHaveLength(13);

    // Define the expected options for each select box
    const selectOptions = [
      ["Golf", "Audi", "BMW"],
      ["OFFROAD", "SMALLCAR", "VAN"],
      ["DIESEL", "PETROL", "ELECTRICITY"],
      ["AUTOMATIC_CLIMATISATION", "MANUAL_CLIMATISATION", "NO_CLIMATISATION"],
      ["GREAY", "BLACK", "BLUE"],
      priceFromOptions.map((option) => option.label),
      priceToOptions.map((option) => option.label),
      regYearFromOptions.map((option) => option.label),
      regYearToOptions.map((option) => option.label),
      kilometerFromOptions.map((option) => option.label),
      kilometerToOptions.map((option) => option.label),
      enginePowerFromOptions.map((option) => option.label),
      enginePowerToOptions.map((option) => option.label),
    ];

    // iterate over each select element
    for (let i = 0; i < selectElements.length; i++) {
      const select = selectElements[i];
      // Open each select dropdown
      userEvent.click(select);
      // Wait for options to be visible
      for (let option of selectOptions[i]) {
        await screen.findByText(option);
      }
      // Close each select dropdown
      userEvent.click(document.body);
    }
  });
});
