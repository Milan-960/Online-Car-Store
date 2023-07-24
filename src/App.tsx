import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import { VehicleProvider } from "./hooks/VehicleContext";

const ListingPage = lazy(() => import("./pages/ListingPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));

function App() {
  return (
    <>
      <VehicleProvider>
        <Router>
          <Suspense
            fallback={
              <div className="spinner">
                <ThreeDots color="#E8E41E" height={100} width={100} />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<ListingPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </Suspense>
        </Router>
      </VehicleProvider>
    </>
  );
}

export default App;
