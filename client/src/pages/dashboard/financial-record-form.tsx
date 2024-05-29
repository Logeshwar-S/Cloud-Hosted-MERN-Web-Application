import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial-record-context";

export const FinancialRecordForm = () => {
  const [note, setNote] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [transaction, setTransaction] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const { addRecord } = useFinancialRecords();

  const { user } = useUser();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let parsedAmount = parseFloat(amount);
    if (transaction === "Expense" && parsedAmount > 0) {
      parsedAmount = -parsedAmount; 
    } else if (transaction === "Income" && parsedAmount < 0) {
      parsedAmount = Math.abs(parsedAmount); 
    }

    const newRecord = {
      userId: user?.id ?? "",
      date: new Date(),
      note: note,
      amount: parsedAmount,
      transaction: transaction,
      category: category,
      paymentMethod: paymentMethod,
    };

    addRecord(newRecord);
    setNote("");
    setAmount("");
    setTransaction("");
    setCategory("");
    setPaymentMethod("");
  };

  const getCategories = () => {
    switch (transaction) {
      case "Income":
        return ["Salary", "Grants", "Investment", "Other"];
      case "Expense":
        return ["Food", "Bills", "Eduction","Health","Sports","Social", "Entertainment", "Other"];
      default:
        return [];
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Note:</label>
          <input
            type="text"
            required
            className="input"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Amount:</label>
          <input
            type="number"
            required
            className="input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Transaction Type:</label>
          <select
            required
            className="input"
            value={transaction}
            onChange={(e) => setTransaction(e.target.value)}
          >
            <option value="">Select a Transaction Type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <div className="form-field">
          <label>Category:</label>
          <select
            required
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a Category</option>
            {getCategories().map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label>Payment Method:</label>
          <select
            required
            className="input"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select a Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        <button type="submit" className="button">
          Add Record
        </button>
      </form>
    </div>
  );
};
