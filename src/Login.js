import React, { useState, useEffect, useCallback } from "react";
// Ensure your logo is in src/assets/logo.jpeg
import logoFile from "./assets/logo.jpeg"; 

const AuthSystem = ({ goToAdmin } = {}) => {
  const [view, setView] = useState("login");
  const [adminUserId, setAdminUserId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [coins, setCoins] = useState([]);
  const [notes, setNotes] = useState([]);

  // --- 1. MOUSE MOVE SPRAY (CLEAN GOLD COINS) ---
  const scatterCoins = useCallback((e) => {
    const bundleSize = 4;
    const newCoins = [];
    for (let i = 0; i < bundleSize; i++) {
      newCoins.push({
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        tx: (Math.random() - 0.5) * 350,
        ty: (Math.random() - 0.5) * 350, 
        size: Math.random() * 15 + 15,
        rot: Math.random() * 360,
      });
    }
    setCoins((prev) => [...prev.slice(-30), ...newCoins]);
    setTimeout(() => {
      setCoins((prev) => prev.filter((c) => !newCoins.includes(c)));
    }, 1000);
  }, []);

  // --- 2. FALLING INR 200 NOTES ---
  useEffect(() => {
    const interval = setInterval(() => {
      const newNote = {
        id: Math.random(),
        left: Math.random() * 100,
        duration: Math.random() * 3 + 5, // 5-8 seconds fall
        width: 100, // Large note width
        opacity: Math.random() * 0.4 + 0.3
      };
      setNotes((prev) => [...prev.slice(-15), newNote]);
    }, 800); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", scatterCoins);
    return () => window.removeEventListener("mousemove", scatterCoins);
  }, [scatterCoins]);

  return (
    <div style={styles.container}>
      
      {/* LAYER 1: FALLING INR 200 NOTES */}
      {notes.map((note) => (
        <div
          key={note.id}
          style={{
            ...styles.rupeeNote,
            left: `${note.left}%`,
            width: `${note.width}px`,
            height: `${note.width * 0.45}px`,
            opacity: note.opacity,
            animationDuration: `${note.duration}s`,
          }}
        >
          <div style={styles.noteContent}>
            <span style={styles.noteValue}>200</span>
            <span style={styles.noteSymbol}>INR</span>
          </div>
        </div>
      ))}

      {/* LAYER 2: LIGHT GOLD COIN SPRAY */}
      {coins.map((coin) => (
        <div
          key={coin.id}
          style={{
            ...styles.coin,
            left: coin.x,
            top: coin.y,
            fontSize: `${coin.size * 0.5}px`,
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

      <div style={styles.backgroundGlow}></div>

      <div style={{...styles.card, animation: view === "login" ? "slideInLeft 0.5s ease-out" : "slideInRight 0.5s ease-out"}}>
        <div style={styles.logoWrapper}>
          <img src={logoFile} alt="Logo" style={styles.logoImg} />
        </div>

        {view === "login" ? (
          <>
            <h1 style={styles.title}>QUICK CASH <span style={styles.goldHighlight}>FINANCE</span></h1>
            <div style={styles.goldLine}></div>
            <p style={styles.tagline}>Instant Loans • Minimal Documents</p>
            <div style={styles.form}>
              <input type="tel" placeholder="Phone Number" style={styles.inputField} />
              <input type="password" placeholder="Password" style={styles.inputField} />
              <button style={styles.actionBtn}>LOGIN TO ACCOUNT</button>
            </div>
            <div style={styles.footer}>
              <span style={styles.subLink}>Forgot password?</span>
              <span style={styles.link} onClick={() => setView("register")}>Create Account</span>
            </div>

            <button
              type="button"
              style={styles.adminBtn}
              onClick={() => {
                setAdminUserId("");
                setAdminPassword("");
                setView("admin");
              }}
            >
              ADMIN LOGIN
            </button>
          </>
        ) : view === "admin" ? (
          <>
            <h1 style={styles.title}>ADMIN <span style={styles.goldHighlight}>LOGIN</span></h1>
            <div style={styles.goldLine}></div>
            <p style={styles.tagline}>Enter admin credentials</p>
            <div style={styles.form}>
              <input
                type="tel"
                placeholder="Admin Phone Number"
                value={adminUserId}
                onChange={(e) => setAdminUserId(e.target.value)}
                style={styles.inputField}
              />
              <input
                type="password"
                placeholder="Admin Password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                style={styles.inputField}
              />
              <button
                style={styles.actionBtn}
                type="button"
                onClick={() => {
                  const validPhone = "9481215492";
                  const validPassword = "admin";

                  if (adminUserId.trim() === validPhone && adminPassword === validPassword) {
                    alert("Admin login successful");
                    if (goToAdmin) goToAdmin();
                    return;
                  }

                  alert("Invalid admin phone number or password");
                }}
              >
                LOGIN AS ADMIN
              </button>
            </div>

            <div style={styles.footer}>
              <span style={styles.link} onClick={() => setView("login")}>Back to User Login</span>
            </div>
          </>
        ) : (
          <>
            <h1 style={styles.title}>JOIN <span style={styles.goldHighlight}>QUICK CASH</span></h1>
            <div style={styles.goldLine}></div>
            <p style={styles.tagline}>Start your journey with us</p>
            <div style={styles.form}>
              <input type="text" placeholder="Full Name" style={styles.inputField} />
              <input type="tel" placeholder="Phone Number" style={styles.inputField} />
              <input type="password" placeholder="Create Password" style={styles.inputField} />
              <button style={styles.actionBtn}>REGISTER NOW</button>
            </div>
            <div style={styles.footer}>
              <span style={styles.subLink}>Already a member?</span>
              <span style={styles.link} onClick={() => setView("login")}>Login Here</span>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes rupeeFly {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { transform: translate(calc(var(--tx) - 50%), calc(var(--ty) + 100px)) rotate(var(--rot)) scale(0); opacity: 0; }
        }
        @keyframes noteFall {
          0% { transform: translateY(-20vh) rotateZ(0deg) rotateX(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(110vh) rotateZ(20deg) rotateX(720deg); opacity: 0; }
        }
        @keyframes slideInLeft {
          0% { transform: translateX(-30px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          0% { transform: translateX(30px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center",
    backgroundColor: "#050807", background: "radial-gradient(circle at center, #111e19 0%, #050807 100%)",
    fontFamily: "'Inter', sans-serif", overflow: "hidden", position: "relative", cursor: "none" 
  },
  rupeeNote: {
    position: "absolute", top: "-100px",
    backgroundColor: "#ffb347", // INR 200 Note Base Orange/Yellow
    background: "linear-gradient(90deg, #ffcc80, #ffb347, #ffa726)",
    border: "1px solid rgba(255,255,255,0.3)",
    zIndex: 1, borderRadius: "2px",
    animationName: "noteFall", animationIterationCount: "infinite",
    animationTimingFunction: "ease-in-out",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.2)"
  },
  noteContent: {
    display: "flex", flexDirection: "column", height: "100%", 
    justifyContent: "center", alignItems: "center", position: "relative",
    border: "1px dashed rgba(0,0,0,0.1)", margin: "2px"
  },
  noteValue: { fontSize: "14px", fontWeight: "900", color: "rgba(0,0,0,0.6)", fontFamily: "serif" },
  noteSymbol: { fontSize: "10px", color: "rgba(0,0,0,0.5)", letterSpacing: "0.5px" },

  coin: {
    position: "fixed", pointerEvents: "none", zIndex: 9999, display: "flex", alignItems: "center",
    justifyContent: "center", borderRadius: "50%", background: "linear-gradient(135deg, #FFFDF5, #F9E27D)",
    color: "#4A3B00", fontWeight: "bold", boxShadow: "0 0 10px rgba(249, 226, 125, 0.25)",
    border: "1px solid rgba(212, 175, 55, 0.65)", animation: "rupeeFly 1.2s forwards cubic-bezier(0.15, 0, 0.15, 1)",
  },
  backgroundGlow: { position: "absolute", width: "100%", height: "100%", background: "radial-gradient(circle, rgba(249, 226, 125, 0.015) 0%, transparent 70%)", zIndex: 0 },
  card: {
    position: "relative", zIndex: 10, background: "rgba(10, 15, 13, 0.98)", padding: "50px 40px",
    borderRadius: "24px", width: "380px", textAlign: "center", border: "1px solid rgba(253, 226, 125, 0.15)",
    boxShadow: "0 40px 100px rgba(0,0,0,0.8)", backdropFilter: "blur(20px)"
  },
  logoWrapper: { marginBottom: "25px", borderRadius: "12px", overflow: "hidden", border: "1px solid #222" },
  logoImg: { width: "100%", display: "block" },
  title: { color: "#FFF", fontSize: "20px", letterSpacing: "2px", fontWeight: "800", margin: 0 },
  goldHighlight: { color: "#F9E27D" },
  goldLine: { width: "40px", height: "2px", background: "#D4AF37", margin: "15px auto", opacity: 0.6 },
  tagline: { color: "#777", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "35px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  inputField: { padding: "16px", borderRadius: "10px", border: "1px solid #333", background: "#000", color: "#FFF", outline: "none", fontSize: "14px" },
  actionBtn: {
    padding: "16px", background: "linear-gradient(135deg, #D4AF37, #F9E27D)", border: "none",
    borderRadius: "10px", fontWeight: "700", fontSize: "14px", color: "#000", cursor: "pointer",
    boxShadow: "0 10px 20px rgba(212, 175, 55, 0.2)", textTransform: "uppercase"
  },
  adminBtn: {
    marginTop: "18px",
    padding: "14px",
    background: "rgba(249, 226, 125, 0.12)",
    border: "1px solid rgba(249, 226, 125, 0.35)",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "14px",
    color: "#F9E27D",
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(212, 175, 55, 0.1)",
    textTransform: "uppercase"
  },
  footer: { marginTop: "35px", display: "flex", justifyContent: "space-between", color: "#666", fontSize: "12px", borderTop: "1px solid #1a1a1a", paddingTop: "20px" },
  link: { color: "#F9E27D", cursor: "pointer", fontWeight: "600" },
  subLink: { cursor: "pointer" }
};

export default AuthSystem;