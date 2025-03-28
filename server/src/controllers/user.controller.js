import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/fileHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, currency } = req.body;

  if (
    [firstName, lastName, email, password, currency].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, "User with this email already exist.");
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      currency,
      password,
    });

    if (!user) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }

    return res
      .status(201)
      .json(new ApiResponse(200, {}, "User registered successfully"));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(401, "User with this email does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const userWithoutSenstiveFields = user.toObject();
  delete userWithoutSenstiveFields.password;
  delete userWithoutSenstiveFields.refreshToken;

  if (userWithoutSenstiveFields.avatar) {
    userWithoutSenstiveFields.avatar = userWithoutSenstiveFields.avatar.url;
  }

  const options = {
    // httpOnly: true,
    // secure: true,
    // httpOnly: true, // Prevents JavaScript access
    // secure: process.env.NODE_ENV === "production", // HTTPS only in production
    // sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Cross-origin cookie behavior
    // domain:
    //   process.env.NODE_ENV === "production" ? ".your-domain.com" : "localhost", // Cookie domain
    // path: "/", // Cookie available for all paths
    // maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiry: 7 days
    httpOnly: true,
    secure: true, // Ensure this is true in production
    sameSite: "none", // Required for cross-origin requests
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: userWithoutSenstiveFields, accessToken },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const verifyAuth = asyncHandler(async (req, res) => {
  const userId = req.user;

  try {
    const user = await User.findOne(userId).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const updatedUser = user.toObject();

    if (updatedUser && updatedUser.avatar) {
      updatedUser.avatar = updatedUser.avatar.url;
    }

    return res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "Authenticated"));
  } catch (error) {
    throw new ApiError(401, "Not Authenticated");
  }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh is token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid refresh token");
  }
});

const updateUserInformation = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, currency } = req.body;
  const userId = req.user._id;

  if (!firstName && !lastName && !email && !currency) {
    throw new ApiError(400, "No fields updated");
  }

  const updateFields = {};

  if (firstName) {
    updateFields.firstName = firstName;
  }

  if (lastName) {
    updateFields.lastName = lastName;
  }

  if (email) {
    updateFields.email = email;
  }

  if (currency) {
    updateFields.currency = currency;
  }

  try {
    const user = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    }).select("-password -refreshToken");

    const updatedUser = user.toObject();

    if (updatedUser && updatedUser.avatar) {
      updatedUser.avatar = updatedUser.avatar.url;
    }

    return res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "User updated successfully"));
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Something went wrong while updating the user");
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user._id;

  if (!oldPassword && !newPassword) {
    throw new ApiError(400, "Old password and new password are required");
  }

  try {
    const user = await User.findById(userId);

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
      throw new ApiError(401, "Old password is incorrect");
    }

    user.password = newPassword;

    user.save({
      validateBeforeSave: false,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password changed successfully"));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

const updateAvatar = asyncHandler(async (req, res) => {
  const avatarBuffer = req.file?.buffer;
  const userId = req.user?._id;

  if (!avatarBuffer) {
    throw new ApiError(400, "Avatar file is missing");
  }

  try {
    const avatar = await uploadOnCloudinary(avatarBuffer);

    const user = await User.findById(userId);

    if (user.avatar) {
      await deleteFromCloudinary(user.avatar.publicId);
    }

    user.avatar = { url: avatar.url, publicId: avatar.public_id };
    user.save({
      validateBeforeSave: false,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Avatar updated successfully"));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  updateUserInformation,
  updatePassword,
  updateAvatar,
  verifyAuth,
};
