import React, { useRef } from "react";
import "./index.css";
import { useSelector } from "react-redux";
import { getData } from "../../store/weather";
import { RingLoader } from "react-spinners";

export default function Weahter({ dispatch }) {
  const city = useRef();
  function handleClick() {
    dispatch(getData(city.current.value));
  }

  let loader = "pending";
  const data = useSelector((state) => state.weather.weather);
  if (data != "city not found") {
    loader = useSelector((state) => state.weather.status);
  }
  console.log(15, data);
  return (
    <div
      className="background"
      style={{
        backgroundImage:
          data.message !== "city not found"
            ? "url('https://source.unsplash.com/1600x900/?" +
              city.current.value +
              "')"
            : "https://mlx3lspc9ed5.i.optimole.com/cb:iQfv.350f5/w:auto/h:auto/q:mauto/https://www.bluehost.com/blog/wp-content/uploads/2023/07/What-is-a-404-error-code.png",
      }}
    >
      <div className="weather-card">
        <div className="search">
          <input
            type="search"
            placeholder="enter city name"
            spellCheck="false"
            ref={city}
          />
          <button onClick={handleClick}>
            <i className="bi bi-search" />
          </button>
        </div>
        {loader === "pending" && (
          <div className="sweet-loading">
            <RingLoader color={"#123abc"} size={150} />
          </div>
        )}
        {loader === "success" && data.message !== "city not found" && (
          <div className="weather">
            <img
              className="weather-icon"
              src="https://static.vecteezy.com/system/resources/previews/024/825/182/non_2x/3d-weather-icon-day-with-rain-free-png.png"
              alt="..."
            />
            <h1 className="temp">{data.main.temp}°C </h1>
            <h2 className="city">{data.name}</h2>
            <div className="details">
              <div style={{ display: "flex" }} className="col">
                <img
                  className="humi"
                  src="https://static-00.iconduck.com/assets.00/humidity-icon-2048x1675-xxsge5os.png"
                />
                <div className="info">
                  <p className="humidity">{data.main.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="col">
                <img src="https://cdn-icons-png.flaticon.com/512/136/136712.png" />
                <div className="info">
                  <p className="wind"> 1.2 km/h</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {data.message == "city not found" && (
          <p style={{ fontSize: "18px", marginTop: "25px" }}>Topilmadi !!!</p>
        )}
      </div>
    </div>
  );
}
