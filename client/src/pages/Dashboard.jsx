import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);

  const [user, setUser] = useState(null);
  const [resolutions, setResolutions] = useState([]);

  // Redirect IMMEDIATELY if NOT logged in
  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);


  // Fetch data ONLY if token exists
  useEffect(() => {

    if (!token) return;   // <-- IMPORTANT

    const fetchData = async () => {
      try {

        const res = await axios.get(
          "http://localhost:5000/api/resolution/me",
          { headers:{ Authorization:`Bearer ${token}` } }
        );

        setUser(res.data);
        setResolutions(res.data.resolutions || []);

      } catch (err) {

        console.log("AUTH ERROR", err);

        // token invalid → logout
        navigate("/");
      }
    };

    fetchData();

  }, [token, navigate]);


  // Delete resolution
  const deleteRes = async (id) => {

    await axios.delete(
      `http://localhost:5000/api/resolution/delete/${id}`,
      { headers:{ Authorization:`Bearer ${token}` } }
    );

    setResolutions(prev => prev.filter(r => r._id !== id));
  };


  // Show loading
  if (!user) return <p style={{textAlign:"center"}}>Loading...</p>;


  // Button to go to form
  const goToForm = () => navigate("/form");
  const formatDateTime = (d) =>
  new Date(d).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });



  return (
  <div
    style={{
      minHeight: "100vh",
      padding: "40px",
      background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
      color: "white"
    }}
  >

    {/* Card */}
    <div
      style={{
        maxWidth: "750px",
        margin: "auto",
        background: "rgba(0,0,0,0.45)",
        borderRadius: "18px",
        padding: "35px 40px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        backdropFilter: "blur(6px)"
      }}
    >

      <h1 style={{ fontSize:"28px" }}>
        🎆 Happy New Year <span style={{color:"#9be7ff"}}>{user.name}</span> 🎆
      </h1>

      <p style={{ opacity:0.8, marginTop:"5px" }}>
        Stay consistent — keep growing 🌱
      </p>

      <h3 style={{ marginTop:"25px" }}>Your Resolutions 🎯</h3>

      {resolutions.length === 0 && (
        <p style={{ opacity:0.8, marginTop:"8px" }}>
          You haven't added any resolutions yet.
        </p>
      )}

      {/* LIST */}
      <div style={{ marginTop:"15px" }}>
        {resolutions.map(res => (
          <div
            key={res._id}
            style={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center",
              padding:"12px 14px",
              margin:"12px 0",
              background:"#111",
              borderRadius:"10px",
              border:"1px solid #333",
              transition:"0.2s"
            }}
          >
            <span>✨ {res.text}</span>
             <br/>

  <small style={{ color:"#aaa" }}>
  📅 Created: {formatDateTime(res.createdAt)}
</small>

            <button
              onClick={() => deleteRes(res._id)}
              style={{
                background:"#ff5252",
                border:"none",
                color:"white",
                padding:"6px 12px",
                borderRadius:"8px",
                cursor:"pointer",
                fontWeight:"bold",
                transition:"0.2s"
              }}
              onMouseOver={e => e.target.style.background="#ff1744"}
              onMouseOut={e => e.target.style.background="#ff5252"}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* BUTTONS */}
      <div style={{ marginTop:"35px" }}>

        <button
          onClick={goToForm}
          style={{
            padding:"12px 25px",
            borderRadius:"10px",
            border:"none",
            cursor:"pointer",
            background:"#4CAF50",
            color:"white",
            fontSize:"16px",
            fontWeight:"bold",
            marginRight:"10px",
            transition:"0.2s"
          }}
          onMouseOver={e => e.target.style.background="#3fa745"}
          onMouseOut={e => e.target.style.background="#4CAF50"}
        >
          ➕ Add New Resolution
        </button>

        <button
          onClick={() => navigate("/")}
          style={{
            padding:"12px 25px",
            borderRadius:"10px",
            border:"1px solid #777",
            cursor:"pointer",
            background:"#1c1c1c",
            color:"white",
            fontSize:"15px",
            transition:"0.2s"
          }}
          onMouseOver={e => e.target.style.background="#2a2a2a"}
          onMouseOut={e => e.target.style.background="#1c1c1c"}
        >
          ⬅ Back to Home
        </button>

      </div>

    </div>

  </div>
);
}
