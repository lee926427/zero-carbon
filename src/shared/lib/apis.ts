import ky from "ky";

export const bucket = ky.create({
  baseUrl: import.meta.env.VITE_BUCKET_ENDPOINT,
});
