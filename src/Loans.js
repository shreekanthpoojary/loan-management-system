import React from "react";

function Loans() {
  const loans = [
    { id: 1, name: "Harish", amount: 50000, interest: 5, emi: 2000, balance: 30000 },
    { id: 2, name: "Ravi", amount: 30000, interest: 4, emi: 1500, balance: 15000 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Loan Details</h2>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Loan Amount</th>
            <th>Interest (%)</th>
            <th>EMI</th>
            <th>Balance</th>
          </tr>
        </thead>

        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.id}</td>
              <td>{loan.name}</td>
              <td>{loan.amount}</td>
              <td>{loan.interest}</td>
              <td>{loan.emi}</td>
              <td>{loan.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Loans;