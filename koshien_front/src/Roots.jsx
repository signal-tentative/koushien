import { Routes, Route } from "react-router";
import App from "./App";
import Login from "./compornets/Login";
import SignUp from "./compornets/SignUp";

import Dashboard_s from "./compornets/student/Dashboard_s";

import Dashboard from "./compornets/instructer/Dashboard";

import Live from "./compornets/instructer/Live";
import "./App.css";
export function Roots() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<App />} />
        <Route path="/create" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/live" element={<Live />} />
      </Routes>
    </>
  );
}
