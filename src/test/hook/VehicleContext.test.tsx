import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import { VehicleProvider, VehicleContext } from "../../hooks/VehicleContext";

describe("VehicleProvider", () => {
  // The beforeAll function runs before all tests in this suite
  beforeAll(() => {
    // We mock window.scrollTo to avoid errors
    window.scrollTo = jest.fn();
  });

  // We define a test case "matches snapshot"
  it("matches snapshot", () => {
    // We use the render function to render the VehicleProvider component with a test div
    const { asFragment } = render(
      <VehicleProvider>
        <div>Test</div>
      </VehicleProvider>
    );

    // We check if the snapshot of this component matches the previous one
    expect(asFragment()).toMatchSnapshot();
  });

  // Define another test case "provides context values"
  it("provides context values", () => {
    // define a TestComponent which uses our context
    const TestComponent = () => {
      // the useContext function to get the current context
      const context = useContext(VehicleContext);

      // TestComponent renders some values from the context
      return (
        <div>
          {context.vehicles.length}
          {context.scrollPosition}
          {context.modelFilter}
          {context.categoryFilter}
        </div>
      );
    };

    // Render the VehicleProvider with the TestComponent as child
    render(
      <VehicleProvider>
        <TestComponent />
      </VehicleProvider>
    );

    // check if the values provided by the context are rendered correctly
    expect(screen.getByText("00")).toBeInTheDocument();
  });
});
