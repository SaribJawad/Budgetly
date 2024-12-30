export const config = {
  apiUrl:
    process.env.NODE_ENV === "production"
      ? "https://6xszmurh3c.execute-api.ap-south-1.amazonaws.com/dev/api/v1"
      : "http://localhost:3000/api/v1",
};
