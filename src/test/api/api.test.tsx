import axios from "axios";
import { getVehicles } from "../../api/api";
import { Vehicle, ApiResponse } from "../../custom-types/Index";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>; // Add this line

const API_URL = "https://run.mocky.io/v3/e7d5a5aa-8bdf-4a36-b6ab-134c08df916b";

describe("getVehicles", () => {
  it("fetches successfully data from an API", async () => {
    const mockData: Vehicle = {
      id: "1",
      image: "image-url",
      make: "make",
      model: "model",
      brand: "brand",
      mileage: 12345,
      firstRegistration: "2023-01-01",
      fuel: "gas",
      power: 120,
      co2: 100,
      vehicle_history: {
        reg_date: "2023-01-01",
        warranty: true,
        previous_owners: 1,
      },
      media: { final: [{ url: "image-url" }] },
      category: "sedan",
      color: "blue",
      drivetrain: {
        fuel: { type: "gas" },
        consumption: {
          consumption_outside: 10,
          combined_power_consumption: null,
          consumption_combined: 15,
        },
        co2_emissions: null,
        power: null,
      },
      climate: "automatic",
      price_data: {
        currency: "USD",
        ekprice: null,
        former_recommended_retail_price: 20000,
        maintenance_included: null,
        price: 20000,
        red_pen_price: "20000",
        registration_included: null,
        trader_price: 20000,
        transfer_costs: null,
        transfer_included: null,
        vat_rate: 20,
        vat_reclaimable: false,
        vehicle_delivery_included: null,
        wear_and_tear_included: null,
      },
      kilometer: 1000,
      performance: 120,
      technical_features: { engine_power_max: null },
      interior: { interior_color: "black" },
      comment: "data",
      vehicle_type: {
        condition: "USED",
      },
    };
    const responseData: ApiResponse = {
      records: [mockData],
      aggregations: {
        model: {},
        category: {},
        "drivetrain.fuel.type": {},
        "vehicle_history.reg_date": {},
        "interior.interior_color": {},
        climate: {},
      },
    };

    mockedAxios.get.mockResolvedValue({ data: responseData });

    const data = await getVehicles(1);

    expect(mockedAxios.get).toHaveBeenCalledWith(`${API_URL}?page=1`);
    expect(data).toEqual(responseData);
  });

  it("fetches erroneously data from an API", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Network Error"));

    await expect(getVehicles(1)).rejects.toThrow("Network Error");
  });
});
