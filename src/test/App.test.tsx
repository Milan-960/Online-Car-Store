import React, { ForwardedRef } from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

beforeEach(() => {
  window.scrollTo = jest.fn();
});

// Mock react and react-router-dom
jest.mock("react", () => {
  // Include all the existing exports from React
  const ActualReact = jest.requireActual("react");
  return {
    ...ActualReact,
    // Override the lazy function to return a mocked React component

    lazy: jest.fn().mockImplementation(() => {
      return ActualReact.forwardRef((props: any, ref: ForwardedRef<any>) => (
        // A dummy component that will be used instead of the actual lazy-loaded components
        <div ref={ref} {...props}>
          Mocked Component
        </div>
      ));
    }),
  };
});

// Mock the react-router-dom library
jest.mock("react-router-dom", () => {
  // Import the actual React Router DOM library
  const ActualReactRouterDom = jest.requireActual("react-router-dom");
  return {
    // Include all the existing exports from React Router DOM

    ...ActualReactRouterDom,

    // Override BrowserRouter to use MemoryRouter instead, this is required for testing
    BrowserRouter: ({ children }: { children: React.ReactNode }) => (
      <ActualReactRouterDom.MemoryRouter>
        {children}
      </ActualReactRouterDom.MemoryRouter>
    ),
  };
});

// Test suite for the App component
describe("App", () => {
  it("renders App component", async () => {
    render(<App />);

    // Expect the Mocked Component to be found in the document. This simulates the loading of the lazy component.
    await screen.findByText("Mocked Component");
  });
});
