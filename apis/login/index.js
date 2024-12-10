import axios from "axios";
import { baseUrl } from "@/config";
export async function LOGIN(data) {
  try {
    const response = await axios.post(`${baseUrl}/api/auth/login`, data);
    return response.data;
  } catch (error) {
    console.error("Invalid email or password", error);
    throw error;
  }
}


export async function REGISTER(data) {
  try {
    const response = await axios.post(`${baseUrl}/api/auth/register`, data);
    return response.data;
  } catch (error) {
    console.error("Invalid email or password", error);
    throw error;
  }
}
