export const processTextAPI = async (input) => {
  const res = await fetch("http://192.168.1.11:9001/api/process", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: input,
  });

  return res.json();
};

export const uploadImageAPI = async (image) => {

  if (!image) {
    throw new Error("No image selected");
  }

  const formData = new FormData();

  formData.append("file", {
    uri: image,
    type: "image/jpeg",
    name: "photo.jpg"
  });

  try {
    const res = await fetch("http://192.168.1.11:9001/api/upload-image", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
        // ❌ Content-Type intentionally removed
      }
    });

    return await res.json();

  } catch (err) {
    console.log("Upload API error:", err);
    throw err;
  }
};