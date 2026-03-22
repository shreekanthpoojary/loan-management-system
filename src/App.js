import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function App() {
  const [page, setPage] = useState("login");

  return (
    <>
      {page === "login" && <Login goToRegister={() => setPage("register")} />}
      {page === "register" && <Register goToLogin={() => setPage("login")} />}
    </>
  );
}

export default App;