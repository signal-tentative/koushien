import { Routes, Route } from "react-router";
import App from "./App";
import Login from "./compornets/Login";
import SignUp from "./compornets/SignUp";
import AIques_s from "./compornets/student/AIques_s";
import Dashboard_s from "./compornets/student/Dashboard_s";

import Dashboard from "./compornets/instructer/Dashboard";

import "./App.css";
export function Roots() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<App />} />
        <Route path="/create" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard_s />} />
        <Route path="/aiques_s" element={<AIques_s />} />
      </Routes>
    </>
  );
}
