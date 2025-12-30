import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);
  //quotes
  const QUOTES = [
  "Small steps every day lead to big results.",
  "Discipline is doing what needs to be done, even when you don't feel like it.",
  "Your future is created by what you do today, not tomorrow.",
  "Success is the sum of small efforts repeated daily.",
  "Stay consistent — results will follow.",
  "Dream big. Start small. Act now.",
  "Don’t limit your challenges — challenge your limits.",
  "Every day is a chance to get better.",
  "You only fail when you stop trying.",
  "Progress, not perfection."
];

  const [quote, setQuote] = useState("");

useEffect(() => {
  const random = Math.floor(Math.random() * QUOTES.length);
  setQuote(QUOTES[random]);
}, []);


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
    const toggleComplete = async(id)=>{
  const res = await axios.put(
    `http://localhost:5000/api/resolution/toggle/${id}`,
    {},
    { headers:{ Authorization:`Bearer ${token}` } }
  );

  setResolutions(prev =>
    prev.map(r => r._id === id ? res.data : r)
  );
};


const updateProgress = async(id,value)=>{
  const res = await axios.put(
    `http://localhost:5000/api/resolution/progress/${id}`,
    { progress:value },
    { headers:{ Authorization:`Bearer ${token}` } }
  );

  setResolutions(prev =>
    prev.map(r => r._id === id ? res.data : r)
  );
};

//overall progress summary 
const completed = resolutions.filter(r => r.completed).length;
const total = resolutions.length;
const percent = total ? Math.round((completed/total)*100) : 0;
//color coded progress
const getProgressColor = (p) => {
  if (p < 30) return "#ef4444";      // red
  if (p < 70) return "#facc15";      // yellow
  return "#22c55e";                  // green
};

 





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
        <div  className="quote" style={{
  marginTop:"10px",
  marginBottom:"20px",
  padding:"12px",
  borderRadius:"12px",
  background:"rgba(255,255,255,0.08)",
  fontStyle:"italic",
  color:"#bde0fe"
}}>
  💡 {quote}
</div>


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
                  <span
  style={{
    textDecoration: res.completed ? "line-through" : "none",
    opacity: res.completed ? 0.6 : 1
  }}
>
  ✨ {res.text}
</span>
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
                <div style={{marginTop:"6px"}}>
<input
  type="range"
  min="0"
  max="100"
  value={res.progress || 0}
  onChange={e => updateProgress(res._id, e.target.value)}
  style={{
    accentColor: getProgressColor(res.progress || 0),
    width:"160px",
    borderRadius:"30px",
    
    cursor:"pointer"
  }}
/>

  <span style={{marginLeft:"8px"}}>
    {res.progress || 0}%
  </span>
</div>

                
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
    <button onClick={() => toggleComplete(res._id)} style={btnGreen}>
  {res.completed ? "Undo" : "Done"}
</button>

    <button onClick={() => deleteRes(res._id)} style={btnRed}>Delete</button>
  </>
)}

              </div>

            </div>
          ))}
          <p style={{
  marginTop:"20px",
  fontSize:"16px",
  color:"#ffafcc",
  fontWeight:"bold"
}}>
  🎯 Progress: {completed} / {total} — {percent}% completed
</p>


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
