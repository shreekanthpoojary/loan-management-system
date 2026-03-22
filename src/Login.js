import React from "react";

function Login() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f2f5"
    }}>
      <div style={{
        padding: "30px",
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        width: "300px",
        textAlign: "center"
      }}>
        <h2>Admin Login</h2>

        <input type="email" placeholder="Email" style={{width:"100%", padding:"10px", margin:"10px 0"}} />
        <input type="password" placeholder="Password" style={{width:"100%", padding:"10px", margin:"10px 0"}} />

        <button style={{width:"100%", padding:"10px", backgroundColor:"#007bff", color:"#fff"}}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;