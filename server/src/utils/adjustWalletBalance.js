import { ApiError } from "./ApiError.js";

export const adjustWalletBalance = async (wallet, amount, operation) => {
  if (wallet && typeof amount === "number" && !isNaN(amount)) {
    wallet.balance += operation === "add" ? Number(amount) : Number(-amount);
    await wallet.save({ validateBeforeSave: false });
  } else {
    throw new ApiError(
      400,
      "Invalid amount provided for wallet balance adjustment"
    );
  }
};
