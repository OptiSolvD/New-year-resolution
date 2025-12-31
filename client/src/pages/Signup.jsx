import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const disabled =
  //   !form.name.trim() ||
  //   !form.email.trim() ||
  //   !form.password.trim() ||
  //   form.password.length < 6;

  const handleSubmit = async () => {

  if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
    alert("All fields are required");
    return;
  }

  if (!form.email.includes("@")) {
    alert("Enter a valid email");
    return;
  }

  if (form.password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  try {

    const res = await axios.post(
      "http://localhost:5000/api/auth/signup",
      form
    );

    localStorage.setItem("token", res.data.token);
    dispatch(setToken(res.data.token));

    navigate("/dashboard");

  } catch (err) {
    alert("Signup failed — try again");
  }
};

  return (
    <div style={{
      minHeight:"100vh",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      background:"linear-gradient(135deg,#373B44,#4286f4)",
      color:"white"
    }}>

      <div style={{
        background:"#111",
        padding:"35px 45px",
        borderRadius:"16px",
        boxShadow:"0 0 18px rgba(0,0,0,0.5)",
        width:"400px",
        textAlign:"center"
      }}>

        <h2 style={{marginBottom:"22px"}}>
          ✨ Create Your Account
        </h2>

        <input
          placeholder="Full Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
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
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
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
          onChange={e => setForm({ ...form, password: e.target.value })}
          style={{
            width:"100%",
            padding:"10px",
            borderRadius:"8px",
            border:"1px solid gray",
            marginBottom:"18px",
            outline:"none"
          }}
        />

        <button
        // disabled={disabled}
          onClick={handleSubmit}
          style={{
            width:"100%",
            padding:"10px",
            borderRadius:"8px",
            border:"none",
            cursor:"pointer",
            background:"#FF9800",
            color:"white",
            fontSize:"16px",
            fontWeight:"bold"
          }}
        >
          Create Account
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
          🎆 Join New Year Wishes App
        </p>

      </div>

    </div>
  );}
