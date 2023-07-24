import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ThreeDots } from "react-loader-spinner";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { VehicleContext } from "../hooks/VehicleContext";
import { Vehicle } from "../custom-types/Index";
import { getVehicles } from "../api/api";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const { scrollPosition } = useContext(VehicleContext);

  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    window.scrollTo(0, scrollPosition);

    const fetchVehicleDetails = async () => {
      const response = await getVehicles(); // Call the getVehicles function
      const foundVehicle = response.records.find((record) => record.id === id);
      setVehicle(foundVehicle ?? null);
    };

    fetchVehicleDetails();
  }, [id, scrollPosition]);

  if (!vehicle) {
    return (
      <div className="spinner">
        <ThreeDots color="#E8E41E" height={100} width={100} />
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="product-header">
        <div className="back-link">
          <button onClick={navigateBack}>Back to Vehicles</button>
        </div>
      </div>

      {vehicle && (
        <div className="vehicle-details">
          <Carousel className="vehicle-image-carousel" showThumbs={false}>
            {vehicle.media.final.map((mediaItem, index) => (
              <div key={index}>
                <img src={mediaItem.url} alt={`Vehicle ${index + 1}`} />
              </div>
            ))}
          </Carousel>
          <h1>{vehicle.brand}</h1>
        </div>
      )}

      <div className="vehicle-data-wrapper">
        <h2>VEHICLE DETAILS</h2>
        <div className="vehicle-data">
          <div className="detail">
            <p>Model: {vehicle.model}</p>
          </div>
          <p>Fuel: {vehicle.drivetrain.fuel.type}</p>
          <p>Vehicle type: {vehicle.vehicle_type.condition}</p>
          <p>Permit: {vehicle.vehicle_history.reg_date}</p>
          <p>Guarantee: {vehicle.vehicle_history?.warranty ? "yes" : "no"}</p>
          <p>Performance: {vehicle.performance} g/km (comb.)*</p>
          <p>Interior colour: {vehicle.interior.interior_color}</p>
          <p>Previous owner: {vehicle.vehicle_history?.previous_owners} </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
