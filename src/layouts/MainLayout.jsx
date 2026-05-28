import BottomNav from "../components/BottomNav";

function MainLayout({ children, shiftTypes = [] }) {
  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        minHeight: "100vh",
        background: "#fff",
        paddingBottom: "70px",
      }}
    >
      <header
        style={{
          padding: "20px",
          borderBottom: "1px solid #eee",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            overflowX: "auto",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              flexShrink: 0,
            }}
          >
            ShiftMate
          </div>

          {shiftTypes.map((shiftType) => (
            <div
              key={shiftType.name}
              style={{
                minWidth: "40px",
                height: "24px",
                borderRadius: "999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: "700",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {shiftType.icon} {shiftType.name}{" "}
            </div>
          ))}
        </div>
      </header>

      <main style={{ padding: "6px" }}>{children}</main>

      <BottomNav />
    </div>
  );
}

export default MainLayout;
