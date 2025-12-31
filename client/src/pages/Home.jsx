import { useRef, useState } from "react";

export default function Home() {

  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.25;

    if (!playing) {
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => console.log("Autoplay blocked"));
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <div style={container}>

      {/* MUSIC */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/music.mp3" type="audio/mp3" />
      </audio>

      {/* FLOATING TOGGLE BUTTON */}
      <button onClick={toggleMusic} style={{
        ...musicBtn,
        background: playing ? "#0f0b" : "#0008",
        boxShadow: playing 
          ? "0 0 20px #00ff9d" 
          : "0 0 10px rgba(255,255,255,.3)"
      }}>
        {playing ? "🎶 Music On" : "🔇 Music Off"}
      </button>

      {/* TITLE */}
      <h1 style={heading}>
        🎆 Happy New Year 2026 🎆
      </h1>

      {/* SUBTEXT */}
      <p style={subtext}>
        Wishing you joy, peace & success ahead ✨
      </p>
      <div style={{
  marginTop:"30px",
  width:"70%",
  maxWidth:"700px",
  background:"rgba(0,0,0,0.35)",
  padding:"18px 22px",
  borderRadius:"14px",
  border:"1px solid rgba(255,255,255,0.2)",
  boxShadow:"0 0 20px rgba(0,0,0,.4)",
  backdropFilter:"blur(6px)",
  textAlign:"left",
  animation:"fadeIn 2s ease-in-out"
}}>
  <h3 style={{margin:"0 0 10px 0"}}>📌 About This App</h3>

  <p style={{opacity:.9}}>
    This New Year Resolution App helps you create, track and complete your
    personal goals for 2026 🎯
  </p>

  <ul style={{opacity:.9, lineHeight:"28px"}}>
    <li>✨ Create your own resolutions</li>
    <li>📅 Track progress over time</li>
    <li>✅ Mark goals as complete</li>
    <li>🔐 Your data is secure in your account</li>
  </ul>

  <p style={{opacity:.9}}>
    Start your journey toward a better you — one goal at a time 🚀
  </p>
</div>

      {/* FLOATING FIREWORKS */}
      <div style={sparkle1}>✨</div>
      <div style={sparkle2}>✨</div>
      <div style={sparkle3}>✨</div>

    </div>
  );
}


/* ====== STYLES ====== */

const container = {
  minHeight:"100vh",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  flexDirection:"column",
  color:"white",
  position:"relative",
  background:"linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
  overflow:"hidden"
};

const heading = {
  fontSize:"50px",
  fontWeight:"bold",
  textShadow:"0 0 25px rgba(255,255,255,.7)",
  animation:"glow 2.5s ease-in-out infinite, float 3s ease-in-out infinite"
};

const subtext = {
  marginTop:"12px",
  fontSize:"20px",
  opacity:.95,
  animation:"fadeIn 2s ease-in-out"
};

const musicBtn = {
  position:"absolute",
  top:"20px",
  right:"20px",
  padding:"10px 16px",
  borderRadius:"12px",
  color:"white",
  border:"1px solid rgba(255,255,255,.2)",
  cursor:"pointer",
  backdropFilter:"blur(8px)",
  transition:"0.3s",
  fontWeight:"bold"
};


/* FLOATING EMOJIS */
const sparkle1 = {
  position:"absolute",
  left:"15%",
  top:"20%",
  opacity:.8,
  fontSize:"26px",
  animation:"float 3.5s ease-in-out infinite"
};

const sparkle2 = {
  position:"absolute",
  right:"20%",
  bottom:"22%",
  opacity:.9,
  fontSize:"28px",
  animation:"float 4s ease-in-out infinite"
};

const sparkle3 = {
  position:"absolute",
  left:"45%",
  bottom:"12%",
  opacity:.7,
  fontSize:"22px",
  animation:"float 3.2s ease-in-out infinite"
};