import mongoose from "mongoose";
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    ProcessingCode: {
      type: Number,
      required: true,
    },
    SystemTraceNr: {
      type: String,
      required: true,
    },
    FunctionCode: {
      type: Number,
      required: true,
    },
    CardNo: {
      type: String,
      required: true,
    },
    CardHolder: {
      type: String,
      required: true,
    },
    AmountTrxn: {
      type: Number,
      required: true,
    },
    CurrencyCode: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Transaction", transactionSchema, "transaction");
