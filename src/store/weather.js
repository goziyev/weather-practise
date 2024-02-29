import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getData = createAsyncThunk("getData", async (city = "fergana") => {
  const apiKey = "044b3793b9a0c1acae126a50411401bc";
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();
  return data;
});

const weather = createSlice({
  name: "weather",
  initialState: { weather: [], status: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state, actions) => {
        state.status = "pending";
      })
      .addCase(getData.fulfilled, (state, actions) => {
        state.status = "success";
        state.weather = actions.payload;
      })
      .addCase(getData.rejected, (state, actions) => {
        state.status = "rejected";
      });
  },
});

export default weather.reducer;
