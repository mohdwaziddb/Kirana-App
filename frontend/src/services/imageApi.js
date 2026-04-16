// services/imageApi.js

import { BASE_URL } from "./baseUrl";

export const uploadImageAPI = async (image) => {

  if (!image) {
    console.log("❌ No image selected");
    throw new Error("No image selected");
  }

  console.log("📸 IMAGE:", image);

  let fileToUpload = image;

  // 🔥 Agar blob URL aa raha hai to convert karo
  if (typeof image === "string" && image.startsWith("blob:")) {
    console.log("🔄 Converting blob URL to File...");

    const response = await fetch(image);
    const blob = await response.blob();

    fileToUpload = new File([blob], "photo.jpg", {
      type: blob.type || "image/jpeg",
    });
  }

  const formData = new FormData();
  formData.append("file", fileToUpload); // ✅ final correct

  try {
    const res = await fetch(`${BASE_URL}/api/upload-image`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.log("❌ Server error:", text);
      throw new Error("Upload failed");
    }

    const data = await res.json();

    console.log("📥 Image Response:", data);

    return data;

  } catch (err) {
    console.log("❌ Upload API error:", err);
    throw err;
  }
};