import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav
      style={{
        background:"linear-gradient(135deg,#0f172a,#020617)",
        color:"white",
        padding:"14px 28px",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        borderBottom:"1px solid rgba(255,255,255,.08)",
        position:"sticky",
        top:0,
        zIndex:10
      }}
    >

      {/* Logo */}
      <h2 
        style={{
          cursor:"pointer",
          margin:0,
          fontWeight:900,
          letterSpacing:"0.5px"
        }}
        onClick={() => navigate("/")}
      >
        🎆 <span style={{color:"#8ed8ff"}}>New Year</span> Wishes
      </h2>


      {/* Links */}
      <div style={{
        display:"flex",
        gap:"20px",
        alignItems:"center",
        fontSize:"15px"
      }}>

        <NavLink to="/" style={navLinkStyle}>Home</NavLink>

        {token && (
          <>
            <NavLink to="/dashboard" style={navLinkStyle}>Dashboard</NavLink>
            <NavLink to="/form" style={navLinkStyle}>Add Resolution</NavLink>
          </>
        )}

        {!token && (
          <>
            <NavLink to="/login" style={navLinkStyle}>Login</NavLink>
            <NavLink to="/signup" style={navLinkStyle}>Signup</NavLink>
          </>
        )}

        {token && (
          <button
            onClick={handleLogout}
            style={{
              padding:"8px 14px",
              borderRadius:"10px",
              border:"1px solid rgba(255,255,255,.15)",
              background:"linear-gradient(135deg,#ef4444,#dc2626)",
              color:"white",
              cursor:"pointer",
              fontWeight:"bold",
              transition:"all .2s",
              boxShadow:"0 3px 8px rgba(0,0,0,.4)"
            }}
            onMouseOver={e => e.target.style.transform="scale(1.03)"}
            onMouseOut={e => e.target.style.transform="scale(1)"}
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}


const navLinkStyle = ({isActive}) => ({
  color: isActive ? "#7dd3fc" : "#d1d5db",
  textDecoration:"none",
  fontWeight: isActive ? 700 : 500,
  transition:".2s",
  padding:"6px 10px",
  borderRadius:"8px",
  background: isActive ? "rgba(255,255,255,.08)" : "transparent"
});