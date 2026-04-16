// services/textApi.js

import { BASE_URL } from "./baseUrl";

export const processTextAPI = async (input) => {
  try {
    console.log("📤 Sending:", input);

    const res = await fetch(`${BASE_URL}/api/process`, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: input,
    });

    const data = await res.json();

    console.log("📥 Response:", data);

    return data;

  } catch (err) {
    console.log("❌ Text API error:", err);
    throw err;
  }
};