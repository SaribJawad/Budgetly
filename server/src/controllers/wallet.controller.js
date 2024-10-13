import { Wallet } from "../models/wallet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createWallet = asyncHandler(async (req, res) => {
  const { accountName, accountNumber, type, initialValue, currency, color } =
    req.body;
  const userId = req.user?._id;

  const requiredFields = {
    accountName,
    accountNumber,
  };

  for (const [key, value] of Object.entries(requiredFields)) {
    if (!value) {
      throw new ApiError(400, `${key} is required`);
    }
  }

  const wallet = await Wallet.create({
    accountName,
    accountNumber,
    type: type || undefined,
    initialValue: initialValue || undefined,
    currency: currency || undefined,
    color,
    walletOwner: userId,
  });

  if (!wallet) {
    throw new ApiError(500, "Something went wrong while creating a wallet");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, wallet, "Wallet created successfully"));
});

const getAllWallets = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const wallets = await Wallet.find({ walletOwner: userId });

  if (!wallets) {
    throw new ApiError(500, "Something went while fetching user's wallets");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, wallets, "Wallets fetched successfully"));
});

const getWalletById = asyncHandler(async (req, res) => {
  const { walletId } = req.params;

  if (!walletId) {
    throw new ApiError(400, "Wallet ID is required");
  }

  const wallet = await Wallet.findById(walletId);

  if (!wallet) {
    throw new ApiError(500, "Something went wrong while fetching the wallet");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, wallet, "Wallet fetched successfully"));
});

const updateWalletInformation = asyncHandler(async (req, res) => {
  const { walletId } = req.params;

  if (!walletId) {
    throw new ApiError(400, "Wallet ID is required");
  }

  const updateFields = Object.assign(
    {},
    req.body.accountName && { accountName: req.body.accountName },
    req.body.accountNumber && { accountNumber: req.body.accountNumber },
    req.body.type && { type: req.body.type },
    req.body.currency && { currency: req.body.currency }
  );

  if (Object.keys(updateFields).length === 0) {
    throw new ApiError(400, "At least one field is required");
  }

  const updatedWallet = await Wallet.findByIdAndUpdate(walletId, updateFields, {
    new: true,
  });

  if (!updatedWallet) {
    throw new ApiError(500, "Something went wrong while updating wallet");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedWallet, "Wallet updated successfully"));
});

const deleteWallet = asyncHandler(async (req, res) => {
  const { walletId } = req.params;

  if (!walletId) {
    throw new ApiError(400, "Wallet ID is required");
  }

  const deletedWallet = await Wallet.findByIdAndDelete(walletId);

  if (!deletedWallet) {
    throw new ApiError(500, "Something went wrong while deleting wallet");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Wallet deleted successfully"));
});

export {
  createWallet,
  getAllWallets,
  getWalletById,
  updateWalletInformation,
  deleteWallet,
};
