export interface Vehicle {
  id: string;
  image: string;
  make: string;
  model: string;
  brand: string;
  mileage: number;
  firstRegistration: string;
  fuel: string;
  power: number;
  co2: number;
  vehicle_history: VehicleHistory;
  media: Media;
  category: string;
  color: string;
  drivetrain: {
    fuel: {
      type: string;
    };
    consumption: {
      consumption_outside: number;
      combined_power_consumption: number | null;
      consumption_combined: number;
    };
    co2_emissions: number | null; // for CO2 emissions Was not able to locate
    power: number | null; // for horsepower co2_emissions: number | null Was not able to locate
  };
  climate: string;
  price_data: PriceData;
  kilometer: number;
  performance: number;
  technical_features: TechnicalFeatures;
  interior: {
    interior_color: string;
  };
  comment: string;
  vehicle_type: VehicleType;
}

export interface Media {
  final: { url: string }[];
}

export interface VehicleType {
  condition: string;
}

export interface VehicleHistory {
  reg_date: string;
  warranty: boolean;
  previous_owners: number;
}

export interface PriceData {
  currency: string;
  ekprice: number | null;
  former_recommended_retail_price: number;
  maintenance_included: boolean | null;
  price: number;
  red_pen_price: string;
  registration_included: boolean | null;
  trader_price: number;
  transfer_costs: number | null;
  transfer_included: boolean | null;
  vat_rate: number;
  vat_reclaimable: boolean;
  vehicle_delivery_included: boolean | null;
  wear_and_tear_included: boolean | null;
}

export interface TechnicalFeatures {
  engine_power_max: number | null;
}

export interface ApiResponse {
  records: Vehicle[];
  aggregations: {
    model: {
      [key: string]: any;
    };
    category: {
      [key: string]: any;
    };
    "drivetrain.fuel.type": {
      [key: string]: any;
    };
    "vehicle_history.reg_date": {
      [key: string]: any;
    };
    "interior.interior_color": {
      [key: string]: any;
    };
    climate: {
      [key: string]: any;
    };
  };
}

export interface FilterProps {
  models: string[];
  categories: string[];
  fuelTypes: string[];
  climate: string[];
  interiorColors: string[];

  onModelChange: (model: string) => void;
  onCategoryChange: (category: string) => void;
  onFuelTypeChange: (fuelType: string) => void;
  onClimateChange: (climate: string) => void;
  onMinPriceChange: (minPrice: number) => void;
  onMaxPriceChange: (maxPrice: number) => void;
  onMinRegYearChange: (minRegYear: number) => void;
  onMaxRegYearChange: (maxRegYear: number) => void;
  onMinKmChange: (minKm: number) => void;
  onMaxKmChange: (maxKm: number) => void;
  onMinEnginePowerChange: (minPower: number) => void;
  onMaxEnginePowerChange: (maxPower: number) => void;
  onInteriorColorChange: (color: string) => void;
}
