import { useState } from "react";

function SettingsPage({ shiftTypes, setShiftTypes }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newIcon, setNewIcon] = useState("☀️");
  const handleAddShiftType = () => {
    if (!newName.trim()) {
      alert("근무유형 이름을 입력해주세요.");
      return;
    }

    setShiftTypes((prev) => [
      ...prev,
      {
        name: newName,
        icon: newIcon,
        color: "#3182f6",
        startTime: "",
        endTime: "",
      },
    ]);

    setNewName("");
    setNewIcon("☀️");
    setIsOpen(false);
  };

  return (
    <div>
      <h1 style={{ fontSize: "22px", marginBottom: "20px" }}>설정</h1>

      <div
        style={{
          background: "#fff",
          border: "1px solid #e9ecef",
          borderRadius: "16px",
          padding: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h2 style={{ fontSize: "18px" }}>근무유형 관리</h2>

          <button
            onClick={() => setIsOpen(true)}
            style={{
              border: "none",
              background: "#3182f6",
              color: "#fff",
              borderRadius: "10px",
              padding: "8px 12px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            + 추가
          </button>
        </div>

        {shiftTypes.map((shiftType) => (
          <div
            key={shiftType.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#f8f9fb",
              borderRadius: "12px",
              padding: "12px",
              marginBottom: "8px",
            }}
          >
            <div style={{ fontWeight: "bold" }}>{shiftType.name}</div>

            <div
              style={{
                fontSize: "20px",
              }}
            >
              {shiftType.icon}
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
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
            }}
          >
            <h3 style={{ marginBottom: "20px" }}>근무유형 추가</h3>

            <div style={{ marginBottom: "16px" }}>
              <div style={{ marginBottom: "8px", fontSize: "14px" }}>이름</div>

              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="예: 오픈, 미들, 마감"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div style={{ marginBottom: "8px", fontSize: "14px" }}>
                이모지
              </div>

              <input
                value={newIcon}
                onChange={(e) => setNewIcon(e.target.value)}
                placeholder="예: ☀️"
                maxLength={2}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  fontSize: "18px",
                }}
              />
            </div>

            <button
              onClick={handleAddShiftType}
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

export default SettingsPage;
