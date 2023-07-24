import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { BsFuelPump, BsCalendarEvent } from "react-icons/bs";
import { FaRoad } from "react-icons/fa";
import { IoLogoModelS } from "react-icons/io";
import { AiOutlineCloud, AiOutlinePicture } from "react-icons/ai";
import { GiPowerGenerator, GiPowerLightning } from "react-icons/gi";

import { Vehicle } from "@/custom-types/Index";
import { VehicleContext } from "../hooks/VehicleContext";

const VehicleTile: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  const { setScrollPosition, scrollPosition } = useContext(VehicleContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  const handleVehicleTileClick = () => {
    setScrollPosition(window.pageYOffset || document.documentElement.scrollTop);
    navigate(`/product/${vehicle.id}`);
  };

  return (
    <div
      className="vehicle-tile"
      data-testid="vehicle-tile"
      onClick={handleVehicleTileClick}
    >
      <div className="vehicle-tile__vehicle">
        {vehicle.media && vehicle.media.final.length > 0 && (
          <div className="vehicle-tile__image-container">
            <LazyLoadImage
              effect="blur"
              src={vehicle.media.final[0].url}
              alt={`${vehicle.make} ${vehicle.model}`}
            />
            <span className="vehicle-tile__image-count">
              <AiOutlinePicture />
              {vehicle.media.final.length}
            </span>
          </div>
        )}

        <h3 className="vehicle-tile__brand">{vehicle.brand}</h3>

        <div className="vehicle-tile__specs">
          <p className="vehicle-tile__spec">
            <IoLogoModelS /> {vehicle.model}
          </p>
          <p className="vehicle-tile__spec">
            <FaRoad /> {vehicle.kilometer} KM
          </p>
          <p className="vehicle-tile__spec">
            <BsCalendarEvent /> {vehicle.vehicle_history.reg_date}
          </p>
          <p className="vehicle-tile__spec">
            <BsFuelPump /> {vehicle.drivetrain.fuel.type}
          </p>

          {vehicle.technical_features?.engine_power_max && (
            <p className="vehicle-tile__spec">
              <GiPowerLightning /> {vehicle.technical_features.engine_power_max}
              /hp
            </p>
          )}

          <p className="vehicle-tile__spec">
            <GiPowerGenerator />
            {vehicle.drivetrain.consumption?.consumption_combined} l/km (comb.)*
          </p>

          <p className="vehicle-tile__spec">
            <AiOutlineCloud /> {vehicle.performance} g/km (comb.)*
          </p>
        </div>
      </div>
    </div>
  );
};

export default VehicleTile;
