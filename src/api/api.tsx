import axios from "axios";
import { ApiResponse } from "../custom-types/Index";

const API_URL = "https://run.mocky.io/v3/e7d5a5aa-8bdf-4a36-b6ab-134c08df916b";

export const getVehicles = async (page: number = 1): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(`${API_URL}?page=${page}`);
  return response.data;
};
