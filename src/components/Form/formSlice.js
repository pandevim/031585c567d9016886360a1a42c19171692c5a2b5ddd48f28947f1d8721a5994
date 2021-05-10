import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import low from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";

const adapter = new LocalStorage("db");
const db = low(adapter);

const initialState = {
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
};

db.defaults({
  form: initialState,
}).write();

const saveDataLocally = createAsyncThunk(
  "form/saveDataLocally",
  async (_, { getState }) => {
    const { recipes, ingredients } = getState();
    return db.get("form").set({ recipes, ingredients }).write();
  }
);

export const formSlice = createSlice({
  name: "form",
  initialState: initialState,
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
