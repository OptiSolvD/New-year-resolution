import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/login", form);

    if(res.data.success){
      dispatch(setToken(res.data.token));
      navigate("/");
    } else {
      alert("Invalid credentials");
      navigate("/");
    }
  };

  return (
    <div style={{
      minHeight:"100vh",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      background:"linear-gradient(135deg,#0F2027,#203A43,#2C5364)",
      color:"white"
    }}>

      <div style={{
        background:"#111",
        padding:"35px 45px",
        borderRadius:"16px",
        boxShadow:"0 0 15px rgba(0,0,0,0.5)",
        width:"380px",
        textAlign:"center"
      }}>

        <h2 style={{marginBottom:"20px"}}>
          🔐 Login to Continue
        </h2>

        <input
          placeholder="Email"
          onChange={e => setForm({...form,email:e.target.value})}
          style={{
            width:"100%",
            padding:"10px",
            borderRadius:"8px",
            border:"1px solid gray",
            marginBottom:"12px",
            outline:"none"
          }}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={e => setForm({...form,password:e.target.value})}
          style={{
            width:"100%",
            padding:"10px",
            borderRadius:"8px",
            border:"1px solid gray",
            marginBottom:"16px",
            outline:"none"
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width:"100%",
            padding:"10px",
            borderRadius:"8px",
            border:"none",
            cursor:"pointer",
            background:"#4CAF50",
            color:"white",
            fontSize:"16px",
            fontWeight:"bold"
          }}
        >
          Login
        </button>
        <p
  onClick={() => navigate("/")}
  style={{
    marginTop:"14px",
    cursor:"pointer",
    color:"#8ab4ff",
    textDecoration:"underline"
  }}
>
  ⬅ Back to Home
</p>


        <p style={{marginTop:"12px",opacity:.8}}>
          🎆 New Year Wishes App
        </p>

      </div>

    </div>
  );
}
