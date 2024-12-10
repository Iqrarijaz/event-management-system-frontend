import { Axios } from "@/interceptors";

export async function LIST_EVENTS(data) {
  try {
    const response = await Axios.get('/api/events', {
      params: data,  
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}



export async function CREATE_EVENT(data) {
  try {
    console.log("add data", data);
    const response = await Axios.post("/api/events", data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}

export async function UPDATE_EVENT(data) {
  try {
    const response = await Axios.put(`/api/events/${data._id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}

export async function DELETE_EVENT(data) {
  try {
    const response = await Axios.delete(`/api/events/${data._id}/${data.password}`);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}

export async function GET_EVENT_CARDS() {
  try {
    const response = await Axios.get("/api/events/cards");
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}
