import axios from "axios";

const API_BASE_URL = "https://petstore.swagger.io/v2";

export interface Pet {
  id: number;
  name: string;
  status: "available" | "pending" | "sold";
  category?: {
    id: number;
    name: string;
  };
  photoUrls?: string[];
  tags?: {
    id: number;
    name: string;
  }[];
}

export const login = async (username: string, password: string) => {
  const response = await axios.get(`${API_BASE_URL}/user/login`, {
    params: { username, password },
  });
  return response.data;
};

export const getPetsByStatus = async (status: string): Promise<Pet[]> => {
  const response = await axios.get(`${API_BASE_URL}/pet/findByStatus`, {
    params: { status },
  });
  return response.data;
};

export const getPetById = async (id: number): Promise<Pet> => {
  const response = await axios.get(`${API_BASE_URL}/pet/${id}`);
  return response.data;
};

export const updatePet = async (pet: Pet): Promise<Pet> => {
  const response = await axios.put(`${API_BASE_URL}/pet`, pet);
  return response.data;
};
