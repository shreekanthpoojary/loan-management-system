import React from "react";

function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      
      {/* Sidebar */}
      <div style={{
        width: "200px",
        height: "100vh",
        backgroundColor: "#2c3e50",
        color: "#fff",
        padding: "20px"
      }}>
        <h3>Admin Panel</h3>
        <p>Dashboard</p>
        <p>Customers</p>
        <p>Loans</p>
        <p>Payments</p>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h2>Dashboard</h2>

        {/* Cards */}
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={cardStyle}>Total Loan: ₹50,000</div>
          <div style={cardStyle}>Collected: ₹20,000</div>
          <div style={cardStyle}>Pending: ₹30,000</div>
        </div>

      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "#3498db",
  color: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "150px",
  textAlign: "center"
};

export default Dashboard;