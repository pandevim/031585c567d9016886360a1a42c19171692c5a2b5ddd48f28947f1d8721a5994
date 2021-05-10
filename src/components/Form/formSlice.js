import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "utils";

// Setup Local Storage on first Visit
if (db.getState()) {
  db.defaults({
    form: {
      recipes: [
        {
          _id: "",
          name: "",
          steps: [""],
          url: "",
          ingredients: [{ name: "", quantity: "", unit: "" }],
        },
      ],
      ingredients: [{ name: "all", _id: "" }],
    },
  }).write();
}

const saveDataLocally = createAsyncThunk(
  "form/saveDataLocally",
  async (_, { getState }) => {
    const { form } = getState();
    return db.set("form", form).write();
  }
);

export const formSlice = createSlice({
  name: "form",
  initialState: db.getState().form,
  reducers: {
    saveRecipe: (state, action) => {
      state.recipes.push(action.payload);
    },
    saveIngredient: (state, action) => {
      state.ingredients.push(...action.payload);
    },
  },
  extraReducers: {
    [saveDataLocally.fulfilled]: (state, action) => {
      console.log("saved locally");
    },
  },
});

export const { saveRecipe, saveIngredient } = formSlice.actions;
export { saveDataLocally };

export default formSlice.reducer;
