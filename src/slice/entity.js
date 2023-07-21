import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: [],
  entityDetail: null,
};
export const entitySlice = createSlice({
  name: "entity",
  initialState,
  reducers: {
    getEntitySuccess: (state, action) => {
      state.entities = action.payload;
    },
    addEntity: (state, action) => {
      state.entities.push(action.payload);
    },
    updateEntity(state, action) {
      const updatedEntity = action.payload;
      const entityIndex = state.entities.findIndex(
        (entity) => entity.id === updatedEntity.id
      );
      if (entityIndex !== -1) {
        state.entities[entityIndex] = updatedEntity;
      }
    },
    removeEntity: (state, action) => {
      const entityId = action.payload;
      state.entities = state.entities.filter(
        (entity) => entity.id !== entityId
      );
    },
    getEntitydetailSuccess: (state, action) => {
      state.entityDetail = action.payload;
    },
  },
});

export const {
  getEntitySuccess,
  addEntity,
  updateEntity,
  getEntitydetailSuccess,
  removeEntity,
  entityDetail,
} = entitySlice.actions;
export default entitySlice.reducer;
