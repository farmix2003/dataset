import axios from "./api";

const EntityService = {
  async getEntities() {
    const { data } = await axios.get("/entities");
    return data;
  },
  async getEntityDetails(id) {
    const { data } = await axios.get(`/entities/${id}`);
    return data;
  },
  async postEntity(entity) {
    try {
      const { data } = await axios.post("/entities", { entity });
      return data;
    } catch (error) {
      console.log("Error creating dataset:", error);
      throw error;
    }
  },
  async deleteEntity(id) {
    const { data } = await axios.delete(`/entities/${id}`);
    return data;
  },
  async editEntity(id, entity) {
    try {
      const { data } = await axios.put(`/entities/${id}`, { entity });
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default EntityService;
