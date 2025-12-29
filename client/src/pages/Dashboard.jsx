import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);

  const [user, setUser] = useState(null);
  const [resolutions, setResolutions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");


  // Redirect if not logged in
  useEffect(() => { if (!token) navigate("/"); }, [token, navigate]);


  // Fetch user + resolutions
  useEffect(() => {

    if (!token) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/resolution/me",
          { headers:{ Authorization:`Bearer ${token}` } }
        );

        setUser(res.data);
        setResolutions(res.data.resolutions || []);

      } catch (err) {
        navigate("/");
      }
    };

    fetchData();

  }, [token, navigate]);


  // Delete
  const deleteRes = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/resolution/delete/${id}`,
      { headers:{ Authorization:`Bearer ${token}` } }
    );

    setResolutions(prev => prev.filter(r => r._id !== id));
  };


  // Edit Logic
  const startEdit = (res) => {
    setEditingId(res._id);
    setEditText(res.text);
  };

  const cancelEdit = () => setEditingId(null);

  const saveEdit = async () => {
    console.log("EDITING ID =", editingId);
    console.log("Sending text =", editText);



    await axios.put(
      `http://localhost:5000/api/resolution/edit/${editingId}`,
      { text: editText },
      { headers:{ Authorization:`Bearer ${token}` } }
    );

    setResolutions(prev =>
      prev.map(r =>
        r._id === editingId
          ? { ...r, text: editText, updatedAt: new Date() }
          : r
      )
    );

    setEditingId(null);
  };


  if (!user) return <p style={{textAlign:"center"}}>Loading...</p>;


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
    <div style={{
      minHeight: "100vh",
      padding: "40px",
      background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
      color: "white"
    }}>

      <div style={{
        maxWidth: "750px",
        margin: "auto",
        background: "rgba(0,0,0,0.45)",
        borderRadius: "18px",
        padding: "35px 40px"
      }}>

        <h1>
          🎆 Happy New Year <span style={{color:"#9be7ff"}}>{user.name}</span> 🎆
        </h1>

        <h3 style={{ marginTop:"25px" }}>Your Resolutions 🎯</h3>


        <div style={{ marginTop:"15px" }}>
          {resolutions.map(res => (
            <div
              key={res._id}
              style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                gap:"10px",
                padding:"12px",
                margin:"10px 0",
                background:"#111",
                borderRadius:"10px"
              }}
            >

              {/* LEFT */}
              <div>
                {editingId === res._id ? (
                  <input
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    style={{
                      padding:"6px",
                      borderRadius:"6px",
                      border:"1px solid #666",
                      background:"#222",
                      color:"white"
                    }}
                  />
                ) : (
                  <span>✨ {res.text}</span>
                )}

                <br/>

                <small style={{color:"#aaa"}}>
                  📅 Created: {formatDateTime(res.createdAt)}
                </small>

                {res.updatedAt && (
                  <small style={{color:"#aaa", marginLeft:"10px"}}>
                    ✏ Updated: {formatDateTime(res.updatedAt)}
                  </small>
                )}
              </div>


              {/* RIGHT BUTTONS */}
              <div style={{display:"flex", gap:"10px"}}>

                {editingId === res._id ? (
  <>
    <button onClick={saveEdit} style={btnGreen}>Save</button>
    <button onClick={cancelEdit} style={btnGrey}>Cancel</button>
  </>
) : (
  <>
    <button onClick={() => startEdit(res)} style={btnBlue}>Edit</button>
    <button onClick={() => deleteRes(res._id)} style={btnRed}>Delete</button>
  </>
)}

              </div>

            </div>
          ))}
        </div>


        <button onClick={() => navigate("/form")} style={btnGreenBig}>
          ➕ Add New Resolution
        </button>

      </div>

    </div>
  );
}


// BUTTON STYLES
const btnBlue = {
  background:"#2196F3",
  border:"none",
  padding:"6px 10px",
  borderRadius:"8px",
  color:"white",
  cursor:"pointer"
};

const btnRed = {
  background:"#ff4d4d",
  border:"none",
  padding:"6px 10px",
  borderRadius:"8px",
  color:"white",
  cursor:"pointer"
};

const btnGreen = {
  background:"#4CAF50",
  border:"none",
  padding:"6px 10px",
  borderRadius:"8px",
  color:"white",
  cursor:"pointer"
};

const btnGrey = {
  background:"#777",
  border:"none",
  padding:"6px 10px",
  borderRadius:"8px",
  color:"white",
  cursor:"pointer"
};

const btnGreenBig = {
  marginTop:"20px",
  padding:"12px 22px",
  borderRadius:"10px",
  border:"none",
  background:"#4CAF50",
  color:"white",
  cursor:"pointer",
  fontSize:"16px"
};
