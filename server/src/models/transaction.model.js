import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema();

export const Transacttion = mongoose.model("Transaction", transactionSchema);
