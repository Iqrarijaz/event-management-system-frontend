import { Axios } from "@/interceptors";

export async function LIST_EVENTS(data) {
  try {
    const response = await Axios.get("/api/production-task", data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}

export async function CREATE_EVENT(data) {
  try {
    console.log("add data", data);
    const response = await Axios.post("/api/production-task/create", data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}

export async function UPDATE_EVENT(data) {
  try {
    const response = await Axios.put("/api/production-task/update", data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}

export async function DELETE_EVENT(id) {
  try {
    const response = await Axios.delete(`/api/production-task/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}

export async function GET_EVENT_CARDS() {
  try {
    const response = await Axios.get("/api/admin/dashboard/get");
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}