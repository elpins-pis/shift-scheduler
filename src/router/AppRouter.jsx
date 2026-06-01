import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import CalendarPage from "../pages/CalendarPage";
import StatsPage from "../pages/StatsPage";
import EmployeesPage from "../pages/EmployeesPage";
import SettingsPage from "../pages/SettingsPage";
import HelpPage from "../pages/HelpPage";

const initialShiftTypes = [
  {
    name: "오전",
    icon: "☀️",
    color: "#4dabf7",
    startTime: "09:00",
    endTime: "13:00",
    category: "WORK",
  },
  {
    name: "오후",
    icon: "🌤️",
    color: "#20c997",
    startTime: "13:00",
    endTime: "18:00",
    category: "WORK",
  },
  {
    name: "야간",
    icon: "🌙",
    color: "#845ef7",
    startTime: "22:00",
    endTime: "07:00",
    category: "WORK",
  },
  {
    name: "OFF",
    icon: "🏠",
    color: "#868e96",
    startTime: "",
    endTime: "",
    category: "OFF",
  },
  {
    name: "연차",
    icon: "🏖️",
    color: "#ff922b",
    startTime: "",
    endTime: "",
    category: "VACATION",
  },
];
const initialEmployees = [
  { id: 1, name: "김민수", role: "ADMIN" },
  { id: 2, name: "박지영", role: "USER" },
  { id: 3, name: "이준호", role: "USER" },
  { id: 4, name: "최유리", role: "USER" },
  { id: 5, name: "정수민", role: "USER" },
];
const initialSchedules = {
  "2026-05-20": [
    {
      name: "김민수",
      type: "오전",
      color: "#4dabf7",
      startTime: "09:00",
      endTime: "13:00",
      category: "WORK",
    },
    {
      name: "박지영",
      type: "OFF",
      color: "#868e96",
      startTime: "",
      endTime: "",
      category: "OFF",
    },
  ],
  "2026-05-21": [
    {
      name: "이준호",
      type: "야간",
      color: "#845ef7",
      startTime: "22:00",
      endTime: "07:00",
      category: "WORK",
    },
  ],
};
const initialPatternTemplates = [
  {
    id: 1,
    name: "기본 주간",
    days: ["OFF", "오전", "오전", "오전", "오전", "오전", "OFF"],
  },
  {
    id: 2,
    name: "야간 주간",
    days: ["OFF", "야간", "야간", "야간", "야간", "OFF", "OFF"],
  },
];
function AppRouter() {
  const [shiftTypes, setShiftTypes] = useState(initialShiftTypes);
  const [employees, setEmployees] = useState(initialEmployees);
  const [schedules, setSchedules] = useState(initialSchedules);
  const [patternTemplates, setPatternTemplates] = useState(
    initialPatternTemplates,
  );

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route
            path="/"
            element={
              <CalendarPage
                shiftTypes={shiftTypes}
                employees={employees}
                schedules={schedules}
                setSchedules={setSchedules}
                patternTemplates={patternTemplates}
              />
            }
          />
          <Route
            path="/stats"
            element={
              <StatsPage schedules={schedules} employees={employees} />
            }
          />
          <Route
            path="/employees"
            element={
              <EmployeesPage
                employees={employees}
                setEmployees={setEmployees}
                schedules={schedules}
                setSchedules={setSchedules}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <SettingsPage
                shiftTypes={shiftTypes}
                setShiftTypes={setShiftTypes}
                schedules={schedules}
                setSchedules={setSchedules}
                patternTemplates={patternTemplates}
                setPatternTemplates={setPatternTemplates}
              />
            }
          />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default AppRouter;
