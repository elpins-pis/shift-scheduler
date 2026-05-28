import { useState } from "react";
import dayjs from "dayjs";
import { FiTrash2 } from "react-icons/fi";

const initialSchedules = {
  "2026-05-20": [
    { name: "김민수", type: "오전", color: "#4dabf7" },
    { name: "박지영", type: "OFF", color: "#868e96" },
  ],
  "2026-05-21": [{ name: "이준호", type: "야간", color: "#845ef7" }],
  "2026-05-25": [
    { name: "최유정", type: "오픈", color: "#20c997" },
    { name: "박민주", type: "오전", color: "#4dabf7" },
    { name: "정수민", type: "마감", color: "#ff922b" },
    { name: "한지호", type: "OFF", color: "#868e96" },
  ],
};

const employees = [
  { id: 1, name: "김민수" },
  { id: 2, name: "박지영" },
  { id: 3, name: "이준호" },
  { id: 4, name: "최유리" },
  { id: 5, name: "정수민" },
];

function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formDate, setFormDate] = useState(null);
  const [schedules, setSchedules] = useState(initialSchedules);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedShiftType, setSelectedShiftType] = useState("오전");
  const [editIndex, setEditIndex] = useState(null);

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = endOfMonth.date();

  const days = [];

  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const movePrevMonth = () => {
    setSelectedDate(null);
    setIsFormOpen(false);
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const moveNextMonth = () => {
    setSelectedDate(null);
    setIsFormOpen(false);
    setCurrentDate(currentDate.add(1, "month"));
  };

  const isToday = (day) => {
    if (!day) return false;

    return (
      currentDate.date(day).format("YYYY-MM-DD") ===
      dayjs().format("YYYY-MM-DD")
    );
  };

  const getDayColor = (day, index) => {
    if (!day) return "#222";

    const dayOfWeek = index % 7;

    if (dayOfWeek === 0) return "#e03131";
    if (dayOfWeek === 6) return "#1971c2";

    return "#222";
  };

  const getShiftColor = (type) => {
    if (type === "오전") return "#4dabf7";
    if (type === "오후") return "#20c997";
    if (type === "야간") return "#845ef7";
    if (type === "OFF") return "#868e96";
    if (type === "연차") return "#ff922b";

    return "#3182f6";
  };

  const handleSaveSchedule = () => {
    if (!formDate) {
      alert("날짜가 선택되지 않았습니다.");
      return;
    }

    if (!selectedEmployee) {
      alert("직원을 선택해주세요.");
      return;
    }

    const newSchedule = {
      name: selectedEmployee,
      type: selectedShiftType,
      color: getShiftColor(selectedShiftType),
    };

    setSchedules((prev) => {
      const currentList = [...(prev[formDate] || [])];

      if (editIndex !== null) {
        currentList[editIndex] = newSchedule;
      } else {
        currentList.push(newSchedule);
      }

      return {
        ...prev,
        [formDate]: currentList,
      };
    });

    setSelectedEmployee("");
    setSelectedShiftType("오전");
    setEditIndex(null);
    setIsFormOpen(false);
  };

  const handleDeleteSchedule = (date, index) => {
    setSchedules((prev) => {
      const updatedList = [...(prev[date] || [])];

      updatedList.splice(index, 1);

      return {
        ...prev,
        [date]: updatedList,
      };
    });
  };

  const handleOpenEditForm = (date, index, schedule) => {
    setFormDate(date);
    setSelectedEmployee(schedule.name);
    setSelectedShiftType(schedule.type);
    setEditIndex(index);
    setSelectedDate(null);
    setIsFormOpen(true);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <button onClick={movePrevMonth}>〈</button>
        <h2>{currentDate.format("YYYY년 M월")}</h2>
        <button onClick={moveNextMonth}>〉</button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          marginBottom: "10px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        <div style={{ color: "#e03131" }}>일</div>
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div style={{ color: "#1971c2" }}>토</div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "2px",
        }}
      >
        {days.map((day, index) => {
          const dateKey = day
            ? currentDate.date(day).format("YYYY-MM-DD")
            : null;

          const daySchedules = dateKey ? schedules[dateKey] || [] : [];

          return (
            <div
              key={index}
              onClick={() => {
                if (!day) return;
                if (selectedDate || isFormOpen) return;

                setSelectedDate(dateKey);
              }}
              style={{
                height: "90px",
                background:
                  day && selectedDate === dateKey ? "#edf4ff" : "#f8f9fb",
                border:
                  day && selectedDate === dateKey
                    ? "2px solid #3182f6"
                    : "1px solid transparent",
                borderRadius: "8px",
                padding: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "600",
                  marginBottom: "4px",
                  fontSize: "12px",
                  color: isToday(day) ? "#fff" : getDayColor(day, index),
                  background: isToday(day) ? "#3182f6" : "transparent",
                }}
              >
                {day}
              </div>

              {day && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  {daySchedules.map((schedule, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: schedule.color,
                        color: "#fff",
                        borderRadius: "6px",
                        padding: "2px 4px",
                        fontSize: "11px",
                      }}
                    >
                      {schedule.name} {schedule.type}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div
          onClick={() => setSelectedDate(null)}
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "calc(100% - 40px)",
              maxWidth: "360px",
              background: "#fff",
              borderRadius: "20px",
              padding: "20px",
              border: "1px solid #e9ecef",
              boxShadow: "none",
            }}
          >
            <button
              onClick={() => setSelectedDate(null)}
              style={{
                border: "none",
                background: "transparent",
                fontSize: "20px",
                float: "right",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <h3 style={{ marginBottom: "16px" }}>{selectedDate}</h3>

            {(schedules[selectedDate] || []).length === 0 ? (
              <div style={{ color: "#888", padding: "20px 0" }}>
                등록된 스케줄이 없습니다.
              </div>
            ) : (
              <div
                style={{
                  maxHeight: "260px",
                  overflowY: "auto",
                  paddingRight: "4px",
                }}
              >
                {schedules[selectedDate].map((schedule, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "#f8f9fb",
                      borderRadius: "12px",
                      padding: "14px",
                      marginBottom: "8px",
                    }}
                  >
                    <div
                      onClick={() =>
                        handleOpenEditForm(selectedDate, idx, schedule)
                      }
                      style={{
                        flex: 1,
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ fontWeight: "bold" }}>{schedule.name}</div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "999px",
                          background: schedule.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {schedule.type}
                      </div>

                      <button
                        onClick={() => handleDeleteSchedule(selectedDate, idx)}
                        style={{
                          border: "none",
                          background: "#fff5f5",
                          color: "#fa5252",
                          borderRadius: "999px",
                          width: "32px",
                          height: "32px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => {
                setFormDate(selectedDate);
                setSelectedEmployee("");
                setSelectedShiftType("오전");
                setEditIndex(null);
                setSelectedDate(null);
                setIsFormOpen(true);
              }}
              style={{
                width: "100%",
                marginTop: "16px",
                border: "none",
                background: "#3182f6",
                color: "#fff",
                borderRadius: "12px",
                padding: "14px",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              + 근무 등록
            </button>
          </div>
        </div>
      )}

      {isFormOpen && (
        <div
          onClick={() => setIsFormOpen(false)}
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "calc(100% - 40px)",
              maxWidth: "360px",
              background: "#fff",
              borderRadius: "20px",
              padding: "20px",
              border: "1px solid #e9ecef",
              boxShadow: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h3>{formDate} 근무 등록</h3>

              <button
                onClick={() => setIsFormOpen(false)}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <div style={{ marginBottom: "8px", fontSize: "14px" }}>
                직원명
              </div>

              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              >
                <option value="">직원 선택</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.name}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div style={{ marginBottom: "8px", fontSize: "14px" }}>
                근무 유형
              </div>

              <select
                value={selectedShiftType}
                onChange={(e) => setSelectedShiftType(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              >
                <option>오전</option>
                <option>오후</option>
                <option>야간</option>
                <option>OFF</option>
                <option>연차</option>
              </select>
            </div>

            <button
              onClick={handleSaveSchedule}
              style={{
                width: "100%",
                border: "none",
                background: "#3182f6",
                color: "#fff",
                borderRadius: "12px",
                padding: "14px",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              저장
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarPage;
