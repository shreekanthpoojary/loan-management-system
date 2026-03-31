import React, { useMemo, useState } from "react";

const formatINR = (value) => {
  const n = Number(value) || 0;
  return n.toLocaleString("en-IN");
};

function Dashboard({ onLogout } = {}) {
  const [activeSection, setActiveSection] = useState("dashboard");
  // Sample admin data (replace with API calls later)
  const [loans, setLoans] = useState([
    { id: 1, name: "Harish", amount: 50000, interest: 5, emi: 2000, balance: 30000 },
    { id: 2, name: "Ravi", amount: 30000, interest: 4, emi: 1500, balance: 15000 },
  ]);
  const [customers, setCustomers] = useState([
    {
      customerId: "CUST-001",
      customerName: "Harish",
      phone: "9876543210",
      address: "Mangalore",
      joinDate: "2026-03-10",
    },
    {
      customerId: "CUST-002",
      customerName: "Ravi",
      phone: "9876543201",
      address: "Udupi",
      joinDate: "2026-03-14",
    },
  ]);
  const [customerForm, setCustomerForm] = useState({
    customerId: "",
    customerName: "",
    phone: "",
    address: "",
    joinDate: "",
  });

  const customerCount = customers.length;
  const loansGiven = loans.length;
  const totalLoanGiven = useMemo(() => loans.reduce((sum, l) => sum + l.amount, 0), [loans]);
  const pending = useMemo(() => loans.reduce((sum, l) => sum + l.balance, 0), [loans]);
  const collected = useMemo(
    () => loans.reduce((sum, l) => sum + (l.amount - l.balance), 0),
    [loans]
  );

  const markAsPaid = (loanId) => {
    setLoans((prev) =>
      prev.map((l) => (l.id === loanId ? { ...l, balance: 0 } : l))
    );
  };

  const onChangeCustomerForm = (field, value) => {
    setCustomerForm((prev) => ({ ...prev, [field]: value }));
  };

  const addCustomer = (e) => {
    e.preventDefault();
    const values = Object.values(customerForm).map((v) => v.trim());
    if (values.some((v) => !v)) return;

    setCustomers((prev) => [...prev, { ...customerForm }]);
    setCustomerForm({
      customerId: "",
      customerName: "",
      phone: "",
      address: "",
      joinDate: "",
    });
    setActiveSection("customers");
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          height: "100vh",
          backgroundColor: "#2c3e50",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Admin Panel</h3>
        <button
          type="button"
          style={activeSection === "dashboard" ? activeSidebarItemStyle : sidebarItemStyle}
          onClick={() => setActiveSection("dashboard")}
        >
          Dashboard
        </button>
        <button
          type="button"
          style={activeSection === "customers" ? activeSidebarItemStyle : sidebarItemStyle}
          onClick={() => setActiveSection("customers")}
        >
          Customers
        </button>
        <button
          type="button"
          style={activeSection === "addCustomer" ? activeSidebarItemStyle : sidebarItemStyle}
          onClick={() => setActiveSection("addCustomer")}
        >
          Add Customer
        </button>
        <button
          type="button"
          style={activeSection === "loans" ? activeSidebarItemStyle : sidebarItemStyle}
          onClick={() => setActiveSection("loans")}
        >
          Loans
        </button>
        <button
          type="button"
          style={activeSection === "payments" ? activeSidebarItemStyle : sidebarItemStyle}
          onClick={() => setActiveSection("payments")}
        >
          Payments
        </button>
        {onLogout && (
          <button style={logoutBtnStyle} type="button" onClick={onLogout}>
            Logout
          </button>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <div style={topRowStyle}>
          <h2 style={{ margin: 0 }}>Admin Dashboard</h2>
          <div style={{ color: "#666", fontSize: "12px" }}>All management</div>
        </div>

        {activeSection === "dashboard" && (
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "16px" }}>
            <div style={cardStyle}>Customers: {customerCount}</div>
            <div style={cardStyle}>Loans Given: {loansGiven}</div>
            <div style={cardStyle}>Total Loan: INR {formatINR(totalLoanGiven)}</div>
            <div style={cardStyle}>Pending: INR {formatINR(pending)}</div>
            <div style={cardStyle}>Collected: INR {formatINR(collected)}</div>
          </div>
        )}

        {activeSection === "customers" && (
          <div style={sectionStyle}>
            <h3 style={{ marginTop: 0 }}>Customer List</h3>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Customer ID</th>
                  <th style={thStyle}>Customer Name</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>Address</th>
                  <th style={thStyle}>Join Date</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.customerId}>
                    <td style={tdStyle}>{customer.customerId}</td>
                    <td style={tdStyle}>{customer.customerName}</td>
                    <td style={tdStyle}>{customer.phone}</td>
                    <td style={tdStyle}>{customer.address}</td>
                    <td style={tdStyle}>{customer.joinDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === "addCustomer" && (
          <div style={sectionStyle}>
            <h3 style={{ marginTop: 0 }}>Add New Customer</h3>
            <form style={formGridStyle} onSubmit={addCustomer}>
              <input
                style={inputStyle}
                type="text"
                placeholder="Customer ID"
                value={customerForm.customerId}
                onChange={(e) => onChangeCustomerForm("customerId", e.target.value)}
              />
              <input
                style={inputStyle}
                type="text"
                placeholder="Customer Name"
                value={customerForm.customerName}
                onChange={(e) => onChangeCustomerForm("customerName", e.target.value)}
              />
              <input
                style={inputStyle}
                type="tel"
                placeholder="Phone"
                value={customerForm.phone}
                onChange={(e) => onChangeCustomerForm("phone", e.target.value)}
              />
              <input
                style={inputStyle}
                type="text"
                placeholder="Address"
                value={customerForm.address}
                onChange={(e) => onChangeCustomerForm("address", e.target.value)}
              />
              <input
                style={inputStyle}
                type="date"
                value={customerForm.joinDate}
                onChange={(e) => onChangeCustomerForm("joinDate", e.target.value)}
              />
              <button type="submit" style={actionBtnStyle}>
                Add Customer
              </button>
            </form>
          </div>
        )}

        {activeSection === "loans" && (
          <div style={sectionStyle}>
            <h3 style={{ marginTop: 0 }}>Loan Management</h3>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Customer</th>
                  <th style={thStyle}>Amount</th>
                  <th style={thStyle}>Interest %</th>
                  <th style={thStyle}>EMI</th>
                  <th style={thStyle}>Balance</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => {
                  const isPaid = loan.balance <= 0;
                  return (
                    <tr key={loan.id}>
                      <td style={tdStyle}>{loan.id}</td>
                      <td style={tdStyle}>{loan.name}</td>
                      <td style={tdStyle}>INR {formatINR(loan.amount)}</td>
                      <td style={tdStyle}>{loan.interest}</td>
                      <td style={tdStyle}>INR {formatINR(loan.emi)}</td>
                      <td style={tdStyle}>INR {formatINR(loan.balance)}</td>
                      <td style={tdStyle}>{isPaid ? "Paid" : "Pending"}</td>
                      <td style={tdStyle}>
                        <button
                          type="button"
                          style={isPaid ? paidBtnStyle : actionBtnStyle}
                          onClick={() => markAsPaid(loan.id)}
                          disabled={isPaid}
                        >
                          {isPaid ? "Paid" : "Mark Paid"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === "payments" && (
          <div style={sectionStyle}>
            <h3 style={{ marginTop: 0 }}>Payments Overview</h3>
            <p style={{ margin: 0, color: "#333" }}>
              Total collected amount: <strong>INR {formatINR(collected)}</strong>
            </p>
            <p style={{ marginBottom: 0, color: "#666", fontSize: "13px" }}>
              You can extend this section with payment history and filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const topRowStyle = {
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
};

const sidebarItemStyle = {
  display: "block",
  width: "100%",
  margin: "8px 0",
  padding: "8px 10px",
  borderRadius: "8px",
  border: "none",
  background: "transparent",
  color: "#fff",
  textAlign: "left",
  opacity: 0.95,
  cursor: "pointer",
};

const activeSidebarItemStyle = {
  ...sidebarItemStyle,
  background: "rgba(255,255,255,0.16)",
};

const logoutBtnStyle = {
  marginTop: "18px",
  padding: "10px",
  width: "100%",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  background: "#e74c3c",
  color: "#fff",
  fontWeight: 700,
};

const cardStyle = {
  backgroundColor: "#3498db",
  color: "#fff",
  padding: "16px",
  borderRadius: "10px",
  width: "auto",
  minWidth: "170px",
  textAlign: "center",
  fontWeight: 700,
};

const sectionStyle = {
  marginTop: "18px",
  padding: "16px",
  borderRadius: "12px",
  border: "1px solid rgba(0,0,0,0.08)",
  background: "#fff",
};

const formGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "10px",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid rgba(0,0,0,0.2)",
  fontSize: "13px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  borderBottom: "1px solid rgba(0,0,0,0.1)",
  padding: "10px",
  textAlign: "left",
  fontSize: "12px",
  color: "#333",
};

const tdStyle = {
  borderBottom: "1px solid rgba(0,0,0,0.06)",
  padding: "10px",
  fontSize: "13px",
  color: "#222",
};

const actionBtnStyle = {
  padding: "8px 12px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  background: "#27ae60",
  color: "#fff",
  fontWeight: 700,
};

const paidBtnStyle = {
  padding: "8px 12px",
  border: "none",
  borderRadius: "8px",
  background: "#95a5a6",
  color: "#fff",
  fontWeight: 700,
  cursor: "not-allowed",
};

export default Dashboard;