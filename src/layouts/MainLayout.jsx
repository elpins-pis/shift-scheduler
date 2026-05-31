import dayjs from "dayjs";
import BottomNav from "../components/BottomNav";

const weekdayLabels = ["일", "월", "화", "수", "목", "금", "토"];

function MainLayout({ children }) {
  const today = dayjs();

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
          padding: "18px 20px 16px",
          borderBottom: "1px solid #eee",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontWeight: "800",
              fontSize: "21px",
              color: "#191f28",
              flexShrink: 0,
            }}
          >
            ShiftMate
          </div>
        </div>

        <div
          style={{
            color: "#868e96",
            fontSize: "12px",
            fontWeight: "700",
            marginTop: "4px",
          }}
        >
          {today.format("YYYY년 M월 D일")} {weekdayLabels[today.day()]}요일
        </div>
      </header>

      <main style={{ padding: "6px" }}>{children}</main>

      <BottomNav />
    </div>
  );
}

export default MainLayout;
