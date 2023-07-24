import { renderHook } from "@testing-library/react-hooks";
import { VehicleContext } from "../../hooks/VehicleContext";
import useFetchVehicles from "../../hooks/useFetchVehicles";
import { getVehicles } from "../../api/api";
import { JSX } from "react/jsx-runtime";

// Mock your API
jest.mock("../../api/api");

const mockedGetVehicles = getVehicles as jest.MockedFunction<
  typeof getVehicles
>;

describe("useFetchVehicles hook", () => {
  let wrapper: ({ children }: { children: any }) => JSX.Element;

  // Mocking the functions and variables from the VehicleContext
  const setScrollPosition = jest.fn();
  const setVehicles = jest.fn();
  const setModelFilter = jest.fn();
  const setCategoryFilter = jest.fn();
  const resetScrollPosition = jest.fn();
  const scrollPosition = 0;

  // Mock context simulating the real context
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

  beforeEach(() => {
    wrapper = ({ children }) => (
      <VehicleContext.Provider value={mockContext}>
        {children}
      </VehicleContext.Provider>
    );
  });

  // Test case for fetching vehicles on initial render
  it("fetches vehicles on initial render", async () => {
    mockedGetVehicles.mockResolvedValueOnce({
      records: [],
      aggregations: {
        model: {},
        category: {},
        "drivetrain.fuel.type": {},
        "vehicle_history.reg_date": {},
        "interior.interior_color": {},
        climate: {},
      },
    });
    const { result, waitForNextUpdate } = renderHook(() => useFetchVehicles(), {
      wrapper,
    });

    expect(result.current.loading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
  });

  // Test case for handling errors on failed fetch
  it("sets error on failed fetch", async () => {
    mockedGetVehicles.mockRejectedValueOnce({
      message: "Cannot read properties of undefined (reading 'records')",
    });

    // Rendering the hook with the wrapper component
    const { result, waitForNextUpdate } = renderHook(() => useFetchVehicles(), {
      wrapper,
    });

    // Expecting that the hook starts in a loading state
    expect(result.current.loading).toBeTruthy();

    // Waiting for the hook to finish the fetch operation
    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBe(
      "Cannot read properties of undefined (reading 'records')"
    );
  });
});
