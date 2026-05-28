import { useState } from "react";

function EmployeesPage({ employees, setEmployees }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("USER");

  const handleAddEmployee = () => {
    if (!newName.trim()) {
      alert("직원명을 입력해주세요.");
      return;
    }

    const isDuplicate = employees.some(
      (employee) => employee.name === newName.trim(),
    );

    if (isDuplicate) {
      alert("이미 등록된 직원입니다.");
      return;
    }

    setEmployees((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newName.trim(),
        role: newRole,
      },
    ]);

    setNewName("");
    setNewRole("USER");
    setIsOpen(false);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((employee) => employee.id !== id));
  };

  return (
    <div>
      <h1 style={{ fontSize: "22px", marginBottom: "20px" }}>직원 관리</h1>

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
          <h2 style={{ fontSize: "18px" }}>직원 목록</h2>

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

        {employees.map((employee) => (
          <div
            key={employee.id}
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
            <div>
              <div style={{ fontWeight: "bold" }}>{employee.name}</div>
              <div style={{ fontSize: "13px", color: "#666" }}>
                {employee.role === "ADMIN" ? "관리자" : "사용자"}
              </div>
            </div>

            <button
              onClick={() => handleDeleteEmployee(employee.id)}
              style={{
                border: "none",
                background: "#fff5f5",
                color: "#fa5252",
                borderRadius: "999px",
                width: "32px",
                height: "32px",
                cursor: "pointer",
              }}
            >
              삭제
            </button>
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
            <h3 style={{ marginBottom: "20px" }}>직원 추가</h3>

            <div style={{ marginBottom: "16px" }}>
              <div style={{ marginBottom: "8px", fontSize: "14px" }}>
                직원명
              </div>

              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="예: 김민수"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div style={{ marginBottom: "8px", fontSize: "14px" }}>권한</div>

              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              >
                <option value="USER">사용자</option>
                <option value="ADMIN">관리자</option>
              </select>
            </div>

            <button
              onClick={handleAddEmployee}
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

export default EmployeesPage;
