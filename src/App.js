import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";

function App() {
  const [page, setPage] = useState("login");

  return (
    <>
      {page === "login" && (
        <Login
          goToRegister={() => setPage("register")}
          goToAdmin={() => setPage("admin")}
        />
      )}
      {page === "register" && <Register goToLogin={() => setPage("login")} />}
      {page === "admin" && <Dashboard onLogout={() => setPage("login")} />}
    </>
  );
}

export default App;