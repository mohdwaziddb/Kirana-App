// services/baseUrl.js

import { Platform } from "react-native";

export const BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:9001"
    : "http://127.0.0.1:9001";

// 👉 real device ke liye:
// export const BASE_URL = "http://192.168.1.11:9001";