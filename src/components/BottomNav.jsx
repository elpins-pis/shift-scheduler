import { NavLink } from "react-router-dom";

function BottomNav() {
  const navStyle = {
    flex: 1,
    textAlign: "center",
    textDecoration: "none",
    color: "#555",
    fontSize: "14px",
  };

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        maxWidth: "430px",
        display: "flex",
        justifyContent: "space-around",
        padding: "14px 0",
        background: "#fff",
        borderTop: "1px solid #eee",
      }}
    >
      <NavLink to="/" style={navStyle}>
        달력
      </NavLink>

      <NavLink to="/stats" style={navStyle}>
        통계
      </NavLink>

      <NavLink to="/employees" style={navStyle}>
        직원
      </NavLink>

      <NavLink to="/settings" style={navStyle}>
        설정
      </NavLink>
    </nav>
  );
}

export default BottomNav;
