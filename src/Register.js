import React, { useState, useEffect, useCallback } from "react";
// Ensure your logo is in src/assets/logo.jpg
import logoFile from "./assets/logo.jpeg"; 

const Register = () => {
  const [coins, setCoins] = useState([]);
  const [notes, setNotes] = useState([]);

  // --- 1. MOUSE MOVE SPRAY (LARGE RUPEE COINS) ---
  const scatterCoins = useCallback((e) => {
    const bundleSize = 4;
    const newCoins = [];
    for (let i = 0; i < bundleSize; i++) {
      newCoins.push({
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        tx: (Math.random() - 0.5) * 400, 
        ty: (Math.random() - 0.5) * 400, 
        size: Math.random() * 20 + 15,   
        rot: Math.random() * 360,
      });
    }
    setCoins((prev) => [...prev.slice(-30), ...newCoins]);
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
        duration: Math.random() * 4 + 5,
        width: Math.random() * 40 + 60,
        opacity: Math.random() * 0.3 + 0.1
      };
      setNotes((prev) => [...prev.slice(-20), newNote]);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", scatterCoins);
    return () => window.removeEventListener("mousemove", scatterCoins);
  }, [scatterCoins]);

  return (
    <div style={styles.container}>
      
      {/* BACKGROUND MONEY RAIN */}
      {notes.map((note) => (
        <div
          key={note.id}
          style={{
            ...styles.fallingNote,
            left: `${note.left}%`,
            width: `${note.width}px`,
            height: `${note.width * 0.5}px`,
            opacity: note.opacity,
            animationDuration: `${note.duration}s`,
          }}
        >
          INR
        </div>
      ))}

      {/* CURSOR COIN BURSTS */}
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
          INR
        </div>
      ))}

      <div style={styles.card}>
        <div style={styles.logoWrapper}>
          <img src={logoFile} alt="Logo" style={styles.logoImg} />
        </div>

        <h1 style={styles.title}>
          JOIN <span style={styles.goldHighlight}>QUICK CASH</span>
        </h1>
        <p style={styles.tagline}>Start your financial journey today</p>

        <div style={styles.form}>
          <input type="text" placeholder="Full Name" style={styles.inputField} />
          <input type="tel" placeholder="Phone Number" style={styles.inputField} />
          <input type="password" placeholder="Create Password" style={styles.inputField} />
          
          <button style={styles.registerBtn}>CREATE ACCOUNT</button>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>Already have an account?</p>
          <span style={styles.link}>Login here</span>
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
    backgroundColor: "rgba(212, 175, 55, 0.1)",
    border: "1px solid rgba(212, 175, 55, 0.25)",
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
  },
  coin: {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #f0dc9d, #d4af37, #9a6b0f)",
    color: "#4a3b00",
    fontWeight: "bold",
    boxShadow: "0 0 14px rgba(212, 175, 55, 0.35)",
    border: "1px solid rgba(139, 101, 8, 0.9)",
    animation: "rupeeFly 1.2s forwards ease-out",
  },
  card: {
    position: "relative",
    zIndex: 10,
    background: "rgba(10, 15, 13, 0.98)",
    padding: "40px",
    borderRadius: "32px",
    width: "420px",
    textAlign: "center",
    border: "1px solid rgba(212, 175, 55, 0.3)",
    boxShadow: "0 40px 100px rgba(0,0,0,0.9)",
    backdropFilter: "blur(25px)"
  },
  logoWrapper: { marginBottom: "20px", borderRadius: "12px", overflow: "hidden" },
  logoImg: { width: "100%", maxWidth: "240px", margin: "0 auto", display: "block" },
  title: { color: "#fff", fontSize: "20px", letterSpacing: "2px", fontWeight: "900", margin: "10px 0" },
  goldHighlight: { color: "#f9e27d" },
  tagline: { color: "#777", fontSize: "12px", marginBottom: "30px" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  inputField: {
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #222",
    background: "#080a09",
    color: "#fff",
    outline: "none",
    fontSize: "14px"
  },
  registerBtn: {
    padding: "16px",
    marginTop: "10px",
    background: "linear-gradient(135deg, #d4af37, #f9e27d, #b8860b)",
    border: "none",
    borderRadius: "12px",
    fontWeight: "900",
    fontSize: "14px",
    color: "#000",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(212, 175, 55, 0.2)",
    textTransform: "uppercase"
  },
  footer: { 
    marginTop: "30px", 
    color: "#555", 
    fontSize: "13px",
    borderTop: "1px solid #1a1a1a",
    paddingTop: "20px"
  },
  footerText: { margin: "0" },
  link: { 
    color: "#d4af37", 
    cursor: "pointer", 
    fontWeight: "bold",
    textDecoration: "underline",
    marginTop: "5px",
    display: "inline-block"
  }
};

export default Register;