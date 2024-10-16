import { ApiError } from "./ApiError.js";

export const adjustWalletBalance = async (wallet, amount, operation) => {
  if (wallet && !isNaN(amount)) {
    wallet.balance += operation === "add" ? Number(amount) : Number(-amount);
    await wallet.save();
  } else {
    throw new ApiError(
      400,
      "Invalid amount provided for wallet balance adjustment"
    );
  }
};
