import React, { useState, useEffect, useCallback } from "react";
// Ensure your logo is in src/assets/logo.jpg
import logoFile from "./assets/logo.jpeg"; 

const Login = () => {
  const [coins, setCoins] = useState([]);
  const [notes, setNotes] = useState([]);

  // --- 1. MOUSE MOVE SPRAY (LARGE RUPEE COINS) ---
  const scatterCoins = useCallback((e) => {
    const bundleSize = 5;
    const newCoins = [];
    for (let i = 0; i < bundleSize; i++) {
      newCoins.push({
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        tx: (Math.random() - 0.5) * 400, // Wider spray
        ty: (Math.random() - 0.5) * 400, 
        size: Math.random() * 20 + 20,   // INCREASED SIZE: 20px to 40px
        rot: Math.random() * 360,
      });
    }
    setCoins((prev) => [...prev.slice(-40), ...newCoins]);
    setTimeout(() => {
      setCoins((prev) => prev.filter((c) => !newCoins.includes(c)));
    }, 1000);
  }, []);

  // --- 2. LARGE FALLING CURRENCY BILLS ---
  useEffect(() => {
    const interval = setInterval(() => {
      const newNote = {
        id: Math.random(),
        left: Math.random() * 100,
        duration: Math.random() * 4 + 5, // Slightly slower, more majestic fall
        width: Math.random() * 40 + 60,  // INCREASED SIZE: 60px to 100px wide
        opacity: Math.random() * 0.4 + 0.1
      };
      setNotes((prev) => [...prev.slice(-25), newNote]);
    }, 500); // New note twice per second

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", scatterCoins);
    return () => window.removeEventListener("mousemove", scatterCoins);
  }, [scatterCoins]);

  return (
    <div style={styles.container}>
      
      {/* LAYER 1: LARGE FALLING RECTANGULAR BILLS */}
      {notes.map((note) => (
        <div
          key={note.id}
          style={{
            ...styles.fallingNote,
            left: `${note.left}%`,
            width: `${note.width}px`,
            height: `${note.width * 0.5}px`, // Rectangle shape
            opacity: note.opacity,
            animationDuration: `${note.duration}s`,
          }}
        >
          ₹
        </div>
      ))}

      {/* LAYER 2: MOUSE SCATTER COINS */}
      {coins.map((coin) => (
        <div
          key={coin.id}
          style={{
            ...styles.coin,
            left: coin.x,
            top: coin.y,
            fontSize: `${coin.size * 0.6}px`,
            width: `${coin.size}px`,
            height: `${coin.size}px`,
            "--tx": `${coin.tx}px`,
            "--ty": `${coin.ty}px`,
            "--rot": `${coin.rot}deg`,
          }}
        >
          ₹
        </div>
      ))}

      <div style={styles.backgroundGlow}></div>

      <div style={styles.card}>
        <div style={styles.logoWrapper}>
          <img src={logoFile} alt="Logo" style={styles.logoImg} />
        </div>

        <h1 style={styles.title}>
          QUICK CASH <span style={styles.goldHighlight}>FINANCE</span>
        </h1>
        
        <div style={styles.goldLine}></div>
        <p style={styles.tagline}>Instant Loans • Minimal Documents</p>

        <div style={styles.form}>
          <input type="email" placeholder="Email Address" style={styles.inputField} />
          <input type="password" placeholder="Password" style={styles.inputField} />
          <button style={styles.loginBtn}>LOGIN TO ACCOUNT</button>
        </div>

        <div style={styles.footer}>
          <span>Forgot password?</span>
          <span>Create Account</span>
        </div>
      </div>

      <style>{`
        @keyframes rupeeFly {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
          100% { transform: translate(calc(var(--tx) - 50%), calc(var(--ty) + 120px)) rotate(var(--rot)) scale(0); opacity: 0; }
        }

        @keyframes fallDown {
          0% { transform: translateY(-20vh) rotateX(0deg) rotateY(0deg); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateY(120vh) rotateX(360deg) rotateY(180deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#050807",
    background: "radial-gradient(circle at center, #0d1a15 0%, #050807 100%)",
    fontFamily: "'Inter', sans-serif",
    overflow: "hidden",
    position: "relative",
    cursor: "none" 
  },
  fallingNote: {
    position: "absolute",
    top: "-100px",
    backgroundColor: "rgba(212, 175, 55, 0.2)",
    border: "2px solid rgba(212, 175, 55, 0.5)",
    color: "#d4af37",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    pointerEvents: "none",
    zIndex: 1,
    borderRadius: "4px",
    animationName: "fallDown",
    animationIterationCount: "infinite",
    animationTimingFunction: "ease-in",
    boxShadow: "0 0 15px rgba(212, 175, 55, 0.2)"
  },
  coin: {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #f9e27d, #d4af37, #b8860b)",
    color: "#4a3b00",
    fontWeight: "bold",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.4), 0 0 20px rgba(212, 175, 55, 0.6)",
    border: "2px solid #8b6508",
    animation: "rupeeFly 1.2s forwards cubic-bezier(0.15, 0, 0.15, 1)",
  },
  backgroundGlow: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "radial-gradient(circle, rgba(212, 175, 55, 0.04) 0%, transparent 70%)",
    zIndex: 0
  },
  card: {
    position: "relative",
    zIndex: 10,
    background: "rgba(10, 15, 13, 0.96)",
    padding: "50px 40px",
    borderRadius: "32px",
    width: "400px",
    textAlign: "center",
    border: "1px solid rgba(212, 175, 55, 0.3)",
    boxShadow: "0 40px 100px rgba(0,0,0,0.9)",
    backdropFilter: "blur(25px)"
  },
  logoWrapper: { marginBottom: "25px", borderRadius: "16px", overflow: "hidden", border: "1px solid #222" },
  logoImg: { width: "100%", display: "block" },
  title: { color: "#fff", fontSize: "22px", letterSpacing: "3px", fontWeight: "900", margin: 0 },
  goldHighlight: { color: "#f9e27d", textShadow: "0 0 15px rgba(249, 226, 125, 0.4)" },
  goldLine: { width: "50px", height: "3px", background: "#d4af37", margin: "20px auto" },
  tagline: { color: "#888", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "40px" },
  form: { display: "flex", flexDirection: "column", gap: "18px" },
  inputField: {
    padding: "18px",
    borderRadius: "14px",
    border: "1px solid #333",
    background: "#000",
    color: "#fff",
    outline: "none",
    fontSize: "15px"
  },
  loginBtn: {
    padding: "18px",
    background: "linear-gradient(135deg, #d4af37, #f9e27d, #b8860b)",
    border: "none",
    borderRadius: "14px",
    fontWeight: "900",
    fontSize: "16px",
    color: "#000",
    cursor: "pointer",
    boxShadow: "0 15px 30px rgba(212, 175, 55, 0.3)",
    textTransform: "uppercase",
    letterSpacing: "1px"
  },
  footer: { 
    marginTop: "40px", 
    display: "flex", 
    justifyContent: "space-between", 
    color: "#555", 
    fontSize: "13px",
    borderTop: "1px solid #1a1a1a",
    paddingTop: "25px"
  }
};

export default Login;