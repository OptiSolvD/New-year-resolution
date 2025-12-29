import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function Wish() {
  const { name } = useParams();

  useEffect(() => {
    axios.post("http://localhost:5000/api/save", { name });
  }, [name]);

  return (
    <div style={{ textAlign: "center", marginTop: "70px" }}>
      <h1>🎆 Happy New Year {name}! 🎆</h1>
      <p>Wishing you joy and success ahead.</p>
    </div>
  );
}
