import BottomNav from "../components/BottomNav";

function MainLayout({ children }) {
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
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        Shift Scheduler
      </header>

      <main style={{ padding: "6px" }}>{children}</main>

      <BottomNav />
    </div>
  );
}

export default MainLayout;
