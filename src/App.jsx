import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Weahter from "./components/weather";
import { getData } from "./store/weather";
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData("fergana"));
  }, []);

  return (
    <>
      <Weahter dispatch={dispatch} />
    </>
  );
}
