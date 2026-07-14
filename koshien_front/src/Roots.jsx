import { Routes, Route } from "react-router";
import App from "./App";
import Login from "./compornets/Login";
import SignUp from "./compornets/SignUp";
import AIques_s from "./compornets/student/AIques_s";
import Dashboard_s from "./compornets/student/Dashboard_s";

import Dashboard from "./compornets/instructer/Dashboard";
import DashBoard from "./compornets/dashboard/DashBoard";

import Live from "./compornets/live/Live";
import Slide from "./compornets/instructer/Slide";
import "./App.css";
import { LectureUpload } from "./compornets/FileUpload";
import Recording from "./compornets/live/recording/Recording";
import Phone from "./compornets/phone/phone";
export function Roots() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<App />} />
        <Route path="/create" element={<SignUp />} />

        <Route path="/dashboard_s" element={<Dashboard_s />} />
        <Route path="/aiques_s" element={<AIques_s />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/live" element={<Live />} />

        <Route path="/slide" element={<Slide />} />

        <Route path="/pdf" element={<LectureUpload />} />
        <Route path="/dashman" element={<DashBoard />} />
        <Route path="/reco" element={<Recording />} />
        <Route path="/what" element={<Recording />} />
        <Route path="/phone" element={<Phone />} />
      </Routes>
    </>
  );
}
