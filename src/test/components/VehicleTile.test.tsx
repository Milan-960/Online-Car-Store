import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import VehicleTile from "../../components/VehicleTile";
import { VehicleContext } from "../../hooks/VehicleContext";

const mockVehicle = {
  id: "1",
  image: "/path/to/image.jpg",
  make: "Mock Make",
  model: "Mock Model",
  brand: "Mock Brand",
  mileage: 10000,
  firstRegistration: "2021-01-01",
  fuel: "Gasoline",
  power: 150,
  co2: 120,
  vehicle_history: {
    reg_date: "2023-01-01",
    warranty: true,
    previous_owners: 1,
  },
  media: { final: [{ url: "/path/to/image.jpg" }] },
  category: "Sedan",
  color: "Red",
  drivetrain: {
    fuel: {
      type: "Gasoline",
    },
    consumption: {
      consumption_outside: 7.5,
      combined_power_consumption: null,
      consumption_combined: 8.5,
    },
    co2_emissions: null,
    power: null,
  },
  climate: "AC",
  price_data: {
    currency: "USD",
    ekprice: null,
    former_recommended_retail_price: 30000,
    maintenance_included: null,
    price: 28000,
    red_pen_price: "25000",
    registration_included: null,
    trader_price: 27000,
    transfer_costs: null,
    transfer_included: null,
    vat_rate: 20,
    vat_reclaimable: false,
    vehicle_delivery_included: null,
    wear_and_tear_included: null,
  },
  kilometer: 20000,
  performance: 180,
  technical_features: {
    engine_power_max: 200,
  },
  interior: {
    interior_color: "Black",
  },
  comment: "data",
  vehicle_type: {
    condition: "USED",
  },
};

// Mock CSS import
jest.mock("react-lazy-load-image-component/src/effects/blur.css", () => {});

let mockNavigate: any;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  window.scrollTo = jest.fn();
});

describe("VehicleTile", () => {
  const setScrollPosition = jest.fn();
  const setVehicles = jest.fn();
  const setModelFilter = jest.fn();
  const setCategoryFilter = jest.fn();
  const resetScrollPosition = jest.fn();
  const scrollPosition = 0;
  const history = createMemoryHistory();
  const mockContext = {
    setScrollPosition,
    setVehicles,
    scrollPosition,
    vehicles: [],
    modelFilter: "",
    categoryFilter: "",
    setModelFilter,
    setCategoryFilter,
    resetScrollPosition,
  };

  it("renders the vehicle tile with correct information", () => {
    render(
      <BrowserRouter>
        <VehicleContext.Provider value={mockContext}>
          <VehicleTile vehicle={mockVehicle} />
        </VehicleContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(mockVehicle.brand)).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.model)).toBeInTheDocument();
    expect(screen.getByText(`${mockVehicle.kilometer} KM`)).toBeInTheDocument();
    expect(
      screen.getByText(mockVehicle.vehicle_history.reg_date)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockVehicle.drivetrain.fuel.type)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockVehicle.technical_features.engine_power_max}/hp`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockVehicle.performance} g/km (comb.)*`)
    ).toBeInTheDocument();
  });

  it("renders the vehicle image and image count when media is present", () => {
    render(
      <BrowserRouter>
        <VehicleContext.Provider value={mockContext}>
          <VehicleTile vehicle={mockVehicle} />
        </VehicleContext.Provider>
      </BrowserRouter>
    );

    expect(
      screen.getByAltText(`${mockVehicle.make} ${mockVehicle.model}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockVehicle.media.final.length}`)
    ).toBeInTheDocument();
  });

  it("triggers navigation on click", () => {
    mockNavigate = jest.fn();

    const { getByTestId } = render(
      <BrowserRouter>
        <VehicleContext.Provider value={mockContext}>
          <VehicleTile vehicle={mockVehicle} />
        </VehicleContext.Provider>
      </BrowserRouter>
    );

    const tile = screen.getByTestId("vehicle-tile");
    fireEvent.click(tile);

    expect(mockNavigate).toHaveBeenCalledWith(`/product/${mockVehicle.id}`);
  });

  afterEach(() => {
    mockNavigate = null;
  });
});
