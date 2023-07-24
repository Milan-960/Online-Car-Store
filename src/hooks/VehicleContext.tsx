import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Vehicle } from "../custom-types/Index";

interface VehicleContextProps {
  vehicles: Vehicle[];
  scrollPosition: number;
  setVehicles: Dispatch<SetStateAction<Vehicle[]>>;
  setScrollPosition: Dispatch<SetStateAction<number>>;
  modelFilter: string;
  categoryFilter: string;
  setModelFilter: Dispatch<SetStateAction<string>>;
  setCategoryFilter: Dispatch<SetStateAction<string>>;
  resetScrollPosition: () => void;
}

export const VehicleContext = createContext<VehicleContextProps>({
  vehicles: [],
  scrollPosition: 0,
  setVehicles: () => {},
  setScrollPosition: () => {},
  modelFilter: "",
  categoryFilter: "",
  setModelFilter: () => {},
  setCategoryFilter: () => {},
  resetScrollPosition: () => {},
});

interface VehicleProviderProps {
  children: ReactNode;
}

export const VehicleProvider: React.FC<VehicleProviderProps> = ({
  children,
}) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [modelFilter, setModelFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const resetScrollPosition = () => setScrollPosition(0);

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        setVehicles,
        scrollPosition,
        setScrollPosition,
        modelFilter,
        setModelFilter,
        categoryFilter,
        setCategoryFilter,
        resetScrollPosition,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};
