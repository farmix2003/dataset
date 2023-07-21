import { configureStore } from "@reduxjs/toolkit";
import EntityReducer from "../slice/entity";

export default configureStore({
  reducer: {
    entity: EntityReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
