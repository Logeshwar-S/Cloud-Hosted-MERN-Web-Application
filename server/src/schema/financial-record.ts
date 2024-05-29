import mongoose from "mongoose";

interface FinancialRecord {
  userId: string;
  date: Date;
  note: string;
  amount: number;
  transaction: string;
  category: string;
  paymentMethod: string;
}

const financialRecordSchema = new mongoose.Schema<FinancialRecord>({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  note: { type: String, required: true },
  amount: { type: Number, required: true },
  transaction: { type: String, required: true },
  category: { type: String, required: true },
  paymentMethod: { type: String, required: true },
});

const FinancialRecordModel = mongoose.model<FinancialRecord>(
  "FinancialRecord",
  financialRecordSchema
);

export default FinancialRecordModel;