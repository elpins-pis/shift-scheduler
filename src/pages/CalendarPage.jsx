import { useState } from "react";
import dayjs from "dayjs";
import { FiTrash2, FiChevronLeft, FiChevronRight } from "react-icons/fi";

function CalendarPage({ shiftTypes, employees, schedules, setSchedules }) {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formDate, setFormDate] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedShiftType, setSelectedShiftType] = useState("오전");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("13:00");
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
    const shiftType = shiftTypes.find((item) => item.name === type);

    return shiftType ? shiftType.color : "#3182f6";
  };

  const getShiftIcon = (type) => {
    const shiftType = shiftTypes.find((item) => item.name === type);

    return shiftType ? shiftType.icon : "•";
  };

  const getShiftCategory = (type) => {
    const shiftType = shiftTypes.find((item) => item.name === type);

    return shiftType ? shiftType.category || "WORK" : "WORK";
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
      icon: getShiftIcon(selectedShiftType),
      color: getShiftColor(selectedShiftType),
      category: getShiftCategory(selectedShiftType),
      startTime,
      endTime,
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
    setStartTime("09:00");
    setEndTime("13:00");
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
    setStartTime(schedule.startTime || "09:00");
    setEndTime(schedule.endTime || "13:00");
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
        <button
          onClick={movePrevMonth}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            border: "1px solid #e9ecef",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <FiChevronLeft size={22} />
        </button>

        <h2 style={{ fontSize: "20px", fontWeight: "700" }}>
          {currentDate.format("YYYY년 M월")}
        </h2>

        <button
          onClick={moveNextMonth}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            border: "1px solid #e9ecef",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <FiChevronRight size={22} />
        </button>
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
                        color: "#222",
                        fontSize: "10px",
                        lineHeight: "1.2",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {schedule.icon || getShiftIcon(schedule.type)}{" "}
                      {schedule.name}{" "}
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
                      <div style={{ fontWeight: "bold" }}>
                        {schedule.name}
                        {schedule.startTime && schedule.endTime && (
                          <span
                            style={{
                              marginLeft: "8px",
                              fontSize: "12px",
                              color: "#868e96",
                              fontWeight: "400",
                            }}
                          >
                            {schedule.startTime} ~ {schedule.endTime}
                          </span>
                        )}
                      </div>{" "}
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
                          minWidth: "52px",
                          height: "28px",
                          borderRadius: "999px",

                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",

                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        {schedule.icon || getShiftIcon(schedule.type)}{" "}
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
                onChange={(e) => {
                  const selectedType = shiftTypes.find(
                    (item) => item.name === e.target.value,
                  );

                  setSelectedShiftType(e.target.value);

                  if (selectedType) {
                    setStartTime(selectedType.startTime || "");
                    setEndTime(selectedType.endTime || "");
                  }
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              >
                {shiftTypes.map((shiftType) => (
                  <option key={shiftType.name} value={shiftType.name}>
                    {shiftType.name}
                  </option>
                ))}
              </select>
              <div style={{ marginTop: "20px", marginBottom: "16px" }}>
                {" "}
                <div style={{ marginBottom: "8px", fontSize: "14px" }}>
                  시작시간
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    style={{
                      flex: 1,
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid #ddd",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginTop: "8px", marginBottom: "24px" }}>
                {" "}
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ marginBottom: "8px", fontSize: "14px" }}>
                    종료시간
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      style={{
                        flex: 1,
                        padding: "12px",
                        borderRadius: "10px",
                        border: "1px solid #ddd",
                      }}
                    />
                  </div>
                </div>
              </div>
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
