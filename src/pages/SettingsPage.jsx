import { useState } from "react";
import { FiMenu, FiTrash2 } from "react-icons/fi";

const categoryLabels = {
  WORK: "근무",
  OFF: "휴무",
  VACATION: "연차/휴가",
};

const emojiPresets = [
  "🔓",
  "🔒",
  "🕘",
  "🕛",
  "⏰",
  "☀️",
  "🌤️",
  "🌙",
  "🌃",
  "🏠",
  "🏖️",
  "🛌",
  "💊",
  "💼",
  "🍽️",
  "🧹",
  "🧾",
  "📦",
  "🛎️",
  "🛠️",
  "📚",
  "📌",
  "⭐",
  "✅",
];

function SettingsPage({
  shiftTypes,
  setShiftTypes,
  schedules = {},
  setSchedules,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingName, setEditingName] = useState(null);
  const [newName, setNewName] = useState("");
  const [newIcon, setNewIcon] = useState("☀️");
  const [newCategory, setNewCategory] = useState("WORK");
  const [draggedShiftName, setDraggedShiftName] = useState(null);

  const resetForm = () => {
    setEditingName(null);
    setNewName("");
    setNewIcon("☀️");
    setNewCategory("WORK");
  };

  const openAddForm = () => {
    resetForm();
    setIsOpen(true);
  };

  const openEditForm = (shiftType) => {
    setEditingName(shiftType.name);
    setNewName(shiftType.name);
    setNewIcon(shiftType.icon);
    setNewCategory(shiftType.category || "WORK");
    setIsOpen(true);
  };

  const closeForm = () => {
    resetForm();
    setIsOpen(false);
  };

  const handleSaveShiftType = () => {
    const trimmedName = newName.trim();

    if (!newName.trim()) {
      alert("근무유형 이름을 입력해주세요.");
      return;
    }

    const isDuplicate = shiftTypes.some(
      (shiftType) =>
        shiftType.name === trimmedName && shiftType.name !== editingName,
    );

    if (isDuplicate) {
      alert("이미 등록된 근무유형입니다.");
      return;
    }

    const nextShiftType = {
      name: trimmedName,
      icon: newIcon,
      color:
        shiftTypes.find((shiftType) => shiftType.name === editingName)?.color ||
        "#3182f6",
      startTime:
        shiftTypes.find((shiftType) => shiftType.name === editingName)
          ?.startTime || "",
      endTime:
        shiftTypes.find((shiftType) => shiftType.name === editingName)
          ?.endTime || "",
      category: newCategory,
    };

    if (editingName) {
      setShiftTypes((prev) =>
        prev.map((shiftType) =>
          shiftType.name === editingName ? nextShiftType : shiftType,
        ),
      );

      setSchedules((prev) =>
        Object.fromEntries(
          Object.entries(prev).map(([date, dailySchedules]) => [
            date,
            dailySchedules.map((schedule) =>
              schedule.type === editingName
                ? {
                    ...schedule,
                    type: trimmedName,
                    icon: newIcon,
                    category: newCategory,
                  }
                : schedule,
            ),
          ]),
        ),
      );
    } else {
      setShiftTypes((prev) => [
        ...prev,
        {
          ...nextShiftType,
          color: "#3182f6",
          startTime: "",
          endTime: "",
        },
      ]);
    }

    closeForm();
  };

  const handleDeleteShiftType = (shiftTypeName) => {
    const isUsed = Object.values(schedules).some((dailySchedules) =>
      dailySchedules.some((schedule) => schedule.type === shiftTypeName),
    );

    if (isUsed) {
      alert("이 근무유형은 등록된 스케줄에서 사용 중이라 삭제할 수 없습니다.");
      return;
    }

    const confirmed = window.confirm("이 근무유형을 삭제할까요?");

    if (!confirmed) return;

    setShiftTypes((prev) =>
      prev.filter((shiftType) => shiftType.name !== shiftTypeName),
    );
  };

  const handleDropShiftType = (targetName) => {
    if (!draggedShiftName || draggedShiftName === targetName) return;

    setShiftTypes((prev) => {
      const fromIndex = prev.findIndex(
        (shiftType) => shiftType.name === draggedShiftName,
      );
      const toIndex = prev.findIndex((shiftType) => shiftType.name === targetName);

      if (fromIndex === -1 || toIndex === -1) return prev;

      return moveItem(prev, fromIndex, toIndex);
    });
  };

  const getShiftTypeMeta = (name) =>
    shiftTypes.find((shiftType) => shiftType.name === name);

  const currentEditMeta = getShiftTypeMeta(editingName);
  const modalTitle = editingName ? "근무유형 수정" : "근무유형 추가";

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
            onClick={openAddForm}
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
            draggable
            onDragStart={(e) => {
              e.dataTransfer.effectAllowed = "move";
              e.dataTransfer.setData("text/plain", shiftType.name);
              setDraggedShiftName(shiftType.name);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
            }}
            onDrop={() => handleDropShiftType(shiftType.name)}
            onDragEnd={() => setDraggedShiftName(null)}
            onClick={() => openEditForm(shiftType)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#f8f9fb",
              borderRadius: "12px",
              padding: "12px",
              marginBottom: "8px",
              cursor: "grab",
              opacity: draggedShiftName === shiftType.name ? 0.45 : 1,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <FiMenu
                aria-label="순서 변경"
                size={18}
                color="#adb5bd"
                style={{ flexShrink: 0 }}
              />

              <div>
                <div style={{ fontWeight: "bold" }}>{shiftType.name}</div>
                <div style={{ color: "#868e96", fontSize: "12px" }}>
                  {categoryLabels[shiftType.category || "WORK"]}
                </div>
              </div>
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
                  fontSize: "20px",
                }}
              >
                {shiftType.icon}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteShiftType(shiftType.name);
                }}
                aria-label={`${shiftType.name} 삭제`}
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

      {isOpen && (
        <div
          onClick={closeForm}
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
            <h3 style={{ marginBottom: "20px" }}>{modalTitle}</h3>

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
                className="emoji-input"
                value={newIcon}
                onChange={(e) => setNewIcon(e.target.value)}
                placeholder="원하는 이모지를 입력하거나 아래에서 선택"
                maxLength={8}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  fontSize: "18px",
                }}
              />

              <div
                style={{
                  color: "#868e96",
                  fontSize: "12px",
                  marginTop: "6px",
                }}
              >
                원하는 이모지를 직접 입력해도 됩니다.
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(8, 1fr)",
                  gap: "6px",
                  marginTop: "10px",
                }}
              >
                {emojiPresets.map((emoji) => {
                  const isSelected = newIcon === emoji;

                  return (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setNewIcon(emoji)}
                      style={{
                        height: "34px",
                        border: isSelected
                          ? "2px solid #3182f6"
                          : "1px solid #e9ecef",
                        background: isSelected ? "#edf4ff" : "#fff",
                        borderRadius: "10px",
                        fontSize: "18px",
                        cursor: "pointer",
                      }}
                    >
                      {emoji}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div style={{ marginBottom: "8px", fontSize: "14px" }}>
                통계 분류
              </div>

              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              >
                <option value="WORK">근무로 집계</option>
                <option value="OFF">휴무로 집계</option>
                <option value="VACATION">연차/휴가로 집계</option>
              </select>
            </div>

            {editingName && currentEditMeta && (
              <div
                style={{
                  color: "#868e96",
                  fontSize: "12px",
                  lineHeight: "1.4",
                  marginBottom: "14px",
                }}
              >
                저장하면 기존 스케줄의 근무유형 정보도 함께 갱신됩니다.
              </div>
            )}

            <button
              onClick={handleSaveShiftType}
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

function moveItem(items, fromIndex, toIndex) {
  const nextItems = [...items];
  const [movedItem] = nextItems.splice(fromIndex, 1);

  nextItems.splice(toIndex, 0, movedItem);

  return nextItems;
}

export default SettingsPage;
