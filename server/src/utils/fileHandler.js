import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadOnCloudinary = async (fileBuffer) => {
  try {
    if (!fileBuffer) {
      return null;
    }

    // Create a promise to handle the streaming upload
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );

      // Create a readable stream from the buffer
      const readStream = new Readable({
        read() {
          this.push(fileBuffer);
          this.push(null);
        },
      });

      // Pipe the readable stream to the upload stream
      readStream.pipe(uploadStream);
    });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
  } catch (error) {
    return error;
    console.log("Error while deleting file on cloudinary", error);
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
