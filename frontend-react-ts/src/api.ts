import axios from "axios";

const API_URL = "http://localhost:3000";

export interface SignInResponse {
  token: string;
}

export const signIn = async (email: string, password: string): Promise<SignInResponse> => {
  const response = await axios.post(`${API_URL}/auth/signin`, { email, password });
  return response.data;
};

export interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const signUp = async (body: SignUpRequest): Promise<SignInResponse> => {
  const response = await axios.post(`${API_URL}/auth/signup`, body);

  return response.data;
};

export const getProfile = async (token: string) => {
  const response = await axios.get(`${API_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
