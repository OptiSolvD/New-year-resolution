import { useRef, useEffect } from "react";

export default function Home() {

   const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {

      // soft background volume
      audioRef.current.volume = 0.25;

      // try to play (mobile browsers may require user interaction)
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked until user interacts.");
      });
    }

    // STOP music when leaving page
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };

  }, []);   

  return (
    <div
      style={{
        minHeight: "100vh",
        textAlign: "center",
        background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      {/* Background Music */}
      <audio ref={audioRef} autoPlay loop>
        <source src="/music.mp3" type="audio/mp3" />
      </audio>

      {/* Animated Heading */}
      <h1 style={heading}>
        🎆 Happy New Year 2025 🎆
      </h1>

      <p style={subtext}>
        Wishing you joy, peace and success ahead ✨
      </p>

    </div>
  );
}


const heading = {
  fontSize: "48px",
  fontWeight: "bold",
  animation: "glow 2s infinite"
};

const subtext = {
  marginTop: "10px",
  fontSize: "20px",
  opacity: 0.9
};
