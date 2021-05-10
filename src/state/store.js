import { configureStore } from "@reduxjs/toolkit";
import formReducer from "components/Form/formSlice";

export default configureStore({
  reducer: {
    form: formReducer,
  },
});
