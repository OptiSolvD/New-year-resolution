import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Form() {

  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();

  const [resolution, setResolution] = useState("");

  const handleSubmit = async () => {
    await axios.post(
      "http://localhost:5000/api/resolution/save",
      { resolution },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    navigate("/dashboard");
  };

  return (
    <div style={{
      minHeight:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      background:"linear-gradient(135deg,#1f4037,#99f2c8)",
      color:"white"
    }}>

      <div style={{
        background:"#111",
        padding:"35px 45px",
        borderRadius:"16px",
        width:"450px",
        boxShadow:"0 0 18px rgba(0,0,0,0.5)"
      }}>

        <h2 style={{textAlign:"center", marginBottom:"20px"}}>
          📝 Add New Resolution
        </h2>

        <textarea
          placeholder="Write your New Year Resolution here..."
          onChange={e => setResolution(e.target.value)}
          style={{
            width:"100%",
            height:"120px",
            padding:"12px",
            borderRadius:"10px",
            border:"1px solid gray",
            outline:"none",
            resize:"none",
            fontSize:"15px",
            marginBottom:"18px"
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            width:"100%",
            padding:"12px 0",
            borderRadius:"10px",
            border:"none",
            cursor:"pointer",
            background:"#4CAF50",
            color:"white",
            fontSize:"16px",
            fontWeight:"bold"
          }}
        >
          Save Resolution 🎯
        </button>

        <p
          onClick={() => navigate("/dashboard")}
          style={{
            marginTop:"14px",
            textAlign:"center",
            cursor:"pointer",
            color:"#8ab4ff",
            textDecoration:"underline"
          }}
        >
          ⬅ Back to Dashboard
        </p>

      </div>

    </div>
  );}
