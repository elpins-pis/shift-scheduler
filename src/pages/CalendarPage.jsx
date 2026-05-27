import { useState } from "react";
import dayjs from "dayjs";

const schedules = {
  "2026-05-20": [
    {
      name: "김민수",
      type: "오전",
      color: "#4dabf7",
    },
    {
      name: "박지영",
      type: "OFF",
      color: "#868e96",
    },
  ],

  "2026-05-21": [
    {
      name: "이준호",
      type: "야간",
      color: "#845ef7",
    },
  ],

  "2026-05-25": [
    {
      name: "최유정",
      type: "오픈",
      color: "#20c997",
    },
    {
      name: "정수민",
      type: "마감",
      color: "#ff922b",
    },
    {
      name: "한지호",
      type: "OFF",
      color: "#868e96",
    },
  ],
};

function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);

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
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const moveNextMonth = () => {
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

    if (dayOfWeek === 0) return "#e03131"; // 일요일
    if (dayOfWeek === 6) return "#1971c2"; // 토요일

    return "#222";
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
                if (selectedDate) return;

                setSelectedDate(currentDate.date(day).format("YYYY-MM-DD"));
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
              {selectedDate && selectedDate !== "" && (
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
                    pointerEvents: "auto",
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
                      schedules[selectedDate].map((schedule, idx) => (
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
                          <div>
                            <div style={{ fontWeight: "bold" }}>
                              {schedule.name}
                            </div>
                            <div style={{ fontSize: "13px", color: "#666" }}>
                              {schedule.type}
                            </div>
                          </div>

                          <div
                            style={{
                              width: "10px",
                              height: "36px",
                              borderRadius: "999px",
                              background: schedule.color,
                            }}
                          />
                        </div>
                      ))
                    )}

                    <button
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
                      }}
                    >
                      + 근무 등록
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarPage;
