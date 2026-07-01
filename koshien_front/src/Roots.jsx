import { Routes, Route } from "react-router";
import App from "./App";
import Login from "./compornets/Login";
import Dashboard from "./compornets/Dashboard";
import "./App.css";
export function Roots() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}
